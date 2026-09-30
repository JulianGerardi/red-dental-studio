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
    /* punctuation right after a link stays with its last word, so it never wraps alone */
    var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var texts = [];
    while (tw.nextNode()) texts.push(tw.currentNode);
    texts.forEach(function (t) {
      var m = /^[,.;:!?)]+/.exec(t.data);
      var prev = t.previousSibling;
      if (!m || !prev || prev.nodeType !== 1) return;
      var last = prev.lastChild;
      while (last && last.nodeType === 1) last = last.lastChild;
      if (!last || last.nodeType !== 3) return;
      last.data += m[0];
      t.data = t.data.slice(m[0].length);
    });
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
    var list = document.querySelector('.wl-list');
    if (list) {
      list.addEventListener('mouseleave', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { rows.forEach(function (r) { r.classList.remove('is-open'); }); }, 120);
      });
      list.addEventListener('mouseenter', function () { clearTimeout(timer); });
      list.addEventListener('focusout', function (e) {
        if (!list.contains(e.relatedTarget)) rows.forEach(function (r) { r.classList.remove('is-open'); });
      });
    }
  }

  /* Each screen tilts toward the pointer and lifts */
  if (finePointer && !reduced) {
    document.querySelectorAll('.tile').forEach(function (tile) {
      tile.addEventListener('pointermove', function (e) {
        var r = tile.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        tile.style.setProperty('--rx', ((px - 0.5) * 6).toFixed(2) + 'deg');
        tile.style.setProperty('--ry', ((0.5 - py) * 4).toFixed(2) + 'deg');
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
      cursor.classList.toggle('is-hidden', !!(t && t.closest('.agent__panel')));
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
  function setTheme(mode) {
    if (mode === 'system') {
      root.removeAttribute('data-theme');
      try { localStorage.removeItem('jg-theme'); } catch (e) {}
    } else {
      root.setAttribute('data-theme', mode);
      try { localStorage.setItem('jg-theme', mode); } catch (e) {}
    }
    syncThemeSwitch();
    document.dispatchEvent(new CustomEvent('jg:theme', { detail: currentTheme() }));
  }
  function syncThemeSwitch() {
    var mode = root.getAttribute('data-theme') || 'system';
    document.querySelectorAll('[data-set-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set-theme') === mode ? 'true' : 'false');
    });
  }
  syncThemeSwitch();
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () { setTheme(currentTheme() === 'dark' ? 'light' : 'dark'); });
  });
  document.querySelectorAll('[data-set-theme]').forEach(function (btn) {
    btn.addEventListener('click', function () { setTheme(btn.getAttribute('data-set-theme')); });
  });

  /* ---------- Micro-animations: each screen plays its demo while it is on screen ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    var screens = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { entry.target.classList.toggle('is-playing', entry.isIntersecting); });
    }, { threshold: 0.35 });
    document.querySelectorAll('.scr').forEach(function (el) { if (el.querySelector('.demo')) screens.observe(el); });
  }

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

  /* ---------- Zoomable flow: wheel to zoom, drag to move, sharp tiles when zoomed in ---------- */
  var lastPageScroll = 0;
  window.addEventListener('scroll', function () { lastPageScroll = Date.now(); }, { passive: true });
  document.querySelectorAll('[data-zoomer]').forEach(function (z) {
    var stage = z.querySelector('.zoomer__stage');
    var pct = z.querySelector('[data-zoom-pct]');
    var SRC_W = +z.getAttribute('data-w'), SRC_H = +z.getAttribute('data-h');
    var T = +z.getAttribute('data-tile'), COLS = +z.getAttribute('data-cols'), ROWS = +z.getAttribute('data-rows');
    var BASE = z.getAttribute('data-base');
    var W = SRC_W / 2, H = SRC_H / 2;              /* stage size in CSS px: 2 source px per CSS px */
    var dpr = Math.min(3, window.devicePixelRatio || 1);
    var MAX = Math.max(1, 2 / dpr);                /* never past 1 source px per device px */
    stage.style.width = W + 'px';
    stage.style.height = H + 'px';
    var s = 0.1, tx = 0, ty = 0;
    var tiles = {};
    var order = [];
    var fit = function () { return Math.min(z.clientWidth / W, z.clientHeight / H); };
    var used = function () { z.classList.add('is-used'); };

    function updateTiles() {
      var need = s * dpr * 2 > 1.15;              /* the 5000px overview is enough until here */
      var x0 = -tx / s, y0 = -ty / s, x1 = (z.clientWidth - tx) / s, y1 = (z.clientHeight - ty) / s;
      var th = T / 2;
      for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) {
        var key = c + '-' + r;
        var left = c * th, top = r * th;
        var w = Math.min(th, W - left), h = Math.min(th, H - top);
        var visible = need && left < x1 + th / 2 && left + w > x0 - th / 2 && top < y1 + th / 2 && top + h > y0 - th / 2;
        if (visible && !tiles[key]) {
          var im = new Image();
          im.className = 'zoomer__tile';
          im.decoding = 'async';
          im.alt = '';
          im.style.cssText = 'left:' + left + 'px;top:' + top + 'px;width:' + w + 'px;height:' + h + 'px';
          im.onload = function () { this.classList.add('is-ready'); };
          im.src = BASE + 't-' + key + '.webp';
          stage.appendChild(im);
          tiles[key] = im;
          order.push(key);
        }
        if (visible) { var at = order.indexOf(key); if (at !== -1) { order.splice(at, 1); order.push(key); } }
      }
      while (order.length > 14) { var old = order.shift(); if (tiles[old]) { tiles[old].remove(); delete tiles[old]; } }
    }
    function apply(animate) {
      var cw = z.clientWidth, ch = z.clientHeight, w = W * s, h = H * s;
      tx = w <= cw ? (cw - w) / 2 : Math.min(0, Math.max(cw - w, tx));
      ty = h <= ch ? (ch - h) / 2 : Math.min(0, Math.max(ch - h, ty));
      z.classList.toggle('is-animating', !!animate);
      z.classList.toggle('is-zoomed', s > fit() * 1.02);
      stage.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + s.toFixed(5) + ')';
      pct.textContent = Math.round(s / MAX * 100) + '%';
      updateTiles();
    }
    function zoomAt(ns, cx, cy, animate) {
      ns = Math.max(fit(), Math.min(MAX, ns));
      var k = ns / s;
      tx = cx - (cx - tx) * k;
      ty = cy - (cy - ty) * k;
      s = ns;
      apply(animate);
    }
    function reset() { s = fit(); tx = 0; ty = 0; apply(false); }
    reset();

    var drag = null, moved = false;
    z.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || e.target.closest('.zoomer__ui')) return;
      drag = { x: e.clientX, y: e.clientY, tx: tx, ty: ty };
      moved = false;
      try { z.setPointerCapture(e.pointerId); } catch (err) {}
    });
    z.addEventListener('pointermove', function (e) {
      if (!drag) return;
      if (!moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 4) return;
      moved = true;
      z.classList.add('is-dragging');
      tx = drag.tx + e.clientX - drag.x;
      ty = drag.ty + e.clientY - drag.y;
      apply(false);
      used();
    });
    var end = function (e) {
      if (drag && !moved && e && e.type === 'pointerup' && !e.target.closest('.zoomer__ui')) {
        var r = z.getBoundingClientRect();
        if (s < MAX * 0.98) zoomAt(Math.min(MAX, s * 2.5), e.clientX - r.left, e.clientY - r.top, true);
        else zoomAt(fit(), e.clientX - r.left, e.clientY - r.top, true);
        used();
      }
      drag = null;
      z.classList.remove('is-dragging');
    };
    z.addEventListener('pointerup', end);
    z.addEventListener('pointercancel', end);
    z.addEventListener('wheel', function (e) {
      var pinch = e.ctrlKey || e.metaKey;
      var scrolling = Date.now() - lastPageScroll < 280;
      if (!pinch && scrolling) return;               /* the page is scrolling past: let it */
      var r = z.getBoundingClientRect();
      var dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      if (!pinch && Math.abs(e.deltaX) > Math.abs(dy) && s > fit() * 1.02) {
        e.preventDefault(); e.stopPropagation();
        tx -= e.deltaX; apply(false); used();
        return;
      }
      if (!pinch && dy > 0 && s <= fit() * 1.001) return;   /* fully zoomed out: keep scrolling the page */
      e.preventDefault(); e.stopPropagation();
      zoomAt(s * Math.exp(-dy * (pinch ? 0.012 : 0.0022)), e.clientX - r.left, e.clientY - r.top, false);
      used();
    }, { passive: false });
    z.addEventListener('keydown', function (e) {
      var cx = z.clientWidth / 2, cy = z.clientHeight / 2;
      if (e.key === '+' || e.key === '=') zoomAt(s * 1.5, cx, cy, true);
      else if (e.key === '-' || e.key === '_') zoomAt(s / 1.5, cx, cy, true);
      else if (e.key === 'ArrowLeft') { tx += 80; apply(true); }
      else if (e.key === 'ArrowRight') { tx -= 80; apply(true); }
      else if (e.key === 'ArrowUp') { ty += 80; apply(true); }
      else if (e.key === 'ArrowDown') { ty -= 80; apply(true); }
      else if (e.key === '0') zoomAt(fit(), cx, cy, true);
      else return;
      e.preventDefault();
      used();
    });
    z.querySelectorAll('[data-zoom]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var m = b.getAttribute('data-zoom');
        var cx = z.clientWidth / 2, cy = z.clientHeight / 2;
        if (m === 'in') zoomAt(s * 1.6, cx, cy, true);
        else if (m === 'out') zoomAt(s / 1.6, cx, cy, true);
        else if (m === 'fit') zoomAt(fit(), cx, cy, true);
        else if (m === 'full') {
          if (document.fullscreenElement) document.exitFullscreen();
          else if (z.requestFullscreen) z.requestFullscreen();
        }
        used();
      });
    });
    document.addEventListener('fullscreenchange', function () { setTimeout(reset, 80); });
    window.addEventListener('resize', function () { var f = fit(); if (s < f) s = f; apply(false); });
  });

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
