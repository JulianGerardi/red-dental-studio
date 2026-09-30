/* Hero card: the gradient drifts on its own and leans toward the pointer.
   Moving the mouse over it leaves a trail of previews of the work. */
(function () {
  var card = document.querySelector('[data-hero]');
  if (!card) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced) return;

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

  /* Previews of the work, spawned along the pointer's path */
  var trail = card.querySelector('.hero-card__trail');
  var items = [];
  try { items = JSON.parse(trail.getAttribute('data-trail') || '[]'); } catch (e) {}
  var idx = 0, last = null, live = [], loaded = false;
  function preload() {
    if (loaded) return;
    loaded = true;
    items.forEach(function (it) { var im = new Image(); im.src = it.src; });
  }
  function spawn(x, y) {
    var it = items[idx % items.length];
    idx++;
    var el = document.createElement('div');
    el.className = 'trail-item';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--r', (Math.random() * 8 - 4).toFixed(1) + 'deg');
    var im = document.createElement('img');
    im.src = it.src;
    im.alt = '';
    var tag = document.createElement('span');
    tag.textContent = it.name;
    el.appendChild(im);
    el.appendChild(tag);
    trail.appendChild(el);
    live.push(el);
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('is-in'); }); });
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () {
        el.remove();
        var i = live.indexOf(el);
        if (i !== -1) live.splice(i, 1);
      }, 750);
    }, 800);
    if (live.length > 7) { var old = live.shift(); old.remove(); }
  }

  card.addEventListener('pointerenter', preload);
  card.addEventListener('pointermove', function (e) {
    var r = card.getBoundingClientRect();
    var lx = e.clientX - r.left, ly = e.clientY - r.top;
    var x = lx / r.width, y = ly / r.height;
    next = { mx: x - 0.5, my: y - 0.5, px: x * 100, py: y * 100 };
    card.classList.add('is-hover');
    if (!frame) frame = requestAnimationFrame(apply);
    if (fine && trail && items.length && (e.pointerType === 'mouse' || !e.pointerType)) {
      if (!last || Math.hypot(lx - last.x, ly - last.y) > 120) {
        spawn(lx, ly);
        last = { x: lx, y: ly };
      }
    }
  }, { passive: true });
  card.addEventListener('pointerleave', function () {
    card.classList.remove('is-hover');
    last = null;
    next = { mx: 0, my: 0, px: 50, py: 40 };
    if (!frame) frame = requestAnimationFrame(apply);
  });
})();
