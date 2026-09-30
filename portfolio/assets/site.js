(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Headline words blur in one after another */
  document.querySelectorAll('.split').forEach(function (el) {
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
            span.textContent = part;
            frag.appendChild(span);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };
    walk(el);
  });

  /* Soft spotlight that follows the pointer inside a cell */
  if (!reduced) {
    document.querySelectorAll('.spot').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--x', (e.clientX - r.left) + 'px');
        el.style.setProperty('--y', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* Theme: follows the system until the visitor picks one */
  try {
    var saved = localStorage.getItem('jg-theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {}

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
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  });

  /* Mobile menu */
  var nav = document.querySelector('.nav');
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

  /* Copy email */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var label = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = label; }, 1600);
      };
      var fallback = function () {
        var target = btn.parentElement.querySelector('[data-copy-text]') || btn.parentElement.querySelector('span');
        if (!target) return;
        var range = document.createRange();
        range.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  });

  /* Local time in Mercedes, Buenos Aires */
  var clock = document.querySelector('[data-clock]');
  if (clock) {
    var tick = function () {
      try {
        clock.textContent = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Buenos_Aires'
        }).format(new Date());
      } catch (e) {}
    };
    tick();
    setInterval(tick, 30000);
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Lightbox for case study screens */
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
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('.lightbox__close')) box.close();
    });
  }

  /* Table of contents: mark the chapter in view */
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && byId[entry.target.id]) {
          tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
          byId[entry.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* NDA gate: a soft lock for confidential case studies.
     The password is stored as a SHA-256 hash in data-hash. */
  var gate = document.querySelector('[data-gate]');
  if (gate) {
    var content = document.getElementById(gate.getAttribute('data-gate'));
    var key = 'jg-nda-' + gate.getAttribute('data-gate');
    var unlock = function () {
      gate.hidden = true;
      if (content) content.hidden = false;
    };
    try { if (sessionStorage.getItem(key) === '1') unlock(); } catch (e) {}
    var form = gate.querySelector('form');
    var input = gate.querySelector('input');
    var error = gate.querySelector('.gate__error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = (input.value || '').trim().toLowerCase();
      if (!value) { error.textContent = 'Type the password to open the case study.'; return; }
      if (!window.crypto || !crypto.subtle) { error.textContent = 'This browser cannot check the password. Ask me for a PDF version.'; return; }
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)).then(function (buf) {
        var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        if (hex === gate.getAttribute('data-hash')) {
          try { sessionStorage.setItem(key, '1'); } catch (err) {}
          unlock();
          if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          error.textContent = 'That password is not right. Check it and try again.';
          input.select();
        }
      });
    });
  }
})();
