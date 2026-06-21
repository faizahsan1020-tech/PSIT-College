// =====================================================
// PSIT site script — shared across all pages
// =====================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.navbar-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  /* ---------- Generic fade carousel ---------- */
  // Works for: .hero (slides .hero-slide, dots .hero-dots button)
  //            .dept-hero (slides .dept-hero-slide)
  //            .strip (slides .strip-slide, dots .strip-dots button, nav .strip-prev/.strip-next)
  //            .gallery-feature (slides .gallery-feature-slide)
  function initFadeCarousel(root, opts) {
    if (!root) return;
    var slides = root.querySelectorAll(opts.slideSel);
    if (!slides.length) return;
    var dotsWrap = opts.dotsSel ? root.querySelector(opts.dotsSel) : null;
    var prevBtn = opts.prevSel ? root.querySelector(opts.prevSel) : null;
    var nextBtn = opts.nextSel ? root.querySelector(opts.nextSel) : null;
    var index = 0;
    var timer = null;

    var dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        b.addEventListener('click', function () { show(i); restart(); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    function show(i) {
      slides[index].classList.remove('active');
      if (dots[index]) dots[index].classList.remove('active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
      if (opts.onShow) opts.onShow(index);
    }

    function restart() {
      if (!opts.interval) return;
      if (timer) clearInterval(timer);
      timer = setInterval(function () { show(index + 1); }, opts.interval);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { show(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(index + 1); restart(); });

    show(0);
    restart();

    return { show: show, restart: restart };
  }

  // Homepage hero
  initFadeCarousel(document.querySelector('.hero'), {
    slideSel: '.hero-slide',
    dotsSel: '.hero-dots',
    interval: 5500
  });

  // Department hero
  initFadeCarousel(document.querySelector('.dept-hero'), {
    slideSel: '.dept-hero-slide',
    interval: 5000
  });

  // Department photo strip (with manual prev/next)
  initFadeCarousel(document.querySelector('.strip'), {
    slideSel: '.strip-slide',
    dotsSel: '.strip-dots',
    prevSel: '.strip-prev',
    nextSel: '.strip-next',
    interval: 6000
  });

  /* ---------- About tabs ---------- */
  var tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length) {
    var panels = document.querySelectorAll('.tab-panel');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ---------- Gallery: feature carousel + thumbnail picker ---------- */
  var galleryRoot = document.querySelector('.gallery-feature');
  if (galleryRoot) {
    var gSlides = galleryRoot.querySelectorAll('.gallery-feature-slide');
    var captionEl = document.querySelector('.gallery-caption-text');
    var thumbs = document.querySelectorAll('.gallery-thumbs img');

    function showGallery(i) {
      gSlides.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
      thumbs.forEach(function (t, idx) { t.classList.toggle('active', idx === i); });
      if (captionEl && gSlides[i]) {
        captionEl.textContent = gSlides[i].getAttribute('data-caption') || '';
      }
    }

    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { showGallery(i); });
    });

    showGallery(0);
  }

});
