/* Hero card: the gradient drifts on its own and leans toward the pointer.
   Each highlighted word shows a preview of the project it points to. */
(function () {
  var card = document.querySelector('[data-hero]');
  if (!card) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var frame = null;
  var next = null;
  function apply() {
    frame = null;
    if (!next) return;
    card.style.setProperty('--mx', next.mx.toFixed(3));
    card.style.setProperty('--my', next.my.toFixed(3));
    card.style.setProperty('--px', next.px.toFixed(1) + '%');
    card.style.setProperty('--py', next.py.toFixed(1) + '%');
  }
  if (!reduced) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      next = { mx: x - 0.5, my: y - 0.5, px: x * 100, py: y * 100 };
      card.classList.add('is-hover');
      if (!frame) frame = requestAnimationFrame(apply);
    }, { passive: true });
    card.addEventListener('pointerleave', function () {
      card.classList.remove('is-hover');
      next = { mx: 0, my: 0, px: 50, py: 40 };
      if (!frame) frame = requestAnimationFrame(apply);
    });
  }

  /* Words -> project previews, one card per project.
     Mouse: the card follows the hover. Touch: the first tap shows the card,
     a tap on the card (or on the same word again) opens the case. */
  var cards = {};
  card.querySelectorAll('[data-card]').forEach(function (c) { cards[c.getAttribute('data-card')] = c; });
  var current = null, hideTimer = null;
  function show(word) {
    var key = word.getAttribute('data-hot');
    var c = cards[key];
    if (!c) return;
    clearTimeout(hideTimer);
    if (current && current !== c) current.classList.remove('is-on');
    card.querySelectorAll('.hot.is-on').forEach(function (w) { if (w !== word) w.classList.remove('is-on'); });
    word.classList.add('is-on');
    var cr = card.getBoundingClientRect();
    var rects = word.getClientRects();
    var wr = rects[0] || word.getBoundingClientRect();
    var cw = c.offsetWidth, ch = c.offsetHeight;
    var x = wr.left - cr.left + wr.width / 2 - cw / 2;
    var y = wr.top - cr.top - ch - 14;
    if (y < 12) y = wr.bottom - cr.top + 14;
    x = Math.max(12, Math.min(cr.width - cw - 12, x));
    c.style.setProperty('--hx', x.toFixed(0) + 'px');
    c.style.setProperty('--hy', y.toFixed(0) + 'px');
    if (!c.classList.contains('is-on')) {
      c.style.transition = 'none';
      c.style.transform = 'translate(' + x.toFixed(0) + 'px,' + y.toFixed(0) + 'px) translateY(8px) scale(0.96)';
      void c.offsetWidth;
      c.style.transition = '';
      c.style.transform = '';
    }
    c.classList.add('is-on');
    current = c;
  }
  function hide() {
    hideTimer = setTimeout(function () {
      if (current) current.classList.remove('is-on');
      card.querySelectorAll('.hot.is-on').forEach(function (w) { w.classList.remove('is-on'); });
      current = null;
    }, 90);
  }
  if (fine) {
    card.querySelectorAll('.hot').forEach(function (w) {
      w.addEventListener('mouseenter', function () { show(w); });
      w.addEventListener('mouseleave', hide);
      w.addEventListener('focus', function () { show(w); });
      w.addEventListener('blur', hide);
    });
    return;
  }
  var tapped = null;
  card.querySelectorAll('.hot').forEach(function (w) {
    w.addEventListener('click', function (e) {
      if (tapped === w) return;                 /* second tap on the same word: go */
      e.preventDefault();
      tapped = w;
      show(w);
    });
  });
  Object.keys(cards).forEach(function (k) {
    cards[k].addEventListener('click', function () { if (tapped) tapped.click(); });
  });
  document.addEventListener('click', function (e) {
    if (!tapped || e.target.closest('.hot, .hot-card')) return;
    tapped = null;
    hide();
  });
  window.addEventListener('scroll', function () { if (tapped) { tapped = null; hide(); } }, { passive: true });
})();
