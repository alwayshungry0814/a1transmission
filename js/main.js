jQuery(document).ready(function ($) {

  // Set footer year
  $('#year').text(new Date().getFullYear());

  // Header fixed + Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $('.back-to-top').fadeIn('slow').css('display', 'flex');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1200, 'easeInOutExpo');
    return false;
  });

  // Initiate WOW.js animations
  new WOW().init();

  // Smooth scroll on anchor links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var headerHeight = $('#header').outerHeight() || 70;
        $('html, body').animate(
          { scrollTop: target.offset().top - headerHeight },
          1000,
          'easeInOutExpo'
        );

        // Close Bootstrap 5 navbar on mobile after click
        var navCollapse = document.getElementById('navbarNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
          var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }

        return false;
      }
    }
  });

  // Update active nav link on scroll
  $(window).scroll(function () {
    var scrollPos = $(this).scrollTop() + 100;
    $('section[id]').each(function () {
      var sectionTop = $(this).offset().top;
      var sectionId = $(this).attr('id');
      if (scrollPos >= sectionTop) {
        $('#header .nav-link').removeClass('active');
        $('#header .nav-link[href="#' + sectionId + '"]').addClass('active');
      }
    });
  });

});
