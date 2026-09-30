(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var lenis = null;
  var lang = function () { return root.getAttribute('data-lang') === 'es' ? 'es' : 'en'; };
  var say = function (en, es) { return lang() === 'es' ? es : en; };

  /* ---------- Language ---------- */
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('data-en', desc.getAttribute('content'));
  document.querySelectorAll('img[data-alt-es]').forEach(function (img) { img.setAttribute('data-alt-en', img.getAttribute('alt') || ''); });

  function applyLang(l, save) {
    root.setAttribute('data-lang', l);
    root.lang = l;
    var t = root.getAttribute('data-title-' + l);
    if (t) document.title = t;
    if (desc) desc.setAttribute('content', desc.getAttribute('data-' + l) || desc.getAttribute('data-en'));
    document.querySelectorAll('[data-ph-' + l + ']').forEach(function (el) { el.setAttribute('placeholder', el.getAttribute('data-ph-' + l)); });
    document.querySelectorAll('img[data-alt-es]').forEach(function (img) { img.setAttribute('alt', img.getAttribute('data-alt-' + l)); });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-set-lang') === l ? 'true' : 'false'); });
    if (save) { try { localStorage.setItem('jg-lang', l); } catch (e) {} }
    document.dispatchEvent(new CustomEvent('jg:lang', { detail: l }));
  }
  applyLang(lang(), false);
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-set-lang'), true); });
  });

  /* ---------- Word splitting: blur-in titles and masked lines ---------- */
  function splitWords(el, masked) {
    var i = 0;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var span = document.createElement('span');
            span.className = 'w';
            span.style.setProperty('--i', i++);
            if (masked) {
              var inner = document.createElement('i');
              inner.textContent = part;
              span.appendChild(inner);
            } else {
              span.textContent = part;
            }
            frag.appendChild(span);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          if (child.hasAttribute('lang')) i = 0;
          walk(child);
        }
      });
    };
    walk(el);
  }
  document.querySelectorAll('.split').forEach(function (el) { splitWords(el, false); });
  if (!reduced) document.querySelectorAll('.lines').forEach(function (el) { splitWords(el, true); });

  /* ---------- Reveal on scroll, count-up ---------- */
  function countUp(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced || isNaN(end)) { el.textContent = end + suffix; return; }
    var start = null;
    var dur = 1400;
    var step = function (ts) {
      if (start === null) start = ts;
      var k = Math.min(1, (ts - start) / dur);
      var e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(end * e) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  var revealables = document.querySelectorAll('[data-reveal], .lines');
  if ('IntersectionObserver' in window && !reduced) {
    counters.forEach(function (el) { el.textContent = '0' + (el.getAttribute('data-suffix') || ''); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.hasAttribute('data-count')) countUp(el); else el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    revealables.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Intro loader (first visit of the session) ---------- */
  function finishIntro() {
    window.__jgIntroDone = true;
    document.dispatchEvent(new CustomEvent('jg:intro-done'));
  }
  if (root.classList.contains('is-loading')) {
    var countEl = document.querySelector('[data-loader-count]');
    var bar = document.querySelector('[data-loader-bar]');
    var t0 = null;
    var total = 2100;
    var tick = function (ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / total);
      var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      if (countEl) countEl.textContent = String(Math.round(e * 100));
      if (bar) bar.style.transform = 'scaleX(' + e.toFixed(4) + ')';
      if (k < 1) { requestAnimationFrame(tick); return; }
      setTimeout(function () {
        root.classList.add('is-leaving-loader');
        root.classList.remove('is-loading');
        if (lenis) lenis.start();
        try { sessionStorage.setItem('jg-intro', '1'); } catch (e) {}
        finishIntro();
        setTimeout(function () { root.classList.remove('is-leaving-loader'); }, 1100);
      }, 180);
    };
    requestAnimationFrame(tick);
  } else {
    finishIntro();
  }

  /* ---------- Smooth scroll (Lenis) and scroll-linked effects ---------- */
  var nav = document.querySelector('.nav');
  var progress = document.querySelector('.crumbs-bar__progress');
  var parallax = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var lastY = window.scrollY;
  var velocity = 0;
  var direction = 1;

  function onScroll() {
    var y = lenis ? lenis.scroll : window.scrollY;
    var vh = window.innerHeight;
    var dy = y - lastY;
    if (!lenis) velocity = dy;
    if (dy) direction = dy > 0 ? 1 : -1;
    lastY = y;
    if (nav) nav.classList.toggle('is-scrolled', y > 8);
    if (progress) {
      var max = document.documentElement.scrollHeight - vh;
      progress.style.setProperty('--p', max > 0 ? Math.min(1, Math.max(0, y / max)).toFixed(4) : 0);
    }
    if (!reduced) {
      parallax.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        p = Math.max(-1, Math.min(1, p));
        var stage = el.querySelector('.cover__stage');
        var cover = el.querySelector('.cover');
        if (stage) stage.style.setProperty('--py', (p * 5).toFixed(2) + '%');
        if (cover) cover.style.setProperty('--cs', (1 - 0.05 * Math.max(0, p)).toFixed(4));
      });
    }
  }

  function initLenis() {
    if (lenis || reduced || typeof window.Lenis !== 'function') return;
    try {
      lenis = new window.Lenis({
        autoRaf: true,
        lerp: 0.095,
        anchors: { offset: -120 },
        prevent: function (node) { return !!(node && node.closest && node.closest('.agent__panel, .lightbox, .wl-strip')); }
      });
    } catch (e) { lenis = null; return; }
    window.__jgLenis = lenis;
    lenis.on('scroll', function (l) { velocity = l.velocity || 0; onScroll(); });
    if (root.classList.contains('is-loading')) lenis.stop();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLenis); else initLenis();
  window.addEventListener('scroll', function () { if (!lenis) onScroll(); }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Marquee: drifts on its own, speeds up and turns with the scroll ---------- */
  var mq = document.querySelector('[data-marquee]');
  if (mq && !reduced) {
    mq.classList.add('is-driven');
    var x = 0;
    var visible = true;
    var last = null;
    var run = function (ts) {
      if (last === null) last = ts;
      var dt = Math.min(64, ts - last) / 1000;
      last = ts;
      var half = mq.scrollWidth / 2;
      var speed = 42 + Math.min(900, Math.abs(velocity) * 60);
      x -= speed * dt * direction;
      if (half > 0) { while (x <= -half) x += half; while (x > 0) x -= half; }
      mq.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      velocity *= 0.92;
      if (visible) requestAnimationFrame(run); else last = null;
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var was = visible;
        visible = entries[0].isIntersecting;
        if (visible && !was) requestAnimationFrame(run);
      }).observe(mq);
    }
    requestAnimationFrame(run);
  }

  /* ---------- Selected work: the row under the pointer (or keyboard focus) opens ---------- */
  var rows = document.querySelectorAll('.wl-item');
  if (rows.length) {
    var timer = null;
    var openRow = function (row) {
      if (row.classList.contains('is-open')) return;
      rows.forEach(function (r) { r.classList.toggle('is-open', r === row); });
    };
    rows.forEach(function (row) {
      var head = row.querySelector('.wl-head');
      head.addEventListener('mouseenter', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { openRow(row); }, 90);
      });
      head.addEventListener('mouseleave', function () { clearTimeout(timer); });
      head.addEventListener('focus', function () { openRow(row); });
    });
  }

  /* Each screen tilts toward the pointer and lifts */
  if (finePointer && !reduced) {
    document.querySelectorAll('.tile').forEach(function (tile) {
      tile.addEventListener('pointermove', function (e) {
        var r = tile.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        tile.style.setProperty('--rx', ((px - 0.5) * 14).toFixed(2) + 'deg');
        tile.style.setProperty('--ry', ((0.5 - py) * 10).toFixed(2) + 'deg');
        tile.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        tile.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
      tile.addEventListener('pointerleave', function () {
        tile.style.removeProperty('--rx');
        tile.style.removeProperty('--ry');
      });
    });
  }

  /* ---------- Cursor: a square that inverts what is under it and shows the year ---------- */
  if (finePointer && !reduced) {
    var cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__label"></span>';
    document.body.appendChild(cursor);
    var label = cursor.firstChild;
    root.classList.add('has-cursor');
    var cx = -100, cy = -100, tx = -100, ty = -100, running = false;
    var loop = function () {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      cursor.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) { requestAnimationFrame(loop); } else { running = false; }
    };
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      if (!cursor.classList.contains('is-visible')) { cx = tx; cy = ty; cursor.classList.add('is-visible'); }
      var t = e.target && e.target.closest ? e.target : null;
      var item = t && !t.closest('.wl-strip') && t.closest('[data-cursor]');
      if (item) {
        var text = item.getAttribute('data-cursor');
        if (label.textContent !== text) label.textContent = text;
        cursor.classList.add('is-big');
      } else {
        cursor.classList.remove('is-big');
      }
      cursor.classList.toggle('is-link', !item && !!(t && t.closest('a, button, [role="button"], .zoomable, summary')));
      cursor.classList.toggle('is-text', !!(t && t.closest('input, textarea')));
      cursor.classList.toggle('is-hidden', !!(t && t.closest('.banner, .agent__panel')));
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { cursor.classList.remove('is-visible'); });
    window.addEventListener('blur', function () { cursor.classList.remove('is-visible'); });
  }

  /* ---------- Theme: follows the system until the visitor picks one ---------- */
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('jg-theme', next); } catch (e) {}
      document.dispatchEvent(new CustomEvent('jg:theme', { detail: next }));
    });
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var html = btn.innerHTML;
        btn.textContent = say('Copied', 'Copiado');
        setTimeout(function () { btn.innerHTML = html; }, 1600);
      };
      var fallback = function () {
        var target = btn.parentElement.querySelector('[data-copy-text]');
        if (!target) return;
        var range = document.createRange();
        range.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
  });

  /* ---------- Local time in Mercedes, Buenos Aires ---------- */
  var clock = document.querySelector('[data-clock]');
  if (clock) {
    var tickClock = function () {
      try {
        clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
      } catch (e) {}
    };
    tickClock();
    setInterval(tickClock, 30000);
  }
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Lightbox for case study screens ---------- */
  var box = document.querySelector('.lightbox');
  if (box && typeof box.showModal === 'function') {
    var boxImg = box.querySelector('img');
    document.querySelectorAll('img.zoomable').forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      var open = function () {
        boxImg.src = img.currentSrc || img.src;
        boxImg.alt = img.alt;
        box.showModal();
        if (lenis) lenis.stop();
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('.lightbox__close')) box.close();
    });
    box.addEventListener('close', function () { if (lenis) lenis.start(); });
  }

  /* ---------- NDA gate: a soft lock, the password is stored as a SHA-256 hash ---------- */
  var gate = document.querySelector('[data-gate]');
  if (gate) {
    var content = document.getElementById(gate.getAttribute('data-gate'));
    var key = 'jg-nda-' + gate.getAttribute('data-gate');
    var unlock = function () {
      gate.hidden = true;
      if (content) content.hidden = false;
      if (content && 'IntersectionObserver' in window && !reduced) {
        content.querySelectorAll('[data-reveal], .lines').forEach(function (el) { io.observe(el); });
        content.querySelectorAll('[data-count]').forEach(function (el) { io.observe(el); });
      }
      if (lenis) lenis.resize();
    };
    try { if (sessionStorage.getItem(key) === '1') unlock(); } catch (e) {}
    var form = gate.querySelector('form');
    var input = gate.querySelector('input');
    var error = gate.querySelector('.gate__error');
    var errText = function (kind) { return error.getAttribute('data-err-' + kind + '-' + lang()); };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = (input.value || '').trim().toLowerCase();
      if (!value) { error.textContent = errText('empty'); return; }
      if (!window.crypto || !crypto.subtle) { error.textContent = say('This browser cannot check the password. Ask me for a PDF version.', 'Este navegador no puede validar la contraseña. Pedime una versión en PDF.'); return; }
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)).then(function (buf) {
        var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        if (hex === gate.getAttribute('data-hash')) {
          try { sessionStorage.setItem(key, '1'); } catch (err) {}
          unlock();
          if (content) {
            if (lenis) lenis.scrollTo(content, { offset: -140 });
            else content.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          error.textContent = errText('wrong');
          input.select();
        }
      });
    });
  }

  /* ---------- CV download: through the viewer's download prompt when the page runs as an Artifact ---------- */
  if (window.claude && typeof window.claude.use === 'function') {
    window.claude.use('downloads').then(function (downloads) {
      if (!downloads) return;
      document.querySelectorAll('[data-cv]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          fetch(a.href).then(function (r) { if (!r.ok) throw new Error('fetch'); return r.blob(); })
            .then(function (blob) { return downloads.save({ filename: 'Julian_Gerardi_CV.pdf', data: blob }); })
            .catch(function (err) {
              if (err && (err.code === 'declined' || err.code === 'rate_limited')) return;
              window.open(a.href, '_blank', 'noopener');
            });
        });
      });
    }, function () {});
  }

  /* ---------- Page transitions: a curtain covers the page before leaving ---------- */
  if (!reduced) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target || a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
      if (url.origin !== location.origin || !/\.html$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      root.classList.add('is-leaving');
      setTimeout(function () { location.href = url.href; }, 520);
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('is-leaving'); });
  }

  /* ---------- Buttons that open the AI agent ---------- */
  document.querySelectorAll('[data-open-agent]').forEach(function (b) {
    b.addEventListener('click', function () { document.dispatchEvent(new CustomEvent('jg:agent-open')); });
  });
})();
