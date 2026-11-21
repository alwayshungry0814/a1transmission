(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Set footer year
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    var header = document.getElementById('header');
    var backToTop = document.querySelector('.back-to-top');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('#header .nav-link[href^="#"]');

    function onScroll() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      if (scrollY > 80) {
        if (header) header.classList.add('header-fixed');
        if (backToTop) backToTop.classList.add('is-visible');
      } else {
        if (header) header.classList.remove('header-fixed');
        if (backToTop) backToTop.classList.remove('is-visible');
      }

      if (sections.length && navLinks.length) {
        var scrollPos = scrollY + 120;
        var activeId = '';
        sections.forEach(function (sec) {
          if (scrollPos >= sec.offsetTop) {
            activeId = sec.getAttribute('id');
          }
        });
        if (activeId) {
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + activeId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Smooth scroll on same-page hash links + close mobile navbar
    document.querySelectorAll('a[href*="#"]:not([href="#"])').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var samePath =
          location.pathname.replace(/^\//, '') === anchor.pathname.replace(/^\//, '') &&
          location.hostname === anchor.hostname;
        if (!samePath || !anchor.hash) return;

        var target = document.querySelector(anchor.hash);
        if (!target) return;

        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 70;
        var top = target.getBoundingClientRect().top + (window.pageYOffset || 0) - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });

        var navCollapse = document.getElementById('navbarNav');
        if (navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
          var bsCollapse = window.bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });

    // Inline Netlify Form submission feedback (progressive enhancement)
    var quoteForm = document.getElementById('diagnosis-quote-form');
    if (quoteForm) {
      quoteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitBtn = quoteForm.querySelector('button[type="submit"]');
        var statusEl = document.getElementById('quote-form-status');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
        var formData = new FormData(quoteForm);
        var body = new URLSearchParams();
        formData.forEach(function (val, key) {
          body.append(key, val);
        });

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Network error');
            quoteForm.reset();
            if (statusEl) {
              statusEl.className = 'quote-form-status quote-form-success';
              statusEl.textContent =
                'Request received! We will get back to you soon. For faster service, call or text (818) 882-5135.';
            }
            window.dataLayer = window.dataLayer || [];
            var params = {
              form_name: 'diagnosis-request',
              page_location: window.location.href
            };
            if (typeof window.gtag === 'function') {
              window.gtag('event', 'quote_form_submit', params);
            } else {
              window.dataLayer.push(['event', 'quote_form_submit', params]);
            }
          })
          .catch(function () {
            if (statusEl) {
              statusEl.className = 'quote-form-status quote-form-error';
              statusEl.textContent =
                'Could not send the form right now. Please call or text (818) 882-5135 directly.';
            }
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Request Free Diagnosis';
            }
          });
      });
    }
  });
})();
