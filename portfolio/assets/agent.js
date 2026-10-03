/* Assistant: answers questions about Julián from his CV and this website.
   Common questions have written answers (INTENTS); anything else is looked up in
   the text of the pages themselves, and the answer links to the section it came from.
   Nothing is sent to an external AI. */
(function () {
  var el = document.querySelector('[data-agent]');
  if (!el) return;
  var root = document.documentElement;
  var script = document.currentScript;
  var base = script ? new URL('../', script.src).href : './';
  var launch = el.querySelector('.agent__launch');
  var panel = el.querySelector('.agent__panel');
  var closeBtn = el.querySelector('.agent__close');
  var log = el.querySelector('[data-agent-log]');
  var chipsEl = el.querySelector('[data-agent-chips]');
  var form = el.querySelector('[data-agent-form]');
  var input = el.querySelector('#agent-input');
  var sendBtn = el.querySelector('.agent__send');
  log.setAttribute('data-lenis-prevent', '');

  var lang = function () { return root.getAttribute('data-lang') === 'es' ? 'es' : 'en'; };
  var say = function (en, es) { return lang() === 'es' ? es : en; };

  var EMAIL = 'juliangerardi266@gmail.com';
  var LINKS = {
    batech: { en: 'Batech case study', es: 'Caso Batech', href: base + 'work/batech.html' },
    confidentally: { en: 'Confidentally case study', es: 'Caso Confidentally', href: base + 'work/confidentally.html' },
    'confidentally-ui': { en: 'Confidentally UI case study', es: 'Caso Confidentally UI', href: base + 'work/confidentally-ui.html' },
    grill: { en: 'GRILL case study', es: 'Caso GRILL', href: base + 'work/grill.html' },
    'mercado-play': { en: 'Mercado Play case study', es: 'Caso Mercado Play', href: base + 'work/mercado-play.html' },
    work: { en: 'Selected work', es: 'Trabajos', href: base + 'index.html#work' },
    process: { en: 'Process', es: 'Proceso', href: base + 'index.html#process' },
    experience: { en: 'Experience', es: 'Experiencia', href: base + 'index.html#experience' },
    cv: { en: 'Download CV', es: 'Descargar CV', href: base + 'assets/Julian_Gerardi_CV.pdf', cv: true },
    contact: { en: 'Email Julián', es: 'Escribirle a Julián', href: 'mailto:' + EMAIL },
    linkedin: { en: 'LinkedIn', es: 'LinkedIn', href: 'https://www.linkedin.com/in/julian-gerardi', external: true }
  };

  /* ---------- Written answers for the common questions ---------- */
  var INTENTS = [
    { id: 'batech', re: /(batech|video|c[aá]mara|camera|retail|geocerca|geofence|visi[oó]n artificial|computer vision)/i,
      en: 'At Batech (2022–2026) Julián led the design of an AI video analytics platform for retail: cameras become events, alerts and reports, geofences are drawn on live video, a six-step flow sets up an analysis, and every store has an AI assistant. He also built the Figma design system and led the design team to 10% faster delivery.',
      es: 'En Batech (2022–2026) Julián lideró el diseño de una plataforma de análisis de video con IA para retail: las cámaras se convierten en eventos, alertas y reportes, las geocercas se dibujan sobre el video, un flujo de seis pasos configura cada análisis y cada tienda tiene un asistente de IA. También armó el design system en Figma y llevó al equipo a entregas un 10% más rápidas.', links: ['batech'] },
    { id: 'ds', re: /(design system|storybook|builder|componente|component|token|confidentally ui|sistema de dise|handoff|hand-off)/i,
      en: 'Confidentally UI is the design system Julián took from Figma to code: the tokens and components designed in Figma went through Claude Code into React and Storybook, so developers take each piece straight from there. It documents 139 pieces with 481 live examples, flags when the code drifts, and has a Builder: you describe a screen in words and the AI assembles it with the system’s real components.',
      es: 'Confidentally UI es el design system que Julián llevó de Figma al código: los tokens y componentes diseñados en Figma pasaron con Claude Code a React y a Storybook, y los devs toman cada pieza directamente de ahí. Documenta 139 piezas con 481 ejemplos en vivo, avisa cuando el código se desvía y tiene un Builder: describís una pantalla con palabras y la IA la arma con los componentes reales del sistema.', links: ['confidentally-ui'] },
    { id: 'dental', re: /(dental|confidentally|cl[ií]nica|clinic|odont|\bnda\b|health|salud|m[eé]dic|anomal)/i,
      en: 'Confidentally is a dental practice platform Julián redesigned in 2026, under NDA. He audited the product (44 anomalies logged), redesigned it from the front desk to the dental chair, and rebuilt it as a working prototype on mock data: 32 screens you can click in the browser. The case study asks for a password; he shares it on request.',
      es: 'Confidentally es una plataforma para clínicas dentales que Julián rediseñó en 2026, bajo NDA. Auditó el producto (44 anomalías registradas), lo rediseñó de la recepción al sillón y lo reconstruyó como prototipo funcional con datos de prueba: 32 pantallas que se pueden recorrer en el navegador. El caso pide contraseña; la comparte si se la pedís.', links: ['confidentally', 'contact'] },
    { id: 'grill', re: /(grill|lunch|almuerzo|comida|food|kitchen|cocina|vianda|gastronom)/i,
      en: 'GRILL Empresas is corporate lunch ordering for a kitchen in Mercedes: employees choose the day’s meal on their phone before the 10:30 cutoff, and the kitchen runs the morning from a panel with the ticket, tray labels, the delivery run and each company’s account. Two connected web apps, light and dark.',
      es: 'GRILL Empresas son pedidos de almuerzo para empresas de una cocina en Mercedes: los empleados eligen la vianda desde el celular antes del cierre de las 10:30 y la cocina maneja la mañana desde un panel con la comanda, las etiquetas, el reparto y la cuenta de cada empresa. Dos web apps conectadas, en claro y oscuro.', links: ['grill'] },
    { id: 'mp', re: /(mercado|meli|\bplay\b|streaming|challenge)/i,
      en: 'Mercado Play is a UX/UI challenge for Mercado Libre’s free streaming service. Julián delivered it as a Figma file, now on version 2.0, with its own cover system built from a selected Alert Dialog, the product name in Mercado Libre yellow and multiplayer cursors.',
      es: 'Mercado Play es un challenge de UX/UI para el streaming gratuito de Mercado Libre. Julián lo entregó como un archivo de Figma, ya en su versión 2.0, con un sistema de portada armado con un Alert Dialog seleccionado, el nombre en el amarillo de Mercado Libre y cursores multiplayer.', links: ['mercado-play'] },
    { id: 'team', re: /(\bdevs?\b|developer|desarrollador|programador|engineer|ingenier|stakeholder|\bceo\b|founder|fundador|direct(or|ivo)|management|gerencia|equipo|team|colabor|cross.?functional|lider|lead(er|s)?\b|present)/i,
      en: 'Julián works side by side with developers: he checks technical feasibility early, and hands off components that already exist in code, in Storybook. He presents the work to stakeholders and CEOs and turns their feedback into decisions, and he has led design and creative teams at Batech, Icarus and Vieja Cubana, where he was co-founder and CEO himself.',
      es: 'Julián trabaja codo a codo con los devs: revisa la factibilidad técnica desde el principio y entrega componentes que ya existen en código, en Storybook. Presenta el trabajo a stakeholders y CEOs y convierte su feedback en decisiones, y lideró equipos de diseño y creativos en Batech, Icarus y Vieja Cubana, donde él mismo fue cofundador y CEO.', links: ['experience', 'confidentally-ui'] },
    { id: 'research', re: /(research|investigaci|entrevista|interview|usabilidad|usability|user test|testeo|\btests?\b|a\/b|analytics|m[eé]tricas|kpi|validat|valid[aá])/i,
      en: 'Every project starts with people: Julián plans and runs user interviews and usability tests, and reads analytics and A/B tests to see what actually changed. At Batech that cut abandonment in key web and mobile flows; on the AI product he leads now, usability testing drives the pre-launch validation with the dev team.',
      es: 'Cada proyecto arranca con personas: Julián planifica y hace entrevistas con usuarios y tests de usabilidad, y lee analytics y A/B tests para ver qué cambió de verdad. En Batech eso bajó el abandono en flujos clave de web y mobile; en el producto de IA que lidera hoy, los tests de usabilidad guían la validación previa al lanzamiento con el equipo de desarrollo.', links: ['process'] },
    { id: 'ai', re: /(\bai\b|\bia\b|claude|cursor|gemini|midjourney|artificial|prompt|llm|gpt|vibe)/i,
      en: 'AI is part of how Julián works. He uses Claude and Claude Code to turn designs into working web-app prototypes and to take a Figma design system into code, with Storybook for the developers; Gemini, Midjourney and Freepik Spaces help him explore. Confidentally, its design system and GRILL were all built this way.',
      es: 'La IA es parte de cómo trabaja Julián. Usa Claude y Claude Code para convertir diseños en prototipos web funcionales y para llevar un design system de Figma al código, con Storybook para los devs; Gemini, Midjourney y Freepik Spaces lo ayudan a explorar. Confidentally, su design system y GRILL se hicieron así.', links: ['confidentally-ui', 'grill'] },
    { id: 'process', re: /(process|proceso|method|m[eé]todo|how does he work|c[oó]mo trabaja|research|metodolog|workflow|flujo de trabajo)/i,
      en: 'His process has five stages: research (user interviews, usability tests, analytics and an audit), structure (information architecture, flows and journeys), design (high-fidelity UI on a design system in Figma), prototype (working prototypes built with Claude Code) and validate & ship (usability and A/B tests, KPIs, and a handoff to developers through Storybook).',
      es: 'Su proceso tiene cinco etapas: research (entrevistas con usuarios, tests de usabilidad, analytics y auditoría), estructura (arquitectura de información, flujos y journeys), diseño (UI de alta fidelidad sobre un design system en Figma), prototipo (prototipos funcionales hechos con Claude Code) y validar y lanzar (tests de usabilidad y A/B, KPIs y handoff a desarrollo a través de Storybook).', links: ['process'] },
    { id: 'tools', re: /(tools|herramient|figma|software|stack|programs|programas)/i,
      en: 'His toolkit: Figma, Claude, Claude Code, Storybook, Gemini, Midjourney, Freepik Spaces, Photoshop, Illustrator and InDesign.',
      es: 'Sus herramientas: Figma, Claude, Claude Code, Storybook, Gemini, Midjourney, Freepik Spaces, Photoshop, Illustrator e InDesign.', links: ['process'] },
    { id: 'hire', re: /(availab|disponib|hire|contrat|freelance|remote|remoto|\bjobs?\b|\brol(es)?\b|\broles?\b|open to|busca|looking|salary|sueldo|\brates?\b|tarifa)/i,
      en: 'Yes: Julián is open to senior and lead product design roles, remote, and to freelance projects. The fastest way to reach him is email.',
      es: 'Sí: Julián está disponible para roles senior y lead de diseño de producto, en remoto, y para proyectos freelance. La forma más rápida de contactarlo es por mail.', links: ['contact', 'cv'] },
    { id: 'contact', re: /(contact|email|e-mail|mail|linkedin|behance|reach|escrib|hablar|talk to)/i,
      en: 'You can write to him at ' + EMAIL + ' or find him on LinkedIn.',
      es: 'Le podés escribir a ' + EMAIL + ' o encontrarlo en LinkedIn.', links: ['contact', 'linkedin'] },
    { id: 'cv', re: /(\bcv\b|resume|r[eé]sum[eé]|curr[ií]cul|download|descarg)/i,
      en: 'Here is his CV as a PDF.', es: 'Acá tenés su CV en PDF.', links: ['cv'] },
    { id: 'xp', re: /(experience|experiencia|worked|trabaj[oó]\b|career|carrera|years|\ba[ñn]os\b|compan|empresas|icarus|bahco|datachain)/i,
      en: 'Highlights: Lead UX/UI for a confidential AI product in Miami (2025–now), Senior UX/UI at Icarus Digital Marketing in Ireland (2023–2025), Lead UX/UI at Batech in Mexico (2022–2026), Senior Digital Designer at Bahco Argentina for 5 Latin American markets (2018–2025), plus freelance work for Datachain Summit, Blue CP Construction and others.',
      es: 'Lo principal: Lead UX/UI de un producto de IA confidencial en Miami (2025–hoy), Senior UX/UI en Icarus Digital Marketing en Irlanda (2023–2025), Lead UX/UI en Batech en México (2022–2026), Senior Digital Designer en Bahco Argentina para 5 mercados de Latinoamérica (2018–2025) y trabajos freelance para Datachain Summit, Blue CP Construction y otros.', links: ['experience', 'cv'] },
    { id: 'edu', re: /(education|estudi|universi|degree|t[ií]tulo|formaci|coderhouse|palermo)/i,
      en: 'He holds a Bachelor’s in Advertising Art Direction from Universidad de Palermo, a degree as Advertising Creative Technician from the same university, and completed the UX/UI Design Program at Coderhouse.',
      es: 'Es Licenciado en Dirección de Arte Publicitario por la Universidad de Palermo, Técnico en Creatividad Publicitaria por la misma universidad, e hizo la carrera de Diseño UX/UI en Coderhouse.', links: ['cv'] },
    { id: 'langs', re: /(languages|idiomas|english|ingl[eé]s|italian|italiano|speak|habla)/i,
      en: 'Spanish is his native language, he works in English at a full professional level and also speaks Italian professionally.',
      es: 'Su idioma nativo es el español, trabaja en inglés a nivel profesional completo y también habla italiano a nivel profesional.', links: [] },
    { id: 'awards', re: /(award|premio|talk|charla|speaker|orador|recogn)/i,
      en: 'He was a speaker at the XII Latin American Design Meeting, won the Creativity Award from Imágenes Creativas and an award from Universidad de Palermo.',
      es: 'Fue orador en el XII Encuentro Latinoamericano de Diseño, ganó el Premio a la Creatividad de Imágenes Creativas y un premio de la Universidad de Palermo.', links: [] },
    { id: 'where', re: /(where|d[oó]nde|location|ubicaci|based|vive|argentina|timezone|zona horaria|time zone)/i,
      en: 'He lives in Mercedes, Buenos Aires, Argentina (GMT-3) and works remotely with teams in the Americas and Europe.',
      es: 'Vive en Mercedes, Buenos Aires, Argentina (GMT-3) y trabaja en remoto con equipos de América y Europa.', links: ['contact'] },
    { id: 'projects', re: /(project|proyecto|portfolio|work|trabajos|casos|case)/i,
      en: 'There are five case studies: Batech AI Platform, Confidentally (under NDA), Confidentally UI, GRILL Empresas and Mercado Play. Which one should I tell you about?',
      es: 'Hay cinco casos: Batech AI Platform, Confidentally (bajo NDA), Confidentally UI, GRILL Empresas y Mercado Play. ¿De cuál te cuento?', links: ['work'] },
    { id: 'about', re: /(who|quién|quien|about him|sobre él|sobre el|perfil|profile|summary|resum|what does he do|qué hace|que hace|present)/i,
      en: 'Julián Gerardi is a Senior Product Designer and Lead UX/UI designer from Mercedes, Buenos Aires. For 8+ years he has designed SaaS products, brands and visual systems for teams in the US, Mexico, Ireland and Argentina: user research, flows, design systems and high-fidelity UI, working with developers, stakeholders and CEOs, and using Claude Code to turn ideas into working prototypes.',
      es: 'Julián Gerardi es Senior Product Designer y Lead UX/UI de Mercedes, Buenos Aires. Hace más de 8 años diseña productos SaaS, marcas y sistemas visuales para equipos de EE. UU., México, Irlanda y Argentina: research con usuarios, flujos, design systems y UI de alta fidelidad, trabajando con devs, stakeholders y CEOs, y con Claude Code para convertir ideas en prototipos funcionales.', links: ['work', 'cv'] },
    { id: 'greet', re: /\b(hola|hi|hello|hey|buenas|buen día|good (morning|afternoon))\b/i,
      en: 'Hi! I can tell you about Julián’s projects, how he works, his experience or his availability. What would you like to know?',
      es: '¡Hola! Te puedo contar sobre los proyectos de Julián, cómo trabaja, su experiencia o su disponibilidad. ¿Qué te gustaría saber?', links: ['work'] }
  ];
  var FALLBACK = {
    en: 'I’m not sure about that one. I can talk about Julián’s projects, process, experience, tools or availability, or you can ask him directly.',
    es: 'De eso no estoy seguro. Puedo contarte sobre los proyectos de Julián, su proceso, su experiencia, sus herramientas o su disponibilidad, o le podés preguntar directamente.',
    links: ['contact']
  };

  /* ---------- Rendering ---------- */
  function svg(id) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('aria-hidden', 'true');
    var u = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    u.setAttribute('href', '#' + id);
    s.appendChild(u);
    return s;
  }
  function scrollLog() { log.scrollTop = log.scrollHeight; }
  function bubble(who) {
    var b = document.createElement('div');
    b.className = 'msg msg--' + who;
    log.appendChild(b);
    scrollLog();
    return b;
  }
  function typing(b) {
    b.textContent = '';
    var t = document.createElement('span');
    t.className = 'typing';
    t.setAttribute('aria-label', say('Thinking', 'Pensando'));
    t.innerHTML = '<i></i><i></i><i></i>';
    b.appendChild(t);
  }
  function addLinks(b, keys) {
    var seen = {};
    var wrap = document.createElement('div');
    wrap.className = 'msg__links';
    (keys || []).forEach(function (k) {
      var l = typeof k === 'string' ? LINKS[k] : k;
      var id = typeof k === 'string' ? k : k.href;
      if (!l || seen[id]) return;
      seen[id] = true;
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l[lang()];
      if (l.external) { a.target = '_blank'; a.rel = 'noopener'; }
      if (l.cv) {
        a.setAttribute('download', 'Julian_Gerardi_CV.pdf');
        a.addEventListener('click', function (e) {
          var real = document.querySelector('[data-cv]');
          if (real) { e.preventDefault(); real.click(); }
        });
      }
      a.appendChild(svg(l.external ? 'i-arrow' : (l.cv ? 'i-down' : 'i-right')));
      wrap.appendChild(a);
    });
    if (wrap.childNodes.length) b.appendChild(wrap);
    scrollLog();
  }

  /* ---------- The website as the knowledge base ---------- */
  var PAGES = [
    { file: 'index.html', en: 'Home', es: 'Inicio' },
    { file: 'work/batech.html', en: 'Batech AI Platform', es: 'Batech AI Platform' },
    { file: 'work/confidentally.html', en: 'Confidentally', es: 'Confidentally' },
    { file: 'work/confidentally-ui.html', en: 'Confidentally UI', es: 'Confidentally UI' },
    { file: 'work/grill.html', en: 'GRILL Empresas', es: 'GRILL Empresas' },
    { file: 'work/mercado-play.html', en: 'Mercado Play', es: 'Mercado Play' }
  ];
  var HOME = [['#process', 'Process', 'Proceso'], ['#experience', 'Experience', 'Experiencia'], ['#about', 'About', 'Sobre mí'], ['#contact', 'Contact', 'Contacto']];
  var UNIT = 'p, li, figcaption, .grid-cards > div, .numbers > div, .xp__item, .fact';
  var units = null;
  var loading = null;

  function textOf(node, l) {
    if (!node) return '';
    var c = node.cloneNode(true);
    c.querySelectorAll('[lang]').forEach(function (n) { if (n.getAttribute('lang') !== l) n.remove(); });
    c.querySelectorAll('.demo, .mock__bar, .steps__n, .step__n, script, style, svg, img, button, .btns').forEach(function (n) { n.remove(); });
    c.querySelectorAll('p, li, h1, h2, h3, dd, dt, b, span, div').forEach(function (n) { n.insertAdjacentText('beforeend', ' '); });
    return c.textContent.replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();
  }

  function collect(scope, list, base) {
    scope.querySelectorAll(UNIT).forEach(function (n) {
      if (n.closest('.mock, .phone, .tile, .wl-strip')) return;
      if (n.parentElement && n.parentElement.closest(UNIT)) return;
      var dec = n.closest('.decision');
      var step = n.closest('.steps li, .step');
      list.push({ node: n, href: base.href, page: base.page, part: base.part, heading: (dec && dec.querySelector('h3')) || (step && step.querySelector('h3')) || base.h2, cache: {} });
    });
  }

  function parse(doc, pg) {
    var list = [];
    var href = base + pg.file;
    var nda = doc.getElementById('nda-content');
    if (nda) nda.remove();
    if (pg.file === 'index.html') {
      HOME.forEach(function (h) {
        var sec = doc.querySelector(h[0]);
        if (sec) collect(sec, list, { href: href + h[0], page: pg, part: { en: h[1], es: h[2] }, h2: sec.querySelector('h2') });
      });
      var stats = doc.querySelector('.statement');
      if (stats) collect(stats, list, { href: href, page: pg, part: { en: 'Highlights', es: 'Datos' }, h2: null });
    } else {
      var headEl = doc.querySelector('.case-head');
      if (headEl) {
        list.push({ node: headEl.querySelector('.case-lede'), href: href, page: pg, part: { en: 'Overview', es: 'Resumen' }, heading: headEl.querySelector('h1'), cache: {}, lead: true });
      }
      doc.querySelectorAll('section.chapter').forEach(function (sec) {
        collect(sec.querySelector('.chapter__body') || sec, list, { href: href + (sec.id ? '#' + sec.id : ''), page: pg, part: { node: sec.querySelector('.chapter__label') }, h2: sec.querySelector('h2') });
      });
    }
    return list.filter(function (u) { return u.node; });
  }

  function loadSite() {
    if (loading) return loading;
    loading = Promise.all(PAGES.map(function (pg) {
      return fetch(base + pg.file, { credentials: 'same-origin' })
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) { return html ? parse(new DOMParser().parseFromString(html, 'text/html'), pg) : []; })
        .catch(function () { return []; });
    })).then(function (lists) {
      units = [].concat.apply([], lists);
      return units;
    });
    return loading;
  }

  var STOP = ('the and are for from how what which who whom with his her him has have had was were you your about tell does did can could would should into that this there their them they then than also more most some any all one two its use used using una uno unos unas los las del con por para que como cual quien sus son fue era ser esta este esto esa ese hay tiene tienen hace hizo hacer contame decime sobre algo mas muy donde cuando paso pasa pasar puede pueden usa usan usar cuanto cuantos cuantas cuales sirve funciona funcionan mejor julian gerardi').split(' ');
  function norm(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9%\s]/g, ' '); }
  function stem(w) { return w.length > 4 ? w.replace(/(es|s)$/, '') : w; }
  function words(t) { return norm(t).split(/\s+/).filter(function (w) { return w.length > 2 && STOP.indexOf(w) === -1; }).map(stem); }
  var SYN = { hardcod: 'token', hexadecimal: 'token', appointment: 'turno', turno: 'appointment', geofence: 'geocerca', geocerca: 'geofence', label: 'etiqueta', etiqueta: 'label' };
  function expand(ws) {
    var out = ws.slice();
    ws.forEach(function (w) { for (var k in SYN) { if (w.indexOf(k) === 0 && out.indexOf(SYN[k]) === -1) out.push(SYN[k]); } });
    return out;
  }

  var idfCache = {};
  function view(u, l) {
    if (u.cache[l]) return u.cache[l];
    var body = textOf(u.node, l);
    var heading = textOf(u.heading, l);
    var part = u.part.node ? textOf(u.part.node, l) : u.part[l];
    var bw = {};
    words(body).forEach(function (w) { bw[w] = 1; });
    var hw = {};
    words(heading + ' ' + part + ' ' + u.page[l]).forEach(function (w) { hw[w] = 1; });
    return (u.cache[l] = { body: body, heading: heading, part: part, bw: bw, hw: hw });
  }
  function idf(l) {
    if (idfCache[l]) return idfCache[l];
    var df = {};
    units.forEach(function (u) {
      var v = view(u, l);
      var seen = {};
      Object.keys(v.bw).concat(Object.keys(v.hw)).forEach(function (w) { if (!seen[w]) { seen[w] = 1; df[w] = (df[w] || 0) + 1; } });
    });
    var n = units.length;
    return (idfCache[l] = function (w) { return Math.log(1 + n / (df[w] || 0.5)); });
  }
  function has(map, w) {
    if (map[w]) return 1;
    if (w.length < 5) return 0;
    for (var k in map) { if (k.length > 4 && (k.indexOf(w) === 0 || w.indexOf(k) === 0)) return 0.7; }
    return 0;
  }

  function search(q) {
    if (!units || !units.length) return null;
    var qw = expand(words(q));
    if (!qw.length) return null;
    var l = lang();
    var weight = idf(l);
    var best = null, bestScore = 0;
    units.forEach(function (u) {
      var v = view(u, l);
      if (v.body.length < 20) return;
      var score = 0;
      qw.forEach(function (w) { score += weight(w) * (has(v.bw, w) + 0.6 * has(v.hw, w)); });
      if (u.lead) score *= 1.15;
      if (score > bestScore) { bestScore = score; best = u; }
    });
    if (!best || bestScore < 2.6) return null;
    var v = view(best, l);
    var text = v.body;
    if (v.heading && text.indexOf(v.heading) === -1 && !best.node.matches('.xp__item, .grid-cards > div, .numbers > div, .fact')) text = v.heading + ' ' + text;
    if (text.length > 420) text = text.slice(0, 417).replace(/\s+\S*$/, '') + '…';
    return { text: text, link: { en: best.page.en + ' · ' + (v.part || 'More'), es: best.page.es + ' · ' + (v.part || 'Más'), href: best.href } };
  }

  /* ---------- Conversation ---------- */
  var busy = false;
  function done() {
    busy = false;
    sendBtn.disabled = false;
    scrollLog();
  }
  var FIXED = ['about', 'hire', 'contact', 'cv', 'langs', 'edu', 'awards', 'where', 'tools', 'ai', 'team', 'research', 'process', 'xp', 'greet'];
  function answer(q, b) {
    typing(b);
    var started = Date.now();
    loadSite().then(function () {
      var intent = null;
      for (var i = 0; i < INTENTS.length; i++) { if (INTENTS[i].re.test(q)) { intent = INTENTS[i]; break; } }
      var found = intent && FIXED.indexOf(intent.id) !== -1 ? null : search(q);
      setTimeout(function () {
        if (found) {
          b.textContent = found.text;
          addLinks(b, [found.link].concat(intent ? intent.links.slice(0, 1) : []));
        } else if (intent) {
          b.textContent = intent[lang()];
          addLinks(b, intent.links);
        } else {
          b.textContent = FALLBACK[lang()];
          addLinks(b, FALLBACK.links);
        }
        done();
      }, Math.max(0, 450 - (Date.now() - started)));
    });
  }
  function ask(q) {
    q = (q || '').trim();
    if (!q || busy) return;
    busy = true;
    sendBtn.disabled = true;
    var me = bubble('me');
    me.textContent = q;
    answer(q, bubble('bot'));
  }

  /* ---------- Chips and welcome ---------- */
  var CHIPS = {
    en: ['Who is Julián?', 'How does he work with devs?', 'How does he use AI?', 'Tell me about Batech', 'Is he available?', 'Download CV'],
    es: ['¿Quién es Julián?', '¿Cómo trabaja con los devs?', '¿Cómo usa la IA?', 'Contame de Batech', '¿Está disponible?', 'Descargar CV']
  };
  function renderChips() {
    chipsEl.textContent = '';
    CHIPS[lang()].forEach(function (c) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = c;
      btn.addEventListener('click', function () { ask(c); });
      chipsEl.appendChild(btn);
    });
  }
  var welcome = null;
  function renderWelcome() {
    if (!welcome) welcome = bubble('bot');
    welcome.textContent = say('Hi! I’m Julián’s assistant. Ask me about his projects, how he works with developers and stakeholders, his tools or his availability.',
      '¡Hola! Soy el asistente de Julián. Preguntame por sus proyectos, cómo trabaja con devs y stakeholders, sus herramientas o su disponibilidad.');
  }

  /* ---------- Open / close ---------- */
  function open() {
    if (!panel.hidden) return;
    panel.hidden = false;
    el.classList.add('is-open');
    launch.setAttribute('aria-expanded', 'true');
    if (!welcome) { renderWelcome(); renderChips(); }
    loadSite();
    setTimeout(function () { input.focus({ preventScroll: true }); }, 60);
  }
  function close() {
    if (panel.hidden) return;
    panel.hidden = true;
    el.classList.remove('is-open');
    launch.setAttribute('aria-expanded', 'false');
    launch.focus({ preventScroll: true });
  }
  launch.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close(); });
  document.addEventListener('jg:agent-open', open);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value;
    input.value = '';
    ask(q);
  });
  document.addEventListener('jg:lang', function () {
    if (welcome && log.childNodes.length === 1) renderWelcome();
    if (welcome) renderChips();
  });
})();
