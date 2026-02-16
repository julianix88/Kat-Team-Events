(function () {
    'use strict';

    // Booked dates: list dates that are already taken (customers see these as "Booked", not clickable).
    // Format: 'YYYY-MM-DD' (e.g. '2025-03-15' for 15 March 2025). Add or remove dates as needed.
    var BOOKED_DATES = [
        '2025-03-15',
        '2025-04-12',
        '2025-06-22'
    ];

    // Optional: load booked dates from the web so you can change them without editing code.
    // Set to a Google Sheet CSV export URL (see instructions below) or leave empty to use BOOKED_DATES above.
    // Google Sheet: 1) Create a sheet with one column (e.g. "Date"), one date per row (YYYY-MM-DD).
    // 2) File → Share → Publish to web → Sheet1 → CSV → Publish. 3) Copy the link and paste below.
    var BOOKED_DATES_SOURCE_URL = '';

    var currentBookedDates = BOOKED_DATES.slice();
    var MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MONTH_NAMES_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    var MONTHS_AHEAD = 12;

    function pad2(n) {
        return n < 10 ? '0' + n : String(n);
    }
    function isBooked(year, month, day) {
        var d = year + '-' + pad2(month + 1) + '-' + pad2(day);
        return currentBookedDates.indexOf(d) !== -1;
    }

    function parseBookedDatesFromResponse(text) {
        var dates = [];
        try {
            var parsed = JSON.parse(text);
            if (Array.isArray(parsed)) {
                parsed.forEach(function (item) {
                    var d = typeof item === 'string' ? item.trim() : String(item).trim();
                    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) dates.push(d);
                });
                return dates;
            }
        } catch (e) { /* not JSON, try CSV */ }
        text.split(/\r?\n/).forEach(function (line) {
            var cell = line.split(',')[0];
            if (cell) {
                var d = cell.trim().replace(/^["']|["']$/g, '');
                if (/^\d{4}-\d{2}-\d{2}$/.test(d)) dates.push(d);
            }
        });
        return dates;
    }

    function getLang() {
        return document.documentElement.getAttribute('lang') || 'en';
    }

    function getMonthLabel(monthIndex) {
        var names = getLang() === 'ro' ? MONTH_NAMES_RO : MONTH_NAMES_EN;
        return names[monthIndex];
    }

    function daysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function firstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    function renderMonthCalendar(year, month, container) {
        var lang = getLang();
        var monthNames = lang === 'ro' ? MONTH_NAMES_RO : MONTH_NAMES_EN;
        var monthLabel = monthNames[month];
        var days = daysInMonth(year, month);
        var firstDay = firstDayOfMonth(year, month);

        container.innerHTML = '';

        var wrap = document.createElement('div');
        wrap.className = 'schedule-month';

        var title = document.createElement('h3');
        title.className = 'schedule-month__title';
        title.textContent = monthLabel + ' ' + year;
        wrap.appendChild(title);

        var weekdays = document.createElement('div');
        weekdays.className = 'schedule-weekdays';
        var dayNames = lang === 'ro' ? ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        for (var w = 0; w < 7; w++) {
            var wd = document.createElement('span');
            wd.className = 'schedule-weekday';
            wd.textContent = dayNames[w];
            weekdays.appendChild(wd);
        }
        wrap.appendChild(weekdays);

        var grid = document.createElement('div');
        grid.className = 'schedule-days';

        var start = lang === 'ro' ? (firstDay === 0 ? 6 : firstDay - 1) : (firstDay + 6) % 7;
        for (var i = 0; i < start; i++) {
            var empty = document.createElement('span');
            empty.className = 'schedule-day schedule-day--empty';
            grid.appendChild(empty);
        }
        for (var d = 1; d <= days; d++) {
            var cell = document.createElement('span');
            cell.className = 'schedule-day';
            if (isBooked(year, month, d)) cell.classList.add('schedule-day--booked');
            else {
                cell.classList.add('schedule-day--available');
                var dateStr = year + '-' + pad2(month + 1) + '-' + pad2(d);
                cell.setAttribute('data-date', dateStr);
                cell.setAttribute('role', 'button');
                cell.setAttribute('tabindex', '0');
            }
            cell.textContent = d;
            cell.setAttribute('aria-label', d + ' ' + monthLabel + ' – ' + (isBooked(year, month, d) ? 'Booked' : 'Available'));
            grid.appendChild(cell);
        }

        wrap.appendChild(grid);
        container.appendChild(wrap);

        container.querySelectorAll('.schedule-day--available').forEach(function (cell) {
            var dateStr = cell.getAttribute('data-date');
            function openModal() {
                var modal = document.getElementById('scheduleBookingModal');
                var form = document.getElementById('scheduleBookingForm');
                var successEl = document.getElementById('scheduleModalSuccess');
                var dateDisplay = document.getElementById('scheduleModalDate');
                var formDate = document.getElementById('scheduleFormDate');
                var formSubject = document.getElementById('scheduleFormSubject');
                var submitBtn = form && form.querySelector('.schedule-form__submit');
                if (!modal || !form) return;
                form.reset();
                formDate.value = dateStr;
                formSubject.value = 'Schedule request: ' + dateStr + ' – Kat Team Events';
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = getLang() === 'ro' ? 'Trimite cererea' : 'Send request';
                }
                var d = new Date(dateStr + 'T12:00:00');
                dateDisplay.textContent = d.toLocaleDateString(getLang() === 'ro' ? 'ro-RO' : 'en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                successEl.hidden = true;
                form.hidden = false;
                modal.classList.add('schedule-modal--open');
                modal.setAttribute('aria-hidden', 'false');
            }
            cell.addEventListener('click', openModal);
            cell.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal();
                }
            });
        });
    }

    function setupBookingModal() {
        var modal = document.getElementById('scheduleBookingModal');
        var form = document.getElementById('scheduleBookingForm');
        var successEl = document.getElementById('scheduleModalSuccess');
        var closeBtn = modal && modal.querySelector('.schedule-form__close');
        var backdrop = modal && modal.querySelector('.schedule-modal__backdrop');

        function closeModal() {
            if (!modal) return;
            modal.classList.remove('schedule-modal--open');
            modal.setAttribute('aria-hidden', 'true');
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);

        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var submitBtn = form.querySelector('.schedule-form__submit');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = getLang() === 'ro' ? 'Se trimite...' : 'Sending...';
                }
                var action = form.getAttribute('action');
                if (!action || action.indexOf('YOUR_FORM_ID') !== -1) {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = getLang() === 'ro' ? 'Trimite cererea' : 'Send request';
                    }
                    alert(getLang() === 'ro' ? 'Configurați Formspree: înlocuiți YOUR_FORM_ID din form action cu ID-ul formularului dvs. Formspree.' : 'Please set up Formspree: replace YOUR_FORM_ID in the form action with your Formspree form ID.');
                    return;
                }
                var fd = new FormData(form);
                fetch(action, {
                    method: 'POST',
                    body: fd,
                    headers: { 'Accept': 'application/json' }
                }).then(function (res) {
                    if (res.ok) {
                        form.hidden = true;
                        if (successEl) successEl.hidden = false;
                        setTimeout(closeModal, 3000);
                    } else {
                        throw new Error('Submit failed');
                    }
                }).catch(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = getLang() === 'ro' ? 'Trimite cererea' : 'Send request';
                    }
                    alert(getLang() === 'ro' ? 'Cererea nu a putut fi trimisă. Încercați din nou sau contactați-ne direct.' : 'The request could not be sent. Please try again or contact us directly.');
                });
            });
        }
    }

    function buildMonthList() {
        var list = [];
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth();
        for (var i = 0; i < MONTHS_AHEAD; i++) {
            list.push({ year: y, month: m });
            m++;
            if (m > 11) { m = 0; y++; }
        }
        return list;
    }

    function buildCalendar() {
        var listEl = document.getElementById('scheduleMonthList');
        var viewEl = document.getElementById('scheduleCalendarView');
        if (!listEl || !viewEl) return;

        listEl.innerHTML = '';
        viewEl.innerHTML = '';

        var months = buildMonthList();
        var lang = getLang();

        for (var i = 0; i < months.length; i++) {
            var item = months[i];
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'schedule-month-btn';
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
            btn.setAttribute('data-year', item.year);
            btn.setAttribute('data-month', item.month);
            btn.textContent = getMonthLabel(item.month) + ' ' + item.year;
            btn.addEventListener('click', function () {
                var y = parseInt(this.getAttribute('data-year'), 10);
                var m = parseInt(this.getAttribute('data-month'), 10);
                listEl.querySelectorAll('.schedule-month-btn').forEach(function (b) {
                    b.setAttribute('aria-selected', 'false');
                    b.classList.remove('schedule-month-btn--active');
                });
                this.setAttribute('aria-selected', 'true');
                this.classList.add('schedule-month-btn--active');
                renderMonthCalendar(y, m, viewEl);
            });
            listEl.appendChild(btn);
        }

        var first = listEl.querySelector('.schedule-month-btn');
        if (first) {
            first.classList.add('schedule-month-btn--active');
            renderMonthCalendar(months[0].year, months[0].month, viewEl);
        }

        setupBookingModal();
    }

    function init() {
        if (!document.getElementById('scheduleMonthList')) return;

        if (BOOKED_DATES_SOURCE_URL) {
            fetch(BOOKED_DATES_SOURCE_URL)
                .then(function (r) { return r.text(); })
                .then(function (text) {
                    currentBookedDates = parseBookedDatesFromResponse(text);
                    buildCalendar();
                })
                .catch(function () {
                    currentBookedDates = BOOKED_DATES.slice();
                    buildCalendar();
                });
        } else {
            currentBookedDates = BOOKED_DATES.slice();
            buildCalendar();
        }
    }

    function setupScheduleBackgroundAudio() {
        var audio = document.getElementById('scheduleBackgroundAudio');
        var section = document.getElementById('schedule');
        if (!audio || !section) return;
        audio.volume = 0.2;
        if (typeof IntersectionObserver !== 'undefined') {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        audio.play().catch(function () {});
                    } else {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                });
            }, { threshold: 0.25 });
            observer.observe(section);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            init();
            setupScheduleBackgroundAudio();
        });
    } else {
        init();
        setupScheduleBackgroundAudio();
    }
    document.addEventListener('languagechange', init);
})();
