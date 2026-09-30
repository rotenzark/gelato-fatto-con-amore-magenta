/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'gelato-fatto-con-amore-magenta',
    /* nessun WhatsApp pubblicato: solo il telefono */
    whatsapp: { number: '', message: '', ids: [] },
    /* Google (30/9/2026), bio Instagram e cartello in vetrina: martedì–domenica 12–22; lunedì chiuso */
    hours: {
      0: [['12:00', '22:00']], 1: [], 2: [['12:00', '22:00']], 3: [['12:00', '22:00']],
      4: [['12:00', '22:00']], 5: [['12:00', '22:00']], 6: [['12:00', '22:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1060,
    EN: {
      "m.salta": "Skip to the content",
      "m.top": "Gelato Fatto con Amore: back to the top",
      "m.nav": "The sections",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "n.lab": "Workshop",
      "n.gusti": "Flavours",
      "n.torte": "Cakes",
      "n.negozio": "The shop",
      "n.dicono": "Reviews",
      "n.orari": "Hours",
      "n.domande": "Questions",
      "t.chiama": "Call",
      "t.indicazioni": "Directions",
      "h.sopra": "Artisan gelato shop · Corso Magenta 30, Milan",
      "h.titolo": "Made every day, in the workshop in full view.",
      "h.testo": "Artisan gelato made every day with real seasonal fruit and the traditional creams, in the workshop on Corso Magenta, a short walk from Cadorna. Tuesday to Sunday, from 12 noon to 10 pm.",
      "h.chi": "Lorenzo Bertini, in a review on Google (in Italian: «a name and a promise»)",
      "h.google": "on Google, 2,468 reviews",
      "p.titolo": "The batch freezer",
      "p.desc": "The batch freezer seen from the front, under their gold lettering: in the porthole the gelato turns with the dasher; the lever goes down, a ribbon of gelato comes out of the spout and folds in layers into the steel tray, then the lever goes back up and the flavour label arrives on the tray. Next to it, the fruit in its crate. Four flavours from their Instagram: strawberry grape, crema antica, fig, peach.",
      "p.d0": "Uva fragolina (strawberry grape): «creamy, beautifully coloured and irresistibly fragrant».",
      "p.d1": "Crema antica: «made with eggs and a delicate touch of lemon zest».",
      "p.d2": "Fig: made with fresh blended fruit.",
      "p.d3": "Peach: real fruit, blended and transformed every day.",
      "p.modi": "Which flavour",
      "p.nota": "The four flavours come from their 2026 Instagram; the lettering on the wall is the one in the shop.",
      "l.etichetta": "The workshop in full view",
      "l.titolo": "First the work, then the magic",
      "l.sotto": "Their words, like the ones they were already writing in 2021: «Our gelato is made every day, fresh, in our workshop in full view. We only use top-quality ingredients».",
      "a.nastroUva": "Strawberry grape gelato coming out of the batch freezer in a ribbon and folding into the tray.",
      "a.nastroCrema": "Crema antica coming out of the batch freezer in a ribbon.",
      "a.nastroYogurt": "Greek yoghurt gelato coming out of the batch freezer in a ribbon.",
      "k.set": "September 2026",
      "k.giu": "June 2026",
      "k.yogurt": "Greek yoghurt",
      "c.etichetta": "The 2026 flavours",
      "c.titolo": "From the crate to the tray",
      "c.sotto": "On their Instagram every flavour comes in two photos: first the fruit, then the gelato. Here are six, with their own words. The fruit follows the season: to know what is on today, look at their Instagram or give them a call.",
      "a.fichi": "Fresh figs.",
      "a.fico": "Fig gelato in the tray, with a cut fig.",
      "c.ficoN": "Fig",
      "c.fico": "«Creamy, artisan and made with fresh blended fruit.»",
      "c.giu": "Instagram, June 2026",
      "a.pesche": "Peaches in their crates.",
      "a.pesca": "Fruit gelato coming out of the batch freezer.",
      "c.pescaN": "Melon or peach?",
      "c.pesca": "«Our new flavours are handmade with real fruit, blended and transformed every day with care and passion.»",
      "a.limoni": "Lemons in the crate.",
      "a.limone": "Lemon gelato in the tray.",
      "c.limoneN": "Lemon",
      "c.limone": "«Our lemon starts from fresh lemons worked every day. Simple, genuine and wonderfully thirst-quenching.»",
      "c.mag": "Instagram, May 2026",
      "a.radici": "Fresh ginger in the crate.",
      "a.zenzero": "Ginger gelato in the tray.",
      "c.zenzeroN": "Ginger",
      "c.zenzero": "«The ginger takes shape until it becomes one of our most unusual flavours.»",
      "a.pompelmo": "A pink grapefruit cut in half, and ginger.",
      "a.granita": "Grapefruit and ginger granita in the tray.",
      "c.granitaN": "Grapefruit and ginger granita",
      "c.granita": "«A perfect balance of freshness and character. Our artisan granita is summer in a spoon.»",
      "a.angFetta": "A watermelon cut open.",
      "a.anguria": "Watermelon granita in the tray.",
      "c.anguriaN": "Watermelon",
      "c.anguria": "«If summer had a taste, it would be watermelon.» The granita and the ice lolly.",
      "o2.etichetta": "To order",
      "o2.titolo": "The gelato cake, with the flavours you choose",
      "o2.loro": "«Made with our artisan gelato and quality ingredients, it is perfect for birthdays, parties or to make a summer day even sweeter. Choose your favourite flavours and make it your own.»",
      "o2.come": "You order it in the shop, at Corso Magenta 30; for timing, give them a call.",
      "a.decoro": "Decorating the gelato cake with a piping bag.",
      "k.decoro": "The decoration.",
      "a.fragole": "Strawberries placed on the gelato cake with tweezers.",
      "k.fragole": "The strawberries.",
      "a.torta": "The finished gelato cake, with the chocolate star and the strawberries.",
      "k.torta": "Ready. From their Instagram, July 2026.",
      "b.titolo": "And the little cookies",
      "b.loro": "«Our little cookies come in the flavours of our most classic and beloved gelato.»",
      "b.gusti": "Stracciatella, 100% dark chocolate and pistachio (Instagram, September 2026).",
      "a.biscotti": "Gelato cookies half-dipped in chocolate, in a row in the tray.",
      "a.biscotto": "A gelato cookie dipped in chocolate.",
      "a.granella": "Gelato cookies with chopped nuts, one on top of the other.",
      "g.etichetta": "The shop",
      "g.titolo": "Under the teal awning",
      "g.testo": "At Corso Magenta 30, a short walk from Cadorna and Palazzo Litta: the teal awning, the gold cartouche on the door, the lettering above the cream shelves, the display of flavours with their labels.",
      "a.scritta": "The gold lettering «gelato FATTO CON AMORE» above the shelves, with the letter A, the jars and the cups.",
      "a.facciata": "The teal awning «gelato FATTO CON AMORE» and the glass door with their gold logo.",
      "k.facciata": "Corso Magenta 30.",
      "a.vetrina": "The display of flavours: chocolate, stracciatella, gianduia, biscotto, with their labels.",
      "k.vetrina": "The display of flavours.",
      "a.bancone": "The gold lettering, the cream shelves with the cups and the gelato counter.",
      "k.bancone": "The counter.",
      "a.finestra": "The window under the awning, with the gold cartouche «Gelato fatto con amore, Milano», and behind it the crate of lemons and the ginger.",
      "k.finestra": "Behind the glass, the crate of lemons.",
      "g.nota": "The photos of the gelato and the fruit come from their Instagram page; those of the shop from Google reviews by customers who gave five stars.",
      "d.etichetta": "Reviews",
      "d.titolo": "Just as the name says",
      "d.google": "on Google, 2,468 reviews",
      "d.g4a": "Google, 4 years ago",
      "d.g2m": "Google, 2 months ago",
      "d.g1a": "Google, a year ago",
      "d.g7a": "Google, 7 years ago",
      "d.g9m": "Google, 9 months ago",
      "d.g1m": "Google, a month ago",
      "d.nota": "From the reviews on Google, as they were written (in Italian); cuts are marked […]. The line at the top also comes from a review on Google.",
      "d.tutte": "All the reviews on Google",
      "o.etichetta": "Hours and where",
      "o.titolo": "Tuesday to Sunday, from 12 noon to 10 pm",
      "o.cap": "Opening hours",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "o.chiuso": "Closed",
      "o.nota": "Hours from their Google listing, their Instagram page and the sign in the window (September 2026). On holidays the hours may change: it is best to call.",
      "o.mappa": "Map: Gelato Fatto con Amore, Corso Magenta 30, Milan",
      "o.dove": "Where",
      "o.dovev": "Corso Magenta 30, 20123 Milan: about 70 metres from Palazzo Litta",
      "o.metro": "By metro",
      "o.metrov": "M1 and M2 Cadorna, about 250 metres away; M1 Cairoli, about 430",
      "o.tram": "By tram",
      "o.tramv": "16 and 19, Corso Magenta / Via Nirone stop, about 35 metres away",
      "o.tel": "Phone",
      "o.social": "Social",
      "q.etichetta": "Questions",
      "q.titolo": "Before you come",
      "q.1": "Are you open on Monday?",
      "q.1r": "No, the shop is closed on Monday. From Tuesday to Sunday it is open from 12 noon to 10 pm.",
      "q.2": "Are there gluten-free flavours? And lactose-free?",
      "q.2r": "On their Instagram page they write «Also gluten-free products», and customers mention the gluten-free cone and lactose-free and vegan flavours too. They change from day to day: ask at the counter, and if you have an allergy, tell them.",
      "q.3": "How do I order a gelato cake?",
      "q.3r": "In the shop: «Come to the shop to order your gelato cake!», they write. You choose the flavours and the decoration; for timing, call 02 8408 2297.",
      "q.4": "Can I taste the flavours?",
      "q.4r": "More than one customer says that at the counter they let you taste the flavours and suggest pairings before you choose.",
      "q.5": "Which flavours are on today?",
      "q.5r": "The fruit flavours follow the season (this year fig, peach, melon, watermelon, strawberry grape…); next to them there are the creams, from the classic ones to the more unusual, like ginger. To know what is on today, look at their Instagram or give them a call.",
      "f2.orario": "Tuesday–Sunday 12 noon–10 pm · closed on Monday",
      "f2.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a> · the photos come from their Instagram page and from Google reviews; hours and reviews from their Google listing (September 2026). We drew the batch freezer ourselves, from their photos.",
      "f2.su": "Back to the top ↑"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ GELATO FATTO CON AMORE — Corso Magenta 30 ══════════
     la FIRMA — «la mantecatura»: la mantecatrice vista di fronte. La leva si abbassa, dalla bocca scende il nastro e si piega a strati
     nella vaschetta (nell'oblò la frusta gira e il gelato cala), la leva torna su, il nastro si stacca e arriva il cartellino. Lo stato è
     M (il gusto), T (0…1) e V (0 al suo posto; fino a 1 il banco pieno scivola via a destra; da −1 a 0 arriva quello vuoto del gusto
     nuovo). Senza JS e alla fine: uva fragolina, T = 1, V = 0 (l'HTML). L'attesa (classe nell'head): la vaschetta vuota, l'oblò pieno.
     Reduced-motion: tutto subito. rAF a tempo, guardia 1,5 s, IO al 60 %, resize solo se cambia la larghezza; un gesto durante
     l'animazione la ferma dov'è. */
  var DATI = {"vb":[640,470],"bocca":{"x":230,"y":302},"oblo":{"x":230,"y":200},"leva":{"x":306,"y":236,"chiusa":-58,"aperta":26},"liv":94,"giri":6,"via":520,"fasi":{"leva":{"t":0,"d":0.07},"cade":{"t":0.05,"d":0.07},"esce":{"t":0.12,"d":0.72},"stacca":{"t":0.84,"d":0.06},"cartellino":{"t":0.9,"d":0.1}},"tempi":{"inizio":300,"mantecatura":4800,"servi":480,"arriva":460,"mantecaturaV":4000},"righe":[[0,0.13547],[0.13547,0.27123],[0.27123,0.40719],[0.40719,0.54251],[0.54251,0.66734],[0.66734,0.77707],[0.77707,0.86952],[0.86952,0.94453],[0.94453,1]],"punte":[[146,398],[151.76,398.3],[157.53,398.58],[163.29,398.84],[169.06,399.07],[174.82,399.28],[180.59,399.48],[186.36,399.65],[192.13,399.8],[197.89,399.92],[203.66,400.03],[209.43,400.12],[215.2,400.18],[220.97,400.22],[226.74,400.25],[232.51,400.25],[238.28,400.23],[244.05,400.19],[249.82,400.13],[255.59,400.04],[261.36,399.94],[267.13,399.81],[272.9,399.67],[278.67,399.5],[284.43,399.31],[290.2,399.1],[295.97,398.87],[301.73,398.61],[307.49,398.34],[313.26,398.04],[318.92,397.14],[323.04,393.37],[319.94,389.33],[314.2,389.15],[308.43,389.44],[302.67,389.71],[296.9,389.95],[291.14,390.18],[285.37,390.38],[279.6,390.56],[273.84,390.72],[268.07,390.86],[262.3,390.98],[256.53,391.07],[250.76,391.15],[244.99,391.2],[239.22,391.24],[233.45,391.25],[227.68,391.24],[221.91,391.21],[216.14,391.16],[210.37,391.09],[204.6,390.99],[198.83,390.88],[193.06,390.75],[187.29,390.59],[181.53,390.41],[175.76,390.21],[169.99,389.99],[164.23,389.75],[158.46,389.48],[152.7,389.2],[146.94,388.87],[141.53,387],[138.61,382.41],[143.44,380.01],[149.21,380.27],[154.97,380.55],[160.74,380.81],[166.5,381.05],[172.27,381.26],[178.03,381.46],[183.8,381.63],[189.57,381.78],[195.34,381.91],[201.11,382.02],[206.88,382.11],[212.65,382.18],[218.42,382.22],[224.19,382.25],[229.96,382.25],[235.73,382.23],[241.5,382.19],[247.27,382.13],[253.04,382.05],[258.81,381.95],[264.58,381.83],[270.34,381.68],[276.11,381.52],[281.88,381.33],[287.65,381.12],[293.41,380.89],[299.18,380.64],[304.94,380.37],[310.7,380.07],[316.41,379.39],[321.46,376.7],[322.05,371.85],[316.42,371.08],[310.66,371.38],[304.9,371.65],[299.13,371.9],[293.37,372.13],[287.6,372.34],[281.83,372.53],[276.07,372.69],[270.3,372.83],[264.53,372.96],[258.76,373.06],[252.99,373.14],[247.22,373.19],[241.45,373.23],[235.68,373.25],[229.91,373.24],[224.14,373.22],[218.37,373.17],[212.6,373.11],[206.83,373.02],[201.06,372.91],[195.29,372.78],[189.52,372.62],[183.76,372.45],[177.99,372.25],[172.22,372.04],[166.46,371.8],[160.69,371.54],[154.93,371.26],[149.17,370.98],[143.85,369.07],[144.15,363.99],[149.48,362.04],[155.24,362.26],[161,362.57],[166.76,362.85],[172.53,363.11],[178.29,363.34],[184.06,363.54],[189.83,363.72],[195.6,363.87],[201.37,364],[207.13,364.1],[212.9,364.17],[218.67,364.22],[224.44,364.25],[230.21,364.25],[235.98,364.22],[241.75,364.17],[247.52,364.09],[253.29,363.99],[259.06,363.86],[264.83,363.7],[270.6,363.52],[276.36,363.31],[282.13,363.08],[287.89,362.82],[293.66,362.54],[299.42,362.23],[305.18,361.88],[308.46,358.25],[304.33,354.41],[298.77,353.03],[293.01,353.32],[287.25,353.67],[281.48,353.98],[275.72,354.26],[269.96,354.51],[264.19,354.72],[258.42,354.89],[252.65,355.03],[246.88,355.14],[241.11,355.21],[235.34,355.24],[229.57,355.25],[223.8,355.22],[218.03,355.15],[212.27,355.05],[206.5,354.91],[200.73,354.75],[194.96,354.54],[189.2,354.3],[183.43,354.03],[177.67,353.72],[171.91,353.38],[166.15,353],[161.12,350.94],[163.96,346.32],[169.3,344.25],[175.05,344.24],[180.8,344.67],[186.56,345.05],[192.32,345.37],[198.09,345.65],[203.85,345.87],[209.62,346.04],[215.39,346.16],[221.16,346.23],[226.93,346.25],[232.7,346.22],[238.47,346.13],[244.24,345.99],[250,345.81],[255.77,345.57],[261.53,345.28],[267.29,344.93],[273.05,344.54],[278.8,344.09],[284.31,342.81],[282.85,337.95],[277.69,335.47],[271.97,335.2],[266.23,335.76],[260.48,336.23],[254.72,336.62],[248.96,336.91],[243.19,337.11],[237.42,337.22],[231.65,337.25],[225.88,337.18],[220.11,337.03],[214.35,336.78],[208.59,336.45],[202.83,336.02],[197.09,335.51],[191.34,334.97],[189.05,331.59],[193.74,328.28],[199.18,326.43],[204.9,326.29],[210.62,327.09],[216.36,327.67],[222.11,328.06],[227.88,328.24],[233.65,328.21],[239.42,327.98],[245.17,327.54],[250.9,326.89],[256.61,326.05],[260.93,322.75],[258.7,317.7],[253.61,315.11],[247.88,315]],"gusti":[{"nome":"Uva fragolina"},{"nome":"Crema antica"},{"nome":"Fico"},{"nome":"Pesca"}]};
  /* la mantecatura a (M, T, V) — una sola fonte: la usa main.js (via gfa_main.cjs) e la prova (firma-prova.mjs).
     T = 1, V = 0 dà gli stessi attributi dell'HTML; T = 0 gli stessi pixel dell'attesa (il CSS .firma-attesa). */
  function creaMantecatrice(svg, D) {
    var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
    var r2 = function (n) { return Math.round(n * 100) / 100; };
    var r3 = function (n) { return Math.round(n * 1000) / 1000; };
    /* la fine di una fase arriva a 1 esatto (#256) */
    var fase = function (t, w) { return t >= w.t + w.d - 1e-9 ? 1 : c01((t - w.t) / w.d); };
    var dolce = function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
    var leva = svg.querySelector('.leva'), frusta = svg.querySelector('.frusta'), banco = svg.querySelector('.banco'), cart = svg.querySelector('.cartellino');
    var G = D.gusti.map(function (_, m) {
      var q = function (s) { return svg.querySelector(s + '[data-m="' + m + '"]'); };
      var pila = q('.pila'), cad = q('.caduta');
      return {
        strati: pila ? [].slice.call(pila.querySelectorAll('.strato')).map(function (g) { return [].slice.call(g.querySelectorAll(':scope > path')); }) : [],
        caduta: cad,
        nastro: cad ? [].slice.call(cad.querySelectorAll(':scope > path')) : [],
        livello: q('.oblo__livello')
      };
    });
    /* la punta del nastro lungo la pila, a una frazione w della sua lunghezza */
    function punta(w) {
      var K = D.punte.length - 1, f = w * K, i = Math.min(K - 1, Math.floor(f)), u = f - i, a = D.punte[i], b = D.punte[i + 1];
      return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
    }
    function disegna(m, t, v) {
      var F = D.fasi, q = G[m];
      var pL = fase(t, F.leva), pC = fase(t, F.cade), w = fase(t, F.esce), pS = fase(t, F.stacca), pK = fase(t, F.cartellino);
      /* la leva si abbassa per aprire e torna su quando il nastro si stacca */
      leva.setAttribute('transform', 'rotate(' + r2(D.leva.chiusa + (D.leva.aperta - D.leva.chiusa) * (dolce(pL) - dolce(pS))) + ' ' + D.leva.x + ' ' + D.leva.y + ')');
      /* nell'oblò la frusta gira e il gelato scende quanto ne è uscito */
      frusta.setAttribute('transform', 'rotate(' + r2((w * D.giri * 360) % 360) + ' ' + D.oblo.x + ' ' + D.oblo.y + ')');
      q.livello.setAttribute('transform', 'translate(0 ' + r2(D.liv * w) + ')');
      /* la pila: ogni strato si stende quando ci arriva il nastro */
      q.strati.forEach(function (paths, i) {
        var R = D.righe[i], p = w >= R[1] - 1e-9 ? 1 : c01((w - R[0]) / (R[1] - R[0]));
        paths.forEach(function (x) { x.setAttribute('stroke-dashoffset', String(r3(1 - p))); });
      });
      /* il nastro che cade dalla bocca alla punta: scende, segue la pila, si stacca dall'alto */
      var tp = punta(w), bx = D.bocca.x, by = D.bocca.y, dy = tp[1] - by;
      var d = 'M' + bx + ' ' + by + ' C' + bx + ' ' + r2(by + 0.55 * dy) + ' ' + r2(tp[0]) + ' ' + r2(tp[1] - 0.35 * dy) + ' ' + r2(tp[0]) + ' ' + r2(tp[1]);
      var off = pS > 0 ? -pS : 1 - pC;
      q.caduta.setAttribute('opacity', v === 0 && pC > 0 && pS < 1 ? '1' : '0');
      q.nastro.forEach(function (x) { x.setAttribute('d', d); x.setAttribute('stroke-dashoffset', String(r3(off))); });
      /* il cartellino arriva alla fine */
      cart.setAttribute('opacity', String(r3(pK)));
      cart.setAttribute('transform', 'translate(0 ' + r2(-14 * Math.pow(1 - pK, 2)) + ')');
      /* col V il banco (vaschetta e cassetta) scivola via a destra e quello nuovo arriva da destra */
      banco.setAttribute('transform', 'translate(' + r2(v > 0 ? D.via * v : v < 0 ? -D.via * v : 0) + ' 0)');
    }
    var completo = !!leva && !!frusta && !!banco && !!cart && G.length === D.gusti.length && G.every(function (q) { return q.strati.length === D.righe.length && q.strati.every(function (s) { return s.length === 3; }) && q.caduta && q.nastro.length === 3 && q.livello; });
    return { disegna: disegna, pezzi: G, completo: completo };
  }

  var prendi = function (id) { return document.getElementById(id); };
  var figuraF = prendi('mantecatura-firma'), svgF = prendi('mantecaSvg'), leggiF = prendi('mantecaLeggi');
  var MANT = svgF ? creaMantecatrice(svgF, DATI) : null;
  var BOTTONI = [].slice.call(document.querySelectorAll('.mantecatura__modi button[data-modo]'));
  var TF = DATI.tempi;
  var faseF = 'fatta', modoF = '', rafF = 0, guardiaF = 0, larghezzaAvvioF = 0, corseF = 0, pianoF = null;
  var MF = 0, TT = 1, VF = 0;
  var destinazioneF = { m: 0 };
  var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
  var CURVE = {
    dolce: function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    lineare: function (u) { return u; }
  };
  function annunciaF(m) {
    var el = document.querySelector('.mantecatura__d[data-m="' + m + '"]');
    if (leggiF) leggiF.textContent = el ? el.textContent : '';
  }
  function disegnaF(m, t, v) {
    if (m !== MF || figuraF.getAttribute('data-modo') !== String(m)) {
      MF = m;
      figuraF.setAttribute('data-modo', String(m));
      BOTTONI.forEach(function (bt) { bt.setAttribute('aria-pressed', String(+bt.getAttribute('data-modo') === m)); });
    }
    TT = t; VF = v;
    MANT.disegna(m, t, v);
  }
  /* un piano: tratti { da, a, m, x0: {t, v}, x1: {…}, curva } */
  function fotogrammaF(t) {
    var P = pianoF.piano, cur = null;
    for (var i = 0; i < P.length; i++) if (t >= P[i].da) cur = P[i];
    if (!cur) return;
    var q = t < cur.a ? c01((t - cur.da) / Math.max(1, cur.a - cur.da)) : 1, e = CURVE[cur.curva](q), A = cur.x0, B = cur.x1;
    disegnaF(cur.m, A.t + (B.t - A.t) * e, A.v + (B.v - A.v) * e);
  }
  var st2 = function (t, v) { return { t: t, v: v }; };
  function sorvegliaF() { clearTimeout(guardiaF); guardiaF = setTimeout(chiudiF, 1500); }
  function chiudiF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    disegnaF(destinazioneF.m, 1, 0);
    /* i gusti nascosti tornano come nell'HTML (#257) */
    DATI.gusti.forEach(function (_, k) { if (k !== destinazioneF.m) MANT.disegna(k, 1, 0); });
    MANT.disegna(destinazioneF.m, 1, 0);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    root.classList.remove('firma-attesa');
    faseF = 'fatta';
  }
  /* un gesto durante un'animazione (o nell'attesa): tutto si ferma dov'è (#244); dall'attesa resta la vaschetta vuota */
  function fermaF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    if (root.classList.contains('firma-attesa')) { disegnaF(MF, 0, 0); root.classList.remove('firma-attesa'); }
    else disegnaF(MF, TT, VF);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    faseF = 'fatta';
  }
  function avviaF(modo, piano) {
    cancelAnimationFrame(rafF); rafF = 0;
    modoF = modo; pianoF = piano;
    root.classList.remove('firma-attesa');
    faseF = 'corre'; if (figuraF) figuraF.setAttribute('data-firma', 'corre');
    larghezzaAvvioF = window.innerWidth;
    var t0 = null, corsa = ++corseF;
    function fotogramma(ts) {
      rafF = 0;
      /* un fotogramma rimasto in coda dopo la chiusura (o di una corsa vecchia) non riapre niente */
      if (faseF !== 'corre' || corsa !== corseF) return;
      if (t0 === null) t0 = ts;
      var t = ts - t0;
      fotogrammaF(t);
      if (t >= pianoF.fine) { chiudiF(); return; }
      sorvegliaF();
      rafF = requestAnimationFrame(fotogramma);
    }
    sorvegliaF();
    rafF = requestAnimationFrame(fotogramma);
  }
  function avviaIntroF() {
    /* dalla classe d'attesa agli attributi senza cambiare un pixel: la vaschetta vuota, l'oblò pieno */
    disegnaF(0, 0, 0);
    destinazioneF = { m: 0 };
    var P = [{ da: 0, a: TF.inizio, m: 0, x0: st2(0, 0), x1: st2(0, 0), curva: 'lineare' }, { da: TF.inizio, a: TF.inizio + TF.mantecatura, m: 0, x0: st2(0, 0), x1: st2(1, 0), curva: 'lineare' }];
    avviaF('intro', { piano: P, fine: TF.inizio + TF.mantecatura });
  }
  /* il gesto: scegliere un gusto. Se è quello che si sta già facendo, niente; altrimenti tutto si ferma dov'è, il banco scivola via,
     arriva quello del gusto nuovo con la vaschetta vuota e la mantecatrice ricomincia. */
  function sceltaF(m) {
    if (faseF === 'corre' && destinazioneF.m === m) return;
    if (faseF === 'corre' || root.classList.contains('firma-attesa')) fermaF();
    destinazioneF = { m: m };
    annunciaF(m);
    if (reducedMotion) { chiudiF(); return; }
    var P = [], t = 0, mm = MF, a = st2(TT, VF);
    var passo = function (dura, m2, b, curva) { P.push({ da: t, a: t + dura, m: m2, x0: a, x1: b, curva: curva }); t += dura; a = b; };
    if (a.v >= 0) {
      passo(TF.servi, mm, st2(a.t, 1), 'dolce');
      a = st2(0, -1);
    }
    passo(TF.arriva, m, st2(0, 0), 'dolce');
    passo(TF.mantecaturaV, m, st2(1, 0), 'lineare');
    avviaF('prepara', { piano: P, fine: t });
  }

  /* la testata segna la sezione in cui ti trovi */
  var linkVoci = [].slice.call(document.querySelectorAll('#mainNav a'));
  var bersagliVoci = linkVoci.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function aggiornaVoci() {
    var y = (document.getElementById('testata') || { offsetHeight: 80 }).offsetHeight + 40, ora = -1;
    for (var i = 0; i < bersagliVoci.length; i++) { if (bersagliVoci[i] && bersagliVoci[i].getBoundingClientRect().top <= y) ora = i; }
    linkVoci.forEach(function (a, k) { if (k === ora) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var tickVoci = 0;
  window.addEventListener('scroll', function () {
    if (tickVoci) return;
    tickVoci = requestAnimationFrame(function () { tickVoci = 0; aggiornaVoci(); });
  }, { passive: true });
  aggiornaVoci();

  /* lo stato degli orari anche sopra la tabella */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  /* la copia segue lo stato principale a ogni cambio, anche di lingua (#243, stato-lingua-check) */
  (function () {
    var primoS = document.getElementById(SITE.hoursStatusId);
    if (primoS && window.MutationObserver) new MutationObserver(copiaStato).observe(primoS, { childList: true, characterData: true, subtree: true });
  })();

  /* la firma è «in vista» quando se ne vede almeno il 60% (o il 60% della finestra, se è più alta della finestra); l'altezza è quella
     del documento: all'avvio innerHeight di un telefono può non essere ancora quella vera (#233) */
  function altezzaVista() { return document.documentElement.clientHeight || window.innerHeight || 800; }
  function abbastanza(top, bottom, alto, vh) { return Math.min(bottom, vh) - Math.max(top, 0) >= 0.6 * Math.min(alto, vh); }
  function inVistaF() { var r = svgF.getBoundingClientRect(); return abbastanza(r.top, r.bottom, r.height, altezzaVista()); }

  if (figuraF && svgF && MANT && MANT.completo && BOTTONI.length === DATI.gusti.length) {
    try { clearTimeout(window.__attesaManteca); } catch (e) {}
    window.__manteca = {
      stato: function () {
        return { fase: faseF, modo: modoF, corse: corseF, m: MF, t: TT, v: VF, meta: destinazioneF.m };
      },
      tempi: TF,
    };
    var daFareF = !reducedMotion && root.classList.contains('firma-attesa');
    /* la pagina aperta su una sezione (#orari): il browser ci scorre dopo, la firma non si vedrebbe */
    var ancoraF = location.hash && location.hash.length > 1 && location.hash !== '#inizio';
    var inVista = inVistaF();
    /* perché la firma è partita o no (lo legge il check) */
    window.__manteca.avvio = { daFare: daFareF, ancora: !!ancoraF, inVista: inVista, top: svgF.getBoundingClientRect().top, vh: altezzaVista() };
    if (!daFareF || ancoraF) chiudiF();
    else if (inVista) avviaIntroF();
    else if ('IntersectionObserver' in window) {
      /* la firma sotto la piega (sul telefono): parte quando se ne vede abbastanza; fino ad allora resta la vaschetta vuota */
      var soglie = []; for (var sg = 0; sg <= 20; sg++) soglie.push(sg / 20);
      var ioF = new IntersectionObserver(function (voci) {
        if (!voci.some(function (v) { return v.isIntersecting && abbastanza(v.boundingClientRect.top, v.boundingClientRect.bottom, v.boundingClientRect.height, altezzaVista()); })) return;
        ioF.disconnect();
        if (faseF === 'fatta' && root.classList.contains('firma-attesa')) avviaIntroF();
      }, { threshold: soglie });
      ioF.observe(svgF);
      window.__manteca.avvio.aspetta = true;
    } else chiudiF();
    /* un resize chiude la firma solo se cambia la LARGHEZZA (sul telefono arrivano resize della sola altezza, #228) */
    window.addEventListener('resize', function () {
      if (faseF !== 'corre' || Math.abs(window.innerWidth - larghezzaAvvioF) <= 1) return;
      chiudiF();
    });
    BOTTONI.forEach(function (b) { b.addEventListener('click', function () { sceltaF(+b.getAttribute('data-modo')); }); });
  }
})();
