(function () {
    'use strict';

    var STORAGE_KEY = 'kat-team-lang';
    var SITE_URL = 'https://katteamevents.com/';
    var SITE_IMAGE = SITE_URL + 'Images/Logo.png';

    var SCHEMA_PHONE = '+447590299765';
    var SCHEMA_PHONE_DISPLAY = '+44 7590 299765';
    var SCHEMA_MAP_URL = 'https://maps.google.com/?q=Kat+Team+Events+London';
    var SCHEMA_SAME_AS = [
        'https://www.facebook.com/kat.team.events/',
        'https://www.instagram.com/Kat_team_events/'
    ];
    var SCHEMA_AREAS = [
        { '@type': 'Country', name: 'Romania' },
        { '@type': 'Country', name: 'United Kingdom' }
    ];
    var SCHEMA_RO_CITIES = [
        'Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Suceava',
        'Piatra Neamț', 'Botoșani', 'Constanța'
    ];
    var SCHEMA_RO_REGIONS = ['Bucovina', 'Moldova', 'Dobrogea'];
    var SCHEMA_UK_REGIONS = ['England'];
    var SCHEMA_UK_CITIES = ['London'];

    function buildAreaServed() {
        var areas = SCHEMA_AREAS.slice();
        SCHEMA_RO_CITIES.forEach(function (name) {
            areas.push({
                '@type': 'City',
                name: name,
                containedInPlace: { '@type': 'Country', name: 'Romania' }
            });
        });
        SCHEMA_RO_REGIONS.forEach(function (name) {
            areas.push({
                '@type': 'AdministrativeArea',
                name: name,
                containedInPlace: { '@type': 'Country', name: 'Romania' }
            });
        });
        SCHEMA_UK_REGIONS.forEach(function (name) {
            areas.push({
                '@type': 'AdministrativeArea',
                name: name,
                containedInPlace: { '@type': 'Country', name: 'United Kingdom' }
            });
        });
        SCHEMA_UK_CITIES.forEach(function (name) {
            areas.push({
                '@type': 'City',
                name: name,
                containedInPlace: { '@type': 'Country', name: 'United Kingdom' }
            });
        });
        return areas;
    }
    var SCHEMA_ADDRESS = {
        '@type': 'PostalAddress',
        streetAddress: '25 Colindeep Lane',
        addressLocality: 'London',
        postalCode: 'NW4 4SG',
        addressCountry: 'GB'
    };
    var FAQ_COUNT = 7;

    var T = {
        ro: {
            skip: 'Sari la conținutul principal',
            nav_home: 'Acasă',
            nav_artists: 'Artiști',
            nav_gallery: 'Galerie',
            nav_schedule: 'Rezervă',
            nav_offer: 'Ce oferim',
            nav_contact: 'Contact',
            logo_aria: 'Kat Team Events – Acasă',
            nav_aria: 'Navigare principală',
            sound_hint: 'Sunet pornit/oprit',
            reviews_fab_aria: 'Recomandări și recenzii',
            reviews_fab_label: 'Recenzii',
            mobile_cta: 'Rezervă',
            mobile_call: 'Sună',
            mobile_call_aria: 'Sună pe WhatsApp',
            hero_h1: 'DJ, solistă și MC pentru nuntă și botez în România și Anglia',
            hero_meta: 'DJ · Solistă · MC · Nuntă & Botez · România & Anglia',
            hero_scroll_aria: 'Descoperă mai mult',
            tags_title: 'Servicii & zone',
            tags_services_label: 'Servicii',
            chips_aria: 'Servicii Kat Team Events',
            chip_dj: 'DJ',
            chip_singer: 'Solistă',
            chip_mc: 'MC',
            chip_wedding: 'Nuntă',
            chip_baptism: 'Botez',
            chip_party: 'Petrecere',
            chip_ro: 'România',
            chip_uk: 'UK',
            chip_london: 'Anglia',
            region_chips_heading: 'Zone în România',
            region_chips_lead: 'DJ, solistă și MC pentru nuntă și botez — ne deplasăm la locația voastră în orașele și regiunile de mai jos.',
            region_uk_heading: 'UK / Anglia',
            welcomeLine: 'Bine ați venit în lumea noastră',
            enjoyLine: 'Bucurați-vă',
            intro1: 'Suntem încântați să ne cunoașteți. Kat Team Events este echipa voastră completă — DJ profesionist, solistă live și MC — pentru nuntă, botez și petrecere în România, precum și evenimente în Anglia. Muzică de la primul moment al nunții până pe ringul de dans, repertoriu pentru toate vârstele, sunet clar și lumină de sală mare. Ca trupă, cântăm, mixăm și animăm împreună; ne adaptăm stilului vostru și ținem ringul plin toată seara. Răsfoiți artiștii, galeria și ce oferim, apoi ',
            intro_link: 'luați legătura',
            intro2: ' — împreună construim programul serii și fiecare detaliu al sărbătorii, cu formația noastră alături de voi pas cu pas.',
            video_aria: 'Promo Kat Team Events',
            artists_title: 'Artiști',
            artists_lead: 'Faceți cunoștință cu oamenii din spatele muzicii și al magiei.',
            jump_aria: 'Sari la artist',
            artist_singer_btn: 'Solista',
            artist_role_dj: 'DJ',
            artist_role_singer: 'Solistă',
            artist_role_mc: 'MC',
            dj_alt: 'DJ Kat la console',
            dj_text: 'DJ Kat este în industria muzicală de peste 15 ani și și-a construit o experiență vastă la cele mai diverse evenimente. Este persoana potrivită pentru muzica oricărei petreceri, astfel încât voi să vă relaxați și să vă bucurați. De la momente emoționante până la dansul pe ring, DJ Kat aduce melodiile potrivite în momentul potrivit.',
            diana_alt: 'Diana Onofrei cântând',
            diana_text: 'Cântăreața noastră talentată Diana Onofrei aduce o voce care poate oferi blues lin și dulce și să îi invite pe cei dragi pe ringul de dans—sau să umple încăperea cu putere și energie. Din vocea ei veți simți că și voi puteți cânta.',
            iulian_alt: 'Iulian Arama, Maestru de Ceremonii',
            iulian_text: 'Îi place să vorbească, să împărtășească glume nevinovate și aduce una dintre cele mai contagioase și calde energii din echipă. Iulian este Maestrul nostru de Ceremonii, cu experiență în stand-up comedy și deschiderea concerțelor. Dacă vă simțiți rușinați sau nerabdători, vă va pune la largul vostru și îi va ajuta pe toți să se bucure de moment.',
            gallery_title: 'Galerie',
            gallery_lead_emphasis: 'Momente de la nunți reale',
            gallery_lead: ' — imagini din evenimente reale, cu miri și oaspeții lor în prim-plan.',
            gallery_alt1: 'Kat Team Events la o petrecere',
            gallery_alt2: 'Atmosferă de eveniment',
            gallery_alt3: 'Kat Team împreună',
            gallery_alt4: 'Moment de sărbătoare',
            gallery_video1: 'Video nuntă Diana',
            gallery_video2: 'Slideshow Gabi',
            reviews_title: 'Recomandări',
            reviews_lead: 'Ați fost la un eveniment cu noi? O recenzie scurtă ne ajută — și pe viitorii miri să ne găsească mai ușor.',
            reviews_featured_title: 'Ce spun clienții noștri',
            reviews_featured_sub: 'Ultimele recomandări de pe Facebook',
            reviews_featured_view_all: 'Vezi toate recomandările pe Facebook',
            reviews_invite: 'Spuneți cum a fost muzica, solista, MC-ul și atmosfera serii. Câteva propoziții sunt de ajuns — vă mulțumim din suflet!',
            reviews_fb_label: 'Lasă o recenzie pe Facebook',
            reviews_fb_hint: 'Recomandări de la miri și oaspeți',
            reviews_google_label: 'Lasă o recenzie pe Google',
            reviews_google_hint: 'Ne ajută la căutări locale în România și UK',
            reviews_note_before: 'Nu puteți lăsa recenzie acum? Trimiteți-ne un mesaj pe ',
            reviews_note_after: ' — cu plăcere publicăm recomandarea voastră (cu acordul dumneavoastră).',
            schedule_title: 'Rezervă',
            schedule_lead: 'Alegeți o dată disponibilă și trimiteți cererea de rezervare. Vă confirmăm prin email.',
            schedule_step_1: 'Alege luna',
            schedule_step_2: 'Alege o dată liberă',
            schedule_step_3: 'Trimite cererea',
            schedule_months_aria: 'Luni disponibile',
            schedule_booked: 'Rezervat',
            schedule_available: 'Disponibil',
            schedule_select_hint: 'Apăsați pe o dată disponibilă (aurie) pentru a trimite cererea. Vă confirmăm prin email.',
            schedule_note: 'Răspundem cât mai curând. Pentru urgențe, folosiți WhatsApp.',
            schedule_wa_alt: 'Preferați WhatsApp? Scrieți-ne direct',
            schedule_request_title: 'Confirmați această dată',
            schedule_modal_eyebrow: 'Cerere de rezervare',
            schedule_modal_close_aria: 'Închide',
            schedule_modal_subtitle: 'Completați formularul — vă răspundem pe email în cel mult 24 de ore.',
            schedule_form_section_contact: 'Datele dvs.',
            schedule_form_section_event: 'Despre eveniment',
            schedule_form_name: 'Numele dvs.',
            schedule_form_name_ph: 'ex. Maria Popescu',
            schedule_form_email: 'Email',
            schedule_form_email_ph: 'ex. maria@email.com',
            schedule_form_phone: 'Telefon',
            schedule_form_phone_ph: 'ex. +40 7xx xxx xxx',
            schedule_form_event: 'Tip eveniment',
            schedule_form_event_choose: 'Alegeți...',
            schedule_form_event_wedding: 'Nuntă',
            schedule_form_event_baptism: 'Botez',
            schedule_form_event_party: 'Petrecere',
            schedule_form_event_other: 'Alt eveniment',
            schedule_form_location: 'Locația evenimentului',
            schedule_form_location_ph: 'ex. Sală Evenimente, București',
            schedule_form_message: 'Detalii suplimentare',
            schedule_form_message_ph: 'Număr estimat de invitați, ore preferate, alte detalii...',
            schedule_form_optional: '(opțional)',
            schedule_form_trust: 'Datele dvs. sunt folosite doar pentru a confirma rezervarea. Fără spam.',
            schedule_form_send: 'Trimite cererea',
            schedule_form_close: 'Anulare',
            schedule_form_error: 'Cererea nu a putut fi trimisă. Încercați din nou sau contactați-ne pe WhatsApp.',
            schedule_form_validation: 'Completați toate câmpurile obligatorii.',
            schedule_success_title: 'Cererea a fost trimisă!',
            schedule_success: 'Echipa Kat Team Events vă va confirma prin email cât mai curând.',
            schedule_success_sub: 'Verificați și folderul Spam dacă nu primiți răspuns în 24 de ore.',
            offer_title: 'Ce oferim',
            offer_lead: 'Serviciile pe care le aducem la evenimentul tău, ca formație.',
            offer_tab_event: 'Evenimentul tău',
            offer_tab_equipment: 'Închiriere echipament',
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
            offer_equipment_lead: 'Sisteme audio D&b Y10P, VG subs, M4 monitoare, E9, mixere Dynacord și SQ5, microfoane Shure UR4D cu capsule Beta 58, monitoare in-ear Shure PSM300, schele lumini, cortine LED, mașini de fum vertical și hazere.',
            offer_equipment_s1_title: 'Sistem audio profesional',
            offer_equipment_s1_desc: 'Boxe D&b, VG subs, monitoare M4 și E9, plus mixere Dynacord și SQ5, configurate în funcție de dimensiunea și acustica locației.',
            offer_equipment_s2_title: 'Lumini & efecte',
            offer_equipment_s2_desc: 'Schele lumini, cortine LED, proiectoare și efecte speciale cu mașini de fum vertical și hazere pentru un show complet.',
            offer_equipment_s3_title: 'Microfoane & monitorizare',
            offer_equipment_s3_desc: 'Microfoane wireless Shure UR4D cu capsule Beta 58 și monitoare in-ear Shure PSM300 pentru artiști, prezentatori și momente live.',
            contact_title: 'Contact',
            contact_intro: 'Luați legătura din România sau UK — abia așteptăm să creăm amintiri împreună.',
            contact_reach: 'Contactați-ne',
            contact_phone_note: 'Telefon și WhatsApp (+44) — disponibil din România și UK.',
            contact_ro_title: 'România',
            contact_ro_text: 'Nuntă, botez și petrecere în România — ne deplasăm la locația voastră, cu muzică live, DJ, MC, sunet și lumină pentru săli mari sau evenimente private.',
            contact_uk_title: 'UK / Anglia',
            contact_uk_text: 'Nunți și evenimente în Anglia. Baza noastră este în Londra (NW4) — harta de mai jos.',
            map_title: 'Hartă: 25 Colindeep Lane, London NW4 4SG',
            faq_title: 'Întrebări frecvente',
            faq_lead: 'Răspunsuri rapide despre zonele în care lucrăm și cum ne puteți contacta.',
            faq_q1: 'Lucrați la nunți și botezuri în România?',
            faq_a1: 'Da. Ne deplasăm la evenimente în România — nuntă, botez și petrecere — cu DJ, solistă live, MC, sunet și lumină profesională, adaptate locației voastre.',
            faq_q2: 'Lucrați și în UK / Anglia?',
            faq_a2: 'Da. Suntem disponibili pentru nunți și evenimente în Anglia, cu aceeași echipă completă și echipament profesional.',
            faq_q3: 'Cum vă contactez din România fără număr local?',
            faq_a3: 'Ne puteți suna sau scrie pe WhatsApp la +44 7590 299765 — funcționează pentru apeluri și mesaje internaționale din România sau UK.',
            faq_q4: 'Ce include pachetul Kat Team Events?',
            faq_a4: 'DJ și muzică pentru întreaga seară, solistă live, MC, sunet profesional, lumină și efecte — plus opțiuni de formație și instrumentiști la cerere.',
            faq_q5: 'Cum rezervăm pentru data nunții sau a botezului?',
            faq_a5: 'Alegeți o dată disponibilă în calendarul de rezervări de pe site sau contactați-ne pe WhatsApp / telefon (+44 7590 299765). Confirmăm disponibilitatea și detaliile prin email.',
            faq_q6: 'Oferiți DJ și solistă la același eveniment?',
            faq_a6: 'Da. Kat Team Events este o echipă integrată: DJ Kat, solista Diana Onofrei și MC-ul Iulian Arama lucrează împreună — muzică mixată, momente live și prezentare coordonată.',
            faq_q7: 'Ce echipament aduceți la locație?',
            faq_a7: 'Sunet profesional (sisteme d&b, mixere Dynacord și SQ5), lumină și efecte, microfoane wireless Shure — plus opțiune de închiriere echipament pentru săli mari.',
            guide_title: 'Despre Kat Team Events',
            guide_lead: 'Informații clare despre cine suntem, ce oferim și cum ne rezervați — pentru nuntă, botez sau petrecere în România și Anglia.',
            guide_def_heading: 'Ce este Kat Team Events?',
            guide_def_text: 'Kat Team Events este o formație de entertainment pentru nuntă, botez și petrecere în România și UK: DJ profesionist, solistă live și MC într-o singură echipă, cu sunet, lumină și echipament de scenă. Ne deplasăm la locația voastră — din România sau Anglia.',
            guide_table_caption: 'Servicii Kat Team Events — rezumat',
            guide_th_service: 'Serviciu',
            guide_th_includes: 'Ce include',
            guide_th_areas: 'Zone',
            guide_r1_s: 'DJ și muzică',
            guide_r1_i: 'Muzică toată seara, de la momente emoționante la ringul de dans',
            guide_r1_a: 'România, Anglia',
            guide_r2_s: 'Solistă live',
            guide_r2_i: 'Diana Onofrei — pop, blues, tradițional',
            guide_r2_a: 'România, Anglia',
            guide_r3_s: 'MC și animare',
            guide_r3_i: 'Iulian Arama — anunțuri, flow, implicarea oaspeților',
            guide_r3_a: 'România, Anglia',
            guide_r4_s: 'Sunet, lumină, efecte',
            guide_r4_i: 'PA profesional, lumină de sală, fum și CO2',
            guide_r4_a: 'România, Anglia',
            guide_book_heading: 'Cum rezervați Kat Team Events',
            guide_book_1_before: 'Verificați disponibilitatea în ',
            guide_book_1_link: 'calendarul de rezervări',
            guide_book_1_after: ' sau pe WhatsApp (+44 7590 299765).',
            guide_book_2: 'Trimiteți data, locația și tipul evenimentului (nuntă, botez, petrecere).',
            guide_book_3: 'Confirmăm pachetul și detaliile prin email.',
            guide_book_4: 'Echipa completă ajunge la locație cu sunet, lumină și echipament.',
            site_updated: 'Ultima actualizare: iunie 2026',
            footer_category: 'Servicii pentru nunți',
            footer_areas: 'Zone: Suceava, România · Londra, Anglia · Regatul Unit',
            footer_text: 'Kat Team Events – Facem din sărbătoarea ta un moment de neuitat.',
            title: 'DJ Nuntă & Botez România și Anglia | Solistă, MC | Kat Team Events',
            description: 'DJ, solistă, MC și formație pentru nuntă și botez în România și Anglia. Muzică live, sunet și lumină profesională. Contactați-ne pe WhatsApp sau telefon (+44).',
            keywords: 'dj, dj nunta, dj botez, solista, solistă, formatie, formație, mc, nunta, botez, petrecere, dj romania, wedding dj england, dj anglia, kat team events, dj uk, dj bucuresti, dj cluj, dj timisoara, dj iasi, dj suceava, dj piatra neamt, dj botosani, dj constanta, bucovina, moldova, dobrogea'
        },
        en: {
            skip: 'Skip to main content',
            nav_home: 'Home',
            nav_artists: 'Artists',
            nav_gallery: 'Gallery',
            nav_schedule: 'Book',
            nav_offer: 'What We Offer',
            nav_contact: 'Contact',
            logo_aria: 'Kat Team Events – Home',
            nav_aria: 'Main navigation',
            sound_hint: 'Sound on/off',
            reviews_fab_aria: 'Reviews and recommendations',
            reviews_fab_label: 'Reviews',
            mobile_cta: 'Book now',
            mobile_call: 'Call',
            mobile_call_aria: 'Call on WhatsApp',
            hero_h1: 'Wedding DJ, singer & MC in Romania and England',
            hero_meta: 'DJ · Singer · MC · Wedding & Baptism · Romania & England',
            hero_scroll_aria: 'Discover more',
            tags_title: 'Services & areas',
            tags_services_label: 'Services',
            chips_aria: 'Kat Team Events services',
            chip_dj: 'DJ',
            chip_singer: 'Singer',
            chip_mc: 'MC',
            chip_wedding: 'Wedding',
            chip_baptism: 'Baptism',
            chip_party: 'Party',
            chip_ro: 'Romania',
            chip_uk: 'UK',
            chip_london: 'England',
            region_chips_heading: 'Areas in Romania',
            region_chips_lead: 'DJ, singer and MC for weddings and baptisms — we travel to your venue in the cities and regions below.',
            region_uk_heading: 'UK / England',
            welcomeLine: 'Welcome to our world',
            enjoyLine: 'Enjoy',
            intro1: 'We are delighted to meet you. Kat Team Events is your full entertainment team — professional DJ, live singer and MC — for weddings, baptisms and parties in Romania, and events across England. From the first dance to the last song on the floor, we bring live music, clear sound and professional lighting. Browse our artists, gallery and services, then get in ',
            intro_link: 'touch',
            intro2: ", and together we'll plan every detail of your celebration.",
            video_aria: 'Kat Team Events promo',
            artists_title: 'Artists',
            artists_lead: 'Meet the people behind the music and the magic.',
            jump_aria: 'Jump to artist',
            artist_singer_btn: 'Singer',
            artist_role_dj: 'DJ',
            artist_role_singer: 'Live Singer',
            artist_role_mc: 'MC',
            dj_alt: 'DJ Kat at the decks',
            dj_text: 'DJ Kat has been in the music industry for over 15 years and has built vast experience across different events. He is the right person to take care of the music at any party so you can relax and enjoy. From emotional moments to rocking the floor, DJ Kat brings the right songs at the right moment.',
            diana_alt: 'Diana Onofrei singing',
            diana_text: "Our talented singer Diana Onofrei brings a voice that can deliver soft, sweet blues and invite your loved ones onto the dance floor—or fill the room with power and energy. From her voice, you'll feel that you can sing too.",
            iulian_alt: 'Iulian Arama, Master of Ceremony',
            iulian_text: "He loves to talk, to share innocent jokes, and he brings one of the most infectious, warm energies to the team. Iulian is our Master of Ceremony, with experience in stand-up comedy and opening concerts. If you feel shy or nervous, he'll put you at ease and help everyone enjoy the moment.",
            gallery_title: 'Gallery',
            gallery_lead_emphasis: 'Real wedding moments',
            gallery_lead: " — candid scenes from celebrations we've brought to life with couples and guests.",
            gallery_alt1: 'Kat Team Events at a party',
            gallery_alt2: 'Event atmosphere',
            gallery_alt3: 'Kat Team together',
            gallery_alt4: 'Celebration moment',
            gallery_video1: 'Diana wedding video',
            gallery_video2: 'Slide show Gabi',
            reviews_title: 'Recommendations',
            reviews_lead: 'Were you at an event with us? A short review helps future couples find us — and means the world to our team.',
            reviews_featured_title: 'What our clients say',
            reviews_featured_sub: 'Latest recommendations on Facebook',
            reviews_featured_view_all: 'View all recommendations on Facebook',
            reviews_invite: 'Tell us how the music, live singer, MC and atmosphere felt on the night. A few sentences is enough — thank you!',
            reviews_fb_label: 'Leave a review on Facebook',
            reviews_fb_hint: 'Recommendations from couples and guests',
            reviews_google_label: 'Leave a review on Google',
            reviews_google_hint: 'Helps local search in Romania and the UK',
            reviews_note_before: "Can't leave a review right now? Message us on ",
            reviews_note_after: " — we're happy to share your recommendation (with your permission).",
            schedule_title: 'Book',
            schedule_lead: 'Choose an available date and send your booking request. We will confirm by email.',
            schedule_step_1: 'Pick a month',
            schedule_step_2: 'Choose a free date',
            schedule_step_3: 'Send request',
            schedule_months_aria: 'Available months',
            schedule_booked: 'Booked',
            schedule_available: 'Available',
            schedule_select_hint: 'Tap an available date (gold) to send your request. We will confirm by email.',
            schedule_note: 'We reply as soon as possible. For urgent enquiries, use WhatsApp.',
            schedule_wa_alt: 'Prefer WhatsApp? Message us directly',
            schedule_request_title: 'Confirm this date',
            schedule_modal_eyebrow: 'Booking request',
            schedule_modal_close_aria: 'Close',
            schedule_modal_subtitle: 'Fill in the form — we reply by email within 24 hours.',
            schedule_form_section_contact: 'Your details',
            schedule_form_section_event: 'About your event',
            schedule_form_name: 'Your name',
            schedule_form_name_ph: 'e.g. Maria Popescu',
            schedule_form_email: 'Email',
            schedule_form_email_ph: 'e.g. maria@email.com',
            schedule_form_phone: 'Phone',
            schedule_form_phone_ph: 'e.g. +44 7xxx xxx xxx',
            schedule_form_event: 'Event type',
            schedule_form_event_choose: 'Choose...',
            schedule_form_event_wedding: 'Wedding',
            schedule_form_event_baptism: 'Baptism / Christening',
            schedule_form_event_party: 'Party',
            schedule_form_event_other: 'Other event',
            schedule_form_location: 'Event location',
            schedule_form_location_ph: 'e.g. Venue name, city',
            schedule_form_message: 'Additional details',
            schedule_form_message_ph: 'Estimated guests, preferred hours, other notes...',
            schedule_form_optional: '(optional)',
            schedule_form_trust: 'Your details are only used to confirm your booking. No spam.',
            schedule_form_send: 'Send request',
            schedule_form_close: 'Cancel',
            schedule_form_error: 'Your request could not be sent. Please try again or contact us on WhatsApp.',
            schedule_form_validation: 'Please complete all required fields.',
            schedule_success_title: 'Request sent!',
            schedule_success: 'The Kat Team Events crew will confirm by email as soon as possible.',
            schedule_success_sub: 'Check your Spam folder if you do not hear back within 24 hours.',
            offer_title: 'What We Offer',
            offer_lead: 'The services we bring to your event as a band.',
            offer_tab_event: 'Your Event',
            offer_tab_equipment: 'Equipment Rental',
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
            offer_equipment_lead: 'Audio systems D&b Y10P, VG subs, M4 monitors, E9, Dynacord and SQ5 mixers, Shure UR4D microphones with Beta 58 capsules, Shure PSM300 in-ear monitors, lighting truss, LED curtains, vertical smoke machines and hazers.',
            offer_equipment_s1_title: 'Professional sound system',
            offer_equipment_s1_desc: 'D&b speakers, VG subs, M4 and E9 monitors, plus Dynacord and SQ5 mixers, configured according to the size and acoustics of your venue.',
            offer_equipment_s2_title: 'Lights & effects',
            offer_equipment_s2_desc: 'Lighting truss, LED curtains, projectors and special effects with vertical smoke machines and hazers for a complete show.',
            offer_equipment_s3_title: 'Microphones & monitoring',
            offer_equipment_s3_desc: 'Wireless Shure UR4D microphones with Beta 58 capsules and Shure PSM300 in-ear monitors for artists, presenters and live moments.',
            contact_title: 'Contact',
            contact_intro: "Get in touch from Romania or the UK — we can't wait to create memories together.",
            contact_reach: 'Reach us',
            contact_phone_note: 'Phone and WhatsApp (+44) — available from Romania and the UK.',
            contact_ro_title: 'Romania',
            contact_ro_text: 'Weddings, baptisms and parties across Romania — we travel to your venue with live music, DJ, MC, sound and lighting for halls or private events.',
            contact_uk_title: 'UK / England',
            contact_uk_text: 'Weddings and events across England. Our base is in London (NW4) — see the map below.',
            map_title: 'Map: 25 Colindeep Lane, London NW4 4SG',
            faq_title: 'Frequently asked questions',
            faq_lead: 'Quick answers about where we work and how to reach us.',
            faq_q1: 'Do you perform at weddings and baptisms in Romania?',
            faq_a1: 'Yes. We travel for weddings, baptisms and parties across Romania with DJ, live singer, MC, professional sound and lighting tailored to your venue.',
            faq_q2: 'Do you also work in England / the UK?',
            faq_a2: 'Yes. We are available for weddings and events across England with the same full team and professional equipment.',
            faq_q3: 'How do I contact you from Romania without a local number?',
            faq_a3: 'Call or message us on WhatsApp at +44 7590 299765 — it works for international calls and messages from Romania or the UK.',
            faq_q4: 'What does the Kat Team Events package include?',
            faq_a4: 'DJ and music for the whole event, live singer, MC, professional sound, lighting and effects — plus optional band members and instrumentalists on request.',
            faq_q5: 'How do we book Kat Team Events for our wedding or baptism date?',
            faq_a5: 'Pick an available date in the booking calendar on this site or contact us on WhatsApp / phone (+44 7590 299765). We confirm availability and details by email.',
            faq_q6: 'Do you provide DJ and live singer at the same event?',
            faq_a6: 'Yes. Kat Team Events is one integrated team: DJ Kat, singer Diana Onofrei and MC Iulian Arama work together — mixed music, live moments and coordinated hosting.',
            faq_q7: 'What equipment do you bring to the venue?',
            faq_a7: 'Professional sound (d&b systems, Dynacord and SQ5 mixers), lighting and effects, Shure wireless microphones — plus optional equipment hire for large halls.',
            guide_title: 'About Kat Team Events',
            guide_lead: 'Clear facts about who we are, what we offer and how to book — for weddings, baptisms and parties in Romania and England.',
            guide_def_heading: 'What is Kat Team Events?',
            guide_def_text: 'Kat Team Events is a wedding and party entertainment team in Romania and the UK: professional DJ, live singer and MC as one coordinated band, with sound, lighting and stage equipment. We travel to your venue in Romania or England.',
            guide_table_caption: 'Kat Team Events services — summary',
            guide_th_service: 'Service',
            guide_th_includes: 'What\'s included',
            guide_th_areas: 'Areas',
            guide_r1_s: 'DJ & music',
            guide_r1_i: 'Full-evening music from emotional moments to the dance floor',
            guide_r1_a: 'Romania, England',
            guide_r2_s: 'Live singer',
            guide_r2_i: 'Diana Onofrei — pop, blues, traditional',
            guide_r2_a: 'Romania, England',
            guide_r3_s: 'MC & hosting',
            guide_r3_i: 'Iulian Arama — announcements, flow, guest engagement',
            guide_r3_a: 'Romania, England',
            guide_r4_s: 'Sound, lights, effects',
            guide_r4_i: 'Professional PA, room lighting, smoke and CO2',
            guide_r4_a: 'Romania, England',
            guide_book_heading: 'How to book Kat Team Events',
            guide_book_1_before: 'Check availability in the ',
            guide_book_1_link: 'booking calendar',
            guide_book_1_after: ' or on WhatsApp (+44 7590 299765).',
            guide_book_2: 'Send your date, venue and event type (wedding, baptism, party).',
            guide_book_3: 'We confirm the package and details by email.',
            guide_book_4: 'The full team arrives at your venue with sound, lighting and equipment.',
            site_updated: 'Last updated: June 2026',
            footer_category: 'Wedding service',
            footer_areas: 'Areas: Suceava, Romania · London, England · United Kingdom',
            footer_text: 'Kat Team Events – Making your celebration unforgettable.',
            title: 'Wedding DJ England & Romania | Singer, MC & Band | Kat Team Events',
            description: 'Kat Team Events — wedding and event DJ, live singer and MC in England and Romania. Professional sound, lighting and live music. Call or WhatsApp (+44).',
            keywords: 'wedding DJ, event DJ, live singer, MC, band, party entertainment, England DJ, wedding DJ England, Romania wedding DJ, Kat Team Events, DJ Bucharest, DJ Cluj, DJ Timisoara, DJ Iasi, DJ Suceava, Bucovina, Moldova, Dobrogea'
        }
    };

    function setMetaTag(name, content) {
        if (!content) {
            var existing = document.querySelector('meta[name="' + name + '"]');
            if (existing) existing.parentNode.removeChild(existing);
            return;
        }
        var meta = document.querySelector('meta[name="' + name + '"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    function setOgMeta(property, content) {
        if (!content) return;
        var meta = document.querySelector('meta[property="' + property + '"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    function setOpenGraph(lang) {
        var t = T[lang];
        if (!t) return;
        setOgMeta('og:url', SITE_URL);
        setOgMeta('og:title', t.title);
        setOgMeta('og:description', t.description);
        setOgMeta('og:image', SITE_IMAGE);
        setOgMeta('og:locale', lang === 'ro' ? 'ro_RO' : 'en_GB');
        var canonical = document.getElementById('canonicalLink');
        if (canonical) canonical.setAttribute('href', SITE_URL);
    }

    function setSchema(lang) {
        var t = T[lang];
        var el = document.getElementById('seoSchema');
        if (!el || !t) return;
        var schema = {
            '@context': 'https://schema.org',
            '@type': 'EntertainmentBusiness',
            '@id': SITE_URL + '#business',
            name: 'Kat Team Events',
            url: SITE_URL,
            image: SITE_IMAGE,
            description: t.description,
            telephone: SCHEMA_PHONE,
            address: SCHEMA_ADDRESS,
            sameAs: SCHEMA_SAME_AS,
            areaServed: buildAreaServed(),
            additionalType: [
                'https://schema.org/LocalBusiness',
                'https://schema.org/WeddingService'
            ],
            contactPoint: [{
                '@type': 'ContactPoint',
                telephone: SCHEMA_PHONE,
                contactType: 'customer service',
                areaServed: ['RO', 'GB'],
                availableLanguage: ['Romanian', 'English']
            }],
            openingHoursSpecification: [{
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                    'Friday', 'Saturday', 'Sunday'
                ],
                opens: '09:00',
                closes: '21:00'
            }],
            hasMap: SCHEMA_MAP_URL,
            knowsAbout: lang === 'ro'
                ? ['DJ', 'DJ nunta', 'DJ botez', 'solistă', 'formație', 'MC', 'nuntă', 'botez', 'petrecere', 'wedding DJ England']
                : ['Wedding DJ', 'Wedding DJ England', 'Live singer', 'MC', 'Band', 'Party entertainment', 'Romania events'],
            serviceType: lang === 'ro'
                ? ['DJ nunta', 'DJ botez', 'Solistă live', 'Formație evenimente', 'MC petrecere', 'Nuntă UK']
                : ['Wedding DJ', 'Event DJ', 'Live singer', 'MC services', 'Party entertainment', 'Romania weddings']
        };
        el.textContent = JSON.stringify(schema);
    }

    function setWebsiteSchema(lang) {
        var t = T[lang];
        var el = document.getElementById('websiteSchema');
        if (!el || !t) return;
        el.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Kat Team Events',
            url: SITE_URL,
            inLanguage: lang === 'ro' ? ['ro-RO', 'en-GB'] : ['en-GB', 'ro-RO'],
            description: t.description
        });
    }

    function setFaqSchema(lang) {
        var t = T[lang];
        var el = document.getElementById('faqSchema');
        if (!el || !t) return;
        var mainEntity = [];
        for (var i = 1; i <= FAQ_COUNT; i++) {
            var q = t['faq_q' + i];
            var a = t['faq_a' + i];
            if (!q || !a) continue;
            mainEntity.push({
                '@type': 'Question',
                name: q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: a
                }
            });
        }
        el.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: mainEntity
        });
    }

    function setMeta(lang) {
        var t = T[lang];
        if (t && t.title) document.title = t.title;
        setMetaTag('description', t && t.description);
        setMetaTag('keywords', t && t.keywords);
        setMetaTag('geo.region', lang === 'ro' ? 'RO' : null);
        setOpenGraph(lang);
        setSchema(lang);
        setWebsiteSchema(lang);
        setFaqSchema(lang);
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

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (t[key] != null) el.setAttribute('placeholder', t[key]);
        });

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

    window.KatTeamI18n = T;
})();
