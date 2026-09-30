/* Interactive banner: my name drawn with particles in a moving gradient.
   The pointer pushes them away, a click scatters them, and they always find
   their way back. Falls back to the gradient text when canvas is unavailable. */
(function () {
  var banner = document.querySelector('[data-banner]');
  if (!banner) return;
  var canvas = banner.querySelector('canvas');
  var textEl = banner.querySelector('.banner__text');
  var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  if (!ctx || !textEl) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PALETTE = [[255, 77, 141], [121, 40, 202], [0, 112, 243], [80, 227, 194], [245, 166, 35]];
  var SHADES = 72;
  var colors = [];
  for (var s = 0; s < SHADES; s++) {
    var f = (s / SHADES) * PALETTE.length;
    var i0 = Math.floor(f) % PALETTE.length;
    var i1 = (i0 + 1) % PALETTE.length;
    var k = f - Math.floor(f);
    var a = PALETTE[i0], b = PALETTE[i1];
    colors.push('rgb(' + Math.round(a[0] + (b[0] - a[0]) * k) + ',' + Math.round(a[1] + (b[1] - a[1]) * k) + ',' + Math.round(a[2] + (b[2] - a[2]) * k) + ')');
  }

  var W = 0, H = 0, dpr = 1, size = 3, radius = 100;
  var parts = [];
  var mouse = { x: -9999, y: -9999, on: false };
  var visible = true, running = false, assembled = false, released = false, built = false;
  var t = 0;

  function build() {
    var rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = rect.width; H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var cs = getComputedStyle(textEl);
    var tr = textEl.getBoundingClientRect();
    var fontSize = parseFloat(cs.fontSize);
    var off = document.createElement('canvas');
    off.width = Math.ceil(W);
    off.height = Math.ceil(H);
    var o = off.getContext('2d');
    var text = textEl.textContent.trim();
    var setFont = function (px) {
      o.font = cs.fontWeight + ' ' + px + 'px ' + cs.fontFamily;
      if ('letterSpacing' in o) o.letterSpacing = (parseFloat(cs.letterSpacing) || 0) * (px / fontSize) + 'px';
    };
    setFont(fontSize);
    var m = o.measureText(text);
    var inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    var maxW = tr.width * 0.98;
    if (inkW > maxW) { fontSize = fontSize * maxW / inkW; setFont(fontSize); m = o.measureText(text); }
    o.textAlign = 'center';
    o.textBaseline = 'alphabetic';
    o.fillStyle = '#000';
    var cx = tr.left - rect.left + tr.width / 2;
    var cy = tr.top - rect.top + tr.height / 2;
    o.fillText(text, cx, cy + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);

    var gap = Math.max(3, Math.min(5, Math.round(fontSize / 52)));
    size = Math.max(2, gap - 1);
    radius = Math.max(56, Math.min(150, W * 0.075));
    var data = o.getImageData(0, 0, off.width, off.height).data;
    var next = [];
    for (var y = 0; y < off.height; y += gap) {
      for (var x = 0; x < off.width; x += gap) {
        if (data[(y * off.width + x) * 4 + 3] > 128) next.push(x, y);
      }
    }
    var fresh = [];
    for (var j = 0; j < next.length; j += 2) {
      var old = parts[j / 2];
      var p = old || {};
      p.hx = next[j]; p.hy = next[j + 1];
      if (!old) {
        if (reduced || (built && released)) { p.x = p.hx; p.y = p.hy; }
        else { p.x = Math.random() * W; p.y = Math.random() * H; }
        p.vx = 0; p.vy = 0;
        p.d = Math.random();
      }
      fresh.push(p);
    }
    fresh.sort(function (p1, p2) { return p1.hx - p2.hx; });
    parts = fresh;
    built = true;
    banner.classList.add('is-live');
    draw();
    wake();
  }

  function step() {
    if (!released) return true;
    var spring = assembled ? 0.055 : 0.028;
    var friction = 0.84;
    var r2 = radius * radius;
    var moving = false;
    for (var n = 0; n < parts.length; n++) {
      var p = parts[n];
      if (!assembled && p.d > t * 1.6) { continue; }
      var ax = (p.hx - p.x) * spring;
      var ay = (p.hy - p.y) * spring;
      if (mouse.on) {
        var dx = p.x - mouse.x, dy = p.y - mouse.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < r2 && d2 > 0.01) {
          var d = Math.sqrt(d2);
          var force = (1 - d / radius) * 7.5;
          ax += (dx / d) * force;
          ay += (dy / d) * force;
        }
      }
      p.vx = (p.vx + ax) * friction;
      p.vy = (p.vy + ay) * friction;
      p.x += p.vx;
      p.y += p.vy;
      if (!moving && (Math.abs(p.vx) > 0.02 || Math.abs(p.vy) > 0.02 || Math.abs(p.hx - p.x) > 0.3 || Math.abs(p.hy - p.y) > 0.3)) moving = true;
    }
    return moving;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var shift = t * 0.06;
    var current = -1;
    for (var n = 0; n < parts.length; n++) {
      var p = parts[n];
      var idx = Math.floor(((p.hx / W) * 0.85 + shift) * SHADES) % SHADES;
      if (idx !== current) { current = idx; ctx.fillStyle = colors[idx]; }
      ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
    }
  }

  var lastTs = null;
  function frame(ts) {
    if (!visible) { running = false; lastTs = null; return; }
    var dt = lastTs === null ? 16 : Math.min(48, ts - lastTs);
    lastTs = ts;
    t += dt / 1000;
    step();
    draw();
    requestAnimationFrame(frame);
  }
  function wake() {
    if (reduced || running || !visible || !built) return;
    running = true;
    requestAnimationFrame(frame);
  }

  function local(e) {
    var r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  canvas.addEventListener('pointermove', function (e) {
    var q = local(e);
    mouse.x = q.x; mouse.y = q.y; mouse.on = true;
    banner.classList.add('is-touched');
    wake();
  }, { passive: true });
  canvas.addEventListener('pointerleave', function () { mouse.on = false; mouse.x = mouse.y = -9999; });
  canvas.addEventListener('pointercancel', function () { mouse.on = false; mouse.x = mouse.y = -9999; });
  canvas.addEventListener('pointerdown', function (e) {
    if (reduced) return;
    var q = local(e);
    for (var n = 0; n < parts.length; n++) {
      var p = parts[n];
      var dx = p.x - q.x, dy = p.y - q.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var power = Math.max(0, 1 - d / (W * 0.6)) * 38 + Math.random() * 4;
      p.vx += (dx / d) * power;
      p.vy += (dy / d) * power;
    }
    banner.classList.add('is-touched');
    wake();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) wake();
    }).observe(banner);
  }
  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden;
    if (visible) wake();
  });

  var resizeTimer = null;
  var lastW = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 180);
  });

  function assemble() { released = true; assembled = false; t = 0; setTimeout(function () { assembled = true; }, 1400); wake(); }
  var start = function () {
    build();
    if (reduced) { released = true; assembled = true; return; }
    if (window.__jgIntroDone) assemble();
    else document.addEventListener('jg:intro-done', assemble, { once: true });
  };
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  var done = false;
  var go = function () { if (!done) { done = true; start(); } };
  fontsReady.then(go, go);
  setTimeout(go, 1500);
})();
