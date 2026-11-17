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

    function t(key) {
        var dict = window.KatTeamI18n && window.KatTeamI18n[getLang()];
        return (dict && dict[key]) || '';
    }

    function getMonthLabel(monthIndex) {
        var names = getLang() === 'ro' ? MONTH_NAMES_RO : MONTH_NAMES_EN;
        return names[monthIndex];
    }

    function getSubmitLabel() {
        return t('schedule_form_send') || (getLang() === 'ro' ? 'Trimite cererea' : 'Send request');
    }

    function getValidationLabel() {
        return t('schedule_form_validation') || (getLang() === 'ro'
            ? 'Completați toate câmpurile obligatorii.'
            : 'Please complete all required fields.');
    }

    function formatDisplayDate(dateStr) {
        var d = new Date(dateStr + 'T12:00:00');
        return d.toLocaleDateString(getLang() === 'ro' ? 'ro-RO' : 'en-GB', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    var selectedDateCell = null;

    function setActiveStep(stepNum) {
        document.querySelectorAll('.schedule-step').forEach(function (el) {
            var n = parseInt(el.getAttribute('data-schedule-step'), 10);
            el.classList.toggle('schedule-step--active', n === stepNum);
        });
    }

    function clearSelectedDay() {
        if (selectedDateCell) {
            selectedDateCell.classList.remove('schedule-day--selected');
            selectedDateCell = null;
        }
    }

    function setSelectedDay(cell) {
        clearSelectedDay();
        if (cell) {
            cell.classList.add('schedule-day--selected');
            selectedDateCell = cell;
        }
    }

    function updateSubmitButtonLabel(btn) {
        if (!btn) return;
        var label = btn.querySelector('span');
        if (label) label.textContent = getSubmitLabel();
    }

    function getSendingLabel() {
        return getLang() === 'ro' ? 'Se trimite...' : 'Sending...';
    }

    function getErrorLabel() {
        return t('schedule_form_error') || (getLang() === 'ro'
            ? 'Cererea nu a putut fi trimisă. Încercați din nou sau contactați-ne pe WhatsApp.'
            : 'Your request could not be sent. Please try again or contact us on WhatsApp.');
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
            if (isBooked(year, month, d)) {
                cell.classList.add('schedule-day--booked');
                cell.setAttribute('aria-label', d + ' ' + monthLabel + ' ' + year + ' – ' + (t('schedule_booked') || 'Booked'));
            } else {
                cell.classList.add('schedule-day--available');
                var dateStr = year + '-' + pad2(month + 1) + '-' + pad2(d);
                cell.setAttribute('data-date', dateStr);
                cell.setAttribute('role', 'button');
                cell.setAttribute('tabindex', '0');
                cell.setAttribute('aria-label', d + ' ' + monthLabel + ' ' + year + ' – ' + (t('schedule_available') || 'Available'));
            }
            cell.textContent = d;
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
                var errorEl = document.getElementById('scheduleFormError');
                var submitBtn = form && form.querySelector('.schedule-form__submit');
                var headerEl = modal && modal.querySelector('.schedule-modal__header');
                if (!modal || !form) return;
                form.reset();
                setSelectedDay(cell);
                setActiveStep(3);
                formDate.value = dateStr;
                formSubject.value = 'Schedule request: ' + dateStr + ' – Kat Team Events';
                if (submitBtn) {
                    submitBtn.disabled = false;
                    updateSubmitButtonLabel(submitBtn);
                }
                if (errorEl) {
                    errorEl.hidden = true;
                    errorEl.textContent = '';
                }
                var formatted = formatDisplayDate(dateStr);
                dateDisplay.textContent = formatted;
                successEl.hidden = true;
                if (headerEl) headerEl.hidden = false;
                form.hidden = false;
                modal.classList.add('schedule-modal--open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                var nameInput = document.getElementById('scheduleFormName');
                if (nameInput) nameInput.focus();
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
        var closeX = modal && modal.querySelector('.schedule-modal__close-x');
        var backdrop = modal && modal.querySelector('.schedule-modal__backdrop');
        var errorEl = document.getElementById('scheduleFormError');

        function closeModal() {
            if (!modal) return;
            modal.classList.remove('schedule-modal--open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            clearSelectedDay();
            setActiveStep(1);
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (closeX) closeX.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('schedule-modal--open')) {
                closeModal();
            }
        });

        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var submitBtn = form.querySelector('.schedule-form__submit');
                var eventType = form.querySelector('input[name="event_type"]:checked');
                if (!form.checkValidity() || !eventType) {
                    if (errorEl) {
                        errorEl.textContent = getValidationLabel();
                        errorEl.hidden = false;
                    }
                    form.reportValidity();
                    return;
                }
                if (submitBtn) {
                    submitBtn.disabled = true;
                    var label = submitBtn.querySelector('span');
                    if (label) label.textContent = getSendingLabel();
                }
                if (errorEl) {
                    errorEl.hidden = true;
                    errorEl.textContent = '';
                }
                var action = form.getAttribute('action') || 'schedule-submit.php';
                var fd = new FormData(form);
                var savedDate = form.querySelector('#scheduleFormDate').value;
                fetch(action, {
                    method: 'POST',
                    body: fd,
                    headers: { Accept: 'application/json' }
                }).then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, data: data };
                    }).catch(function () {
                        return { ok: false, data: {} };
                    });
                }).then(function (result) {
                    if (result.ok && result.data && result.data.ok) {
                        if (typeof window.katTeamTrack === 'function') {
                            window.katTeamTrack('booking_request', { form: 'schedule' });
                        }
                        var headerEl = modal.querySelector('.schedule-modal__header');
                        var successDate = document.getElementById('scheduleSuccessDate');
                        if (successDate && savedDate) {
                            successDate.textContent = formatDisplayDate(savedDate);
                        }
                        if (headerEl) headerEl.hidden = true;
                        form.hidden = true;
                        if (successEl) successEl.hidden = false;
                        setTimeout(closeModal, 4500);
                    } else {
                        throw new Error((result.data && result.data.error) || 'failed');
                    }
                }).catch(function (err) {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        updateSubmitButtonLabel(submitBtn);
                    }
                    var msg = (err && err.message && err.message !== 'failed') ? err.message : getErrorLabel();
                    if (errorEl) {
                        errorEl.textContent = msg;
                        errorEl.hidden = false;
                    } else {
                        alert(msg);
                    }
                });
            });
        }
    }

    function buildMonthList() {
        var listEl = document.getElementById('scheduleMonthList');
        var viewEl = document.getElementById('scheduleCalendarView');
        if (!listEl || !viewEl) return;

        listEl.innerHTML = '';
        viewEl.innerHTML = '';

        var months = buildMonthListData();
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
                clearSelectedDay();
                setActiveStep(2);
                renderMonthCalendar(y, m, viewEl);
            });
            listEl.appendChild(btn);
        }

        var first = listEl.querySelector('.schedule-month-btn');
        if (first) {
            first.classList.add('schedule-month-btn--active');
            setActiveStep(1);
            renderMonthCalendar(months[0].year, months[0].month, viewEl);
        }

        setupBookingModal();
    }

    function buildMonthListData() {
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

    function init() {
        if (!document.getElementById('scheduleMonthList')) return;

        if (BOOKED_DATES_SOURCE_URL) {
            fetch(BOOKED_DATES_SOURCE_URL)
                .then(function (r) { return r.text(); })
                .then(function (text) {
                    currentBookedDates = parseBookedDatesFromResponse(text);
                    buildMonthList();
                })
                .catch(function () {
                    currentBookedDates = BOOKED_DATES.slice();
                    buildMonthList();
                });
        } else {
            currentBookedDates = BOOKED_DATES.slice();
            buildMonthList();
        }
    }

    function setupScheduleBackgroundAudio() {
        var audio = document.getElementById('scheduleBackgroundAudio');
        var section = document.getElementById('schedule');
        if (!audio || !section) return;
        var targetVolume = 0.2;
        audio.volume = targetVolume;
        audio.dataset.fadeTargetVolume = String(targetVolume);

        function fadeIn() {
            if (window.KatTeamAudioFade) {
                window.KatTeamAudioFade.fadeIn(audio, { volume: targetVolume });
                return;
            }
            if (audio.readyState < 2) audio.load();
            audio.play().catch(function () {});
        }

        function fadeOut() {
            if (window.KatTeamAudioFade) {
                window.KatTeamAudioFade.fadeOut(audio);
                return;
            }
            audio.pause();
            try { audio.currentTime = 0; } catch (e) {}
        }

        function tryPlayIfInView() {
            if (window.KatTeamSound && !window.KatTeamSound.isEnabled()) return;
            var rect = section.getBoundingClientRect();
            var inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
            if (inView) fadeIn();
        }

        if (typeof IntersectionObserver !== 'undefined') {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        if (window.KatTeamSound && !window.KatTeamSound.isEnabled()) return;
                        fadeIn();
                    } else {
                        fadeOut();
                    }
                });
            }, { threshold: 0.25 });
            observer.observe(section);
        }

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState !== 'visible') return;
            tryPlayIfInView();
        });

        document.addEventListener('soundchange', function (e) {
            if (e.detail && e.detail.enabled) tryPlayIfInView();
        });
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
