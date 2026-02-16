(function () {
    'use strict';

    var STORAGE_KEY = 'kat-team-lang';

    var T = {
        ro: {
            skip: 'Sari la conținutul principal',
            nav_home: 'Acasă',
            nav_artists: 'Artiști',
            nav_gallery: 'Galerie',
            nav_schedule: 'Program',
            nav_offer: 'Ce oferim',
            nav_contact: 'Contact',
            logo_aria: 'Kat Team Events – Acasă',
            nav_aria: 'Navigare principală',
            welcomeLine: 'Bine ați venit în lumea noastră',
            enjoyLine: 'Bucurați-vă',
            intro1: 'Suntem încântați că ați ales să ne cunoașteți și să vedeți dacă suntem alegerea potrivită pentru evenimentele voastre speciale. Răsfoiți cu plăcere pagina și verificați dacă suntem cei potriviți pentru ziua voastră specială—apoi ',
            intro_link: 'luați legătura',
            intro2: ', și împreună vom organiza fiecare detaliu pentru o sărbătoare de excepție.',
            video_aria: 'Promo Kat Team Events',
            artists_title: 'Artiști',
            artists_lead: 'Faceți cunoștință cu oamenii din spatele muzicii și al magiei.',
            jump_aria: 'Sari la artist',
            artist_singer_btn: 'Solista',
            dj_alt: 'DJ Kat la console',
            dj_text: 'DJ Kat este în industria muzicală de peste 15 ani și și-a construit o experiență vastă la cele mai diverse evenimente. Este persoana potrivită pentru muzica oricărei petreceri, astfel încât voi să vă relaxați și să vă bucurați. De la momente emoționante până la dansul pe ring, DJ Kat aduce melodiile potrivite în momentul potrivit.',
            diana_alt: 'Diana Onofrei cântând',
            diana_text: 'Cântăreața noastră talentată Diana Onofrei aduce o voce care poate oferi blues lin și dulce și să îi invite pe cei dragi pe ringul de dans—sau să umple încăperea cu putere și energie. Din vocea ei veți simți că și voi puteți cânta.',
            iulian_alt: 'Iulian Arama, Maestru de Ceremonii',
            iulian_text: 'Îi place să vorbească, să împărtășească glume nevinovate și aduce una dintre cele mai contagioase și calde energii din echipă. Iulian este Maestrul nostru de Ceremonii, cu experiență în stand-up comedy și deschiderea concerțelor. Dacă vă simțiți rușinați sau nerabdători, vă va pune la largul vostru și îi va ajuta pe toți să se bucure de moment.',
            gallery_title: 'Galerie',
            gallery_lead: 'O privire asupra evenimentelor noastre și a momentelor pe care le-am trăit împreună.',
            gallery_alt1: 'Kat Team Events la o petrecere',
            gallery_alt2: 'Atmosferă de eveniment',
            gallery_alt3: 'Kat Team împreună',
            gallery_alt4: 'Moment de sărbătoare',
            gallery_video1: 'Video nuntă Diana',
            gallery_video2: 'Slideshow Gabi',
            schedule_title: 'Program',
            schedule_lead: 'Verificați disponibilitatea și rezervați data. Toate datele sunt supuse confirmării.',
            schedule_booked: 'Rezervat',
            schedule_available: 'Disponibil',
            schedule_select_hint: 'Apăsați pe o dată disponibilă pentru a o solicita. Organizatorul vă va confirma prin email.',
            schedule_note: 'Contactați-ne pentru a vă asigura data. Vom confirma cât mai curând.',
            schedule_request_title: 'Solicitați confirmarea pentru această dată',
            schedule_form_name: 'Numele dvs.',
            schedule_form_email: 'Email',
            schedule_form_phone: 'Telefon',
            schedule_form_message: 'Mesaj (opțional)',
            schedule_form_send: 'Trimite cererea',
            schedule_form_close: 'Anulare',
            schedule_success: 'Cererea a fost trimisă. Organizatorul vă va confirma prin email cât mai curând.',
            offer_title: 'Ce oferim',
            offer_lead: 'Serviciile pe care le aducem la evenimentul tău, ca formație.',
            offer_s1_title: 'DJ și muzică',
            offer_s1_desc: 'Ne ocupăm de muzică de la început până la final—de la momente emoționante până pe ringul de dans. Ascultăm cererile voastre și aducem melodiile potrivite în momentul potrivit.',
            offer_s2_title: 'Cântăreață live',
            offer_s2_desc: 'Cântăreața noastră oferă un repertoriu divers—pop, blues și tradițional—cu o voce care umple sala și îi invită pe toți pe ringul de dans.',
            offer_s3_title: 'MC și animare',
            offer_s3_desc: 'Maestrul nostru de Ceremonii menține evenimentul fluid, anunță momentele, spune cuvintele potrivite și îi ajută pe oaspeți să se simtă bineveniți și implicați.',
            offer_s4_title: 'Sistem de sunet',
            offer_s4_desc: 'Sunet profesional care funcționează în încăperi mici sau săli mari, astfel încât fiecare cuvânt și notă se aude clar, oriunde sunt oaspeții.',
            offer_s5_title: 'Lumină și efecte',
            offer_s5_desc: 'Lumină care aduce culoare și viață în spațiu, plus efecte de fum și CO2 pentru atmosferă și pentru a-i pune pe toți pe ringul de dans.',
            offer_s6_title: 'Extras',
            offer_s6_desc: 'Putem adăuga instrumentiști—saxofon, pian, vioară—pentru a vă aduce muzică live la eveniment și a-l face complet.',
            contact_title: 'Contact',
            contact_intro: 'Luați legătura—abia așteptăm să creăm amintiri împreună.',
            contact_reach: 'Contactați-ne',
            map_title: 'Hartă: 25 Colindeep Lane, London NW4 4SG',
            footer_text: 'Kat Team Events – Facem din sărbătoarea ta un moment de neuitat.',
            title: 'Kat Team Events – DJ, Cântăreață și MC pentru ziua ta specială',
            description: 'Kat Team Events: divertisment profesional pentru nunti și evenimente. DJ, cântăreață live și MC. Să creăm împreună momente de neuitat.'
        },
        en: {
            skip: 'Skip to main content',
            nav_home: 'Home',
            nav_artists: 'Artists',
            nav_gallery: 'Gallery',
            nav_schedule: 'Schedule',
            nav_offer: 'What We Offer',
            nav_contact: 'Contact',
            logo_aria: 'Kat Team Events – Home',
            nav_aria: 'Main navigation',
            welcomeLine: 'Welcome to our world',
            enjoyLine: 'Enjoy',
            intro1: 'We are delighted that you chose to know us and see if we are the perfect fit for those special events. Please, feel free to browse our page and see if we are the right choice for your special day—then get in ',
            intro_link: 'touch',
            intro2: ", and together we'll organise every detail for an exceptional celebration.",
            video_aria: 'Kat Team Events promo',
            artists_title: 'Artists',
            artists_lead: 'Meet the people behind the music and the magic.',
            jump_aria: 'Jump to artist',
            artist_singer_btn: 'Singer',
            dj_alt: 'DJ Kat at the decks',
            dj_text: 'DJ Kat has been in the music industry for over 15 years and has built vast experience across different events. He is the right person to take care of the music at any party so you can relax and enjoy. From emotional moments to rocking the floor, DJ Kat brings the right songs at the right moment.',
            diana_alt: 'Diana Onofrei singing',
            diana_text: "Our talented singer Diana Onofrei brings a voice that can deliver soft, sweet blues and invite your loved ones onto the dance floor—or fill the room with power and energy. From her voice, you'll feel that you can sing too.",
            iulian_alt: 'Iulian Arama, Master of Ceremony',
            iulian_text: "He loves to talk, to share innocent jokes, and he brings one of the most infectious, warm energies to the team. Iulian is our Master of Ceremony, with experience in stand-up comedy and opening concerts. If you feel shy or nervous, he'll put you at ease and help everyone enjoy the moment.",
            gallery_title: 'Gallery',
            gallery_lead: "A glimpse of our events and the moments we've shared.",
            gallery_alt1: 'Kat Team Events at a party',
            gallery_alt2: 'Event atmosphere',
            gallery_alt3: 'Kat Team together',
            gallery_alt4: 'Celebration moment',
            gallery_video1: 'Diana wedding video',
            gallery_video2: 'Slide show Gabi',
            schedule_title: 'Schedule',
            schedule_lead: 'Check our availability and book your date. All dates are subject to confirmation.',
            schedule_booked: 'Booked',
            schedule_available: 'Available',
            schedule_select_hint: 'Click an available date to request it. The organiser will confirm by email.',
            schedule_note: 'Contact us to secure your date. We\'ll confirm as soon as possible.',
            schedule_request_title: 'Request confirmation for this date',
            schedule_form_name: 'Your name',
            schedule_form_email: 'Your email',
            schedule_form_phone: 'Phone',
            schedule_form_message: 'Message (optional)',
            schedule_form_send: 'Send request',
            schedule_form_close: 'Cancel',
            schedule_success: 'Your request has been sent. The organiser will confirm by email as soon as possible.',
            offer_title: 'What We Offer',
            offer_lead: 'The services we bring to your event as a band.',
            offer_s1_title: 'DJ & Music',
            offer_s1_desc: 'We take care of the music from start to finish—from emotional moments to the dance floor. We listen to your requests and bring the right songs at the right time.',
            offer_s2_title: 'Live Singer',
            offer_s2_desc: 'Our female singer delivers a diverse repertoire—pop, blues and traditional—with a voice that fills the room and gets everyone on the dance floor.',
            offer_s3_title: 'MC & Hosting',
            offer_s3_desc: 'Our Master of Ceremony keeps the flow of your event smooth, announces moments, shares the right words and helps every guest feel welcome and involved.',
            offer_s4_title: 'Sound System',
            offer_s4_desc: 'Professional sound that works in small rooms or large halls, so every word and note is heard clearly wherever your guests are.',
            offer_s5_title: 'Lights & Effects',
            offer_s5_desc: 'Lighting that brings colour and life to the space, plus smoke and CO2 effects to create atmosphere and get everyone dancing.',
            offer_s6_title: 'Extras',
            offer_s6_desc: 'We can add instrumentalists—saxophone, piano, violin to bring you live music at your event and make it complete.',
            contact_title: 'Contact',
            contact_intro: "Get in touch—we can't wait to create memories together.",
            contact_reach: 'Reach us',
            map_title: 'Map: 25 Colindeep Lane, London NW4 4SG',
            footer_text: 'Kat Team Events – Making your celebration unforgettable.',
            title: 'Kat Team Events – DJ, Singer & MC for Your Special Day',
            description: "Kat Team Events: professional entertainment for weddings and events. DJ, female vocalist and MC in London. Let's create unforgettable moments together."
        }
    };

    function setMeta(lang) {
        var t = T[lang];
        if (t && t.title) document.title = t.title;
        var meta = document.querySelector('meta[name="description"]');
        if (meta && t && t.description) meta.setAttribute('content', t.description);
    }

    function applyLanguage(lang) {
        if (!T[lang]) lang = 'ro';
        var t = T[lang];
        document.documentElement.lang = lang;
        setMeta(lang);

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (t[key] == null) return;
            var target = el;
            try {
                if (el.querySelector && el.querySelector('.nav-link-text') && el.closest && el.closest('.site-nav')) {
                    target = el.querySelector('.nav-link-text');
                }
            } catch (err) {}
            target.textContent = t[key];
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-aria');
            if (t[key] != null) el.setAttribute('aria-label', t[key]);
        });

        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-title');
            if (t[key] != null) el.setAttribute('title', t[key]);
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-alt');
            if (t[key] != null) el.setAttribute('alt', t[key]);
        });

        var video = document.querySelector('.video01');
        if (video && t.video_aria) video.setAttribute('aria-label', t.video_aria);

        var mapIframe = document.querySelector('.contact-map iframe');
        if (mapIframe && t.map_title) mapIframe.setAttribute('title', t.map_title);

        document.querySelectorAll('[data-lang]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
        });

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        try { document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } })); } catch (e) {}
    }

    function init() {
        var lang = 'ro';
        try { lang = localStorage.getItem(STORAGE_KEY) || 'ro'; } catch (e) {}
        if (lang !== 'ro' && lang !== 'en') lang = 'ro';
        applyLanguage(lang);

        var roBtn = document.querySelector('.lang-switcher [data-lang="ro"]');
        var enBtn = document.querySelector('.lang-switcher [data-lang="en"]');
        if (roBtn) roBtn.addEventListener('click', function () { applyLanguage('ro'); });
        if (enBtn) enBtn.addEventListener('click', function () { applyLanguage('en'); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
