/* Hero card: the gradient drifts on its own and leans toward the pointer,
   with a soft light that follows it. */
(function () {
  var card = document.querySelector('[data-hero]');
  if (!card) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
  card.addEventListener('pointermove', function (e) {
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width;
    var y = (e.clientY - r.top) / r.height;
    next = { mx: x - 0.5, my: y - 0.5, px: x * 100, py: y * 100 };
    card.classList.add('is-hover');
    if (!frame) frame = requestAnimationFrame(apply);
  }, { passive: true });
  card.addEventListener('pointerleave', function () {
    card.classList.remove('is-hover');
    next = { mx: 0, my: 0, px: 50, py: 40 };
    if (!frame) frame = requestAnimationFrame(apply);
  });
})();
