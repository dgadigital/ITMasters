AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////

  const _mainNavToggler = () => {

    
    document.querySelectorAll(".more-info").forEach(function (button) {
      button.addEventListener("click", function (e) {
          e.preventDefault(); // Prevent default behavior

          // Extract the product ID from the button's ID (e.g., "more-info-4616")
          const productId = this.id.split("-")[2];
          const accordion = document.getElementById(`id_${productId}`);
          const header = document.querySelector(`#outer_${productId} .card-header`);

          if (accordion) {
              // Toggle the accordion
              if (!accordion.classList.contains("show")) {
                  // Open the accordion
                  accordion.classList.add("show");
                  if (header) header.classList.remove("collapsed");
              } else {
                  // Close the accordion
                  accordion.classList.remove("show");
                  if (header) header.classList.add("collapsed");
              }

              // Use a small timeout to ensure the accordion has updated its height
              setTimeout(function () {
                  // Calculate offset
                  const offset = 250; // Adjust for fixed header height
                  const elementPosition = accordion.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - offset;

                  // Smooth scroll to the accordion with offset
                  window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                  });
              }, 100); // Delay for the accordion height to adjust
          }
      });
  });






    $('.navbar-main .navbar-toggler').click(() => {
      $('.navbar-main .navbar-collapse').toggleClass('show');
      $('body').toggleClass('no-scroll');
      // $('.navbar-top .navbar-toggler').toggleClass('hide');
    })

    $('.navbar-main .close-drawer').click(() => {
      $('.navbar-main .navbar-collapse').toggleClass('show');
      $('body').toggleClass('no-scroll');
      // $('.navbar-main .navbar-toggler').delay(1000).toggleClass('hide');
    })
  }

  const _topNavToggler = () => {
    function toggleNavbarMethod() {
      if ($(window).width() > 1199) {
        $( ".second-level-list .dropdown-toggle" ).mouseover(function() {
            $(".second-level-list .dropdown-toggle").removeClass('show').attr('aria-expanded',"false");
            $(".second-level-list .dropdown-toggle").next('.dropdown-menu').removeClass('show');
            $( this ).addClass('show').attr('aria-expanded',"true");
            $( this ).next('.dropdown-menu').addClass('show');

            var dropdownHight = $(this).next().height();
            $(this).parent().parent().parent().css({ "height": dropdownHight + 2 });
        })
        $('.navbar-main .nav-link.parent').each(function(){
          $(this).hover((e) => {
            if (!$(this).siblings().hasClass('show')){
              $('.dropdown-menu').removeClass('show');
              $(this).siblings().addClass('show');
            }
            // e.preventDefault();
          });
        });
      } else {
        $('.navbar-main .nav-link.parent').each(function(){
          $(this).click((e) => {

            if ($(this).next().is(':visible')) {
              location.href = $(this).attr('href');
              e.preventDefault();
            } else {
              if (!$(this).siblings().hasClass('show')){
                $('.dropdown-menu').removeClass('show');
                $(this).siblings().addClass('show');
              }
              e.preventDefault();
            }
          });
        });
      }
    }
    toggleNavbarMethod();  
    $(window).resize(toggleNavbarMethod);

    $('.second-level-list .dropdown-toggle').click( function(){
      if ($(this).next().is(':visible')) {
        location.href = $(this).attr('href');;
      }
    });

    var targetElement = $(".navbar-main");
    targetElement.hover(
      function() {},
      function() {
        $('.dropdown-menu').removeClass('show');
      }
    );  
  }


  var _categoryBar = function() {
    let categoryRowWidth = $('.category-row').width();
    let categoryRowWidthULOnload = $('.category-row ul').width();

    let slickify = () => {
      let selectedCategory = $('.category-list').children('.active').index();
   
      $('.category-list').not('.slick-initialized').slick({
        slidesToShow: 1,
        dots: false,
        variableWidth: true,
        infinite: true,
        swipeToSlide: true,
        initialSlide: selectedCategory
      });

      $('.slick-prev').html(' ');
      $('.slick-next').html(' ');
    }

    if (categoryRowWidthULOnload >= categoryRowWidth) {
      slickify();
    }

    $(window).resize(function(){
      var categoryRowWidth = $('.category-row').width();
      var categoryRowWidthUL = $('.category-row ul').width();
      if (categoryRowWidthUL >= categoryRowWidth) {
        slickify();
      } 
      if (categoryRowWidthULOnload <= categoryRowWidth) {
        if($('.category-list').hasClass('slick-initialized')) {
              $('.category-list').slick("unslick");
        }
      }
    })
  }
 
  var _stickynav = function() {
    $(window).on("load scroll", function () {
      if ($(this).scrollTop() > 10) {
        $('header').addClass('sticky');
      } else {
        $('header').removeClass('sticky');
      }
    });
  };

  var _text_banner_slider = function () {

    $('.text-banner-slider').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'linear',  
      infinite: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      prevArrow: false,
      nextArrow: false,
    });
  };

  var _featuredCoursesSlider = function () {
    $('.featured-courses .news-wrapper').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: false,
      nextArrow: false,
      // variableWidth: true, 
      dots: false,
      responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
      }]
    });
  }

  var _seamlessIframe = function () {
    // window.onload = function () {
    //   var forms = document.getElementsByTagName("iframe");
    //   for (var i = 0; i < forms.length; i++) {
    //     window.seamless(forms[i]);
    //     console.log(i)
    //   }
    // };

    // window.onload = function () {
    //   var iframes = document.getElementsByTagName("iframe");
      
    //   for (var i = 0; i < iframes.length; i++) {
    //     var src = iframes[i].src;
    //     if (!src.includes("youtube")) {
    //       window.seamless(forms[i]);
    //       console.log('asd')
    //     }
    //   }
    // };

    window.onload = function () {
      var iframes = document.getElementsByTagName("iframe");
      
      for (var i = 0; i < iframes.length; i++) {
        var src = iframes[i].src;
        if (src.includes("edu.au")) {
          window.seamless(iframes[i]);
        }
      }
    };
  }

  var _videoThumbnail = function () {

    $(".news-item .thumbnail").each(function() {
      $(this).on('click', function(e) {

        $(this).find("img").hide();

        var $video = $(this).siblings("iframe");

        if ($video.length > 0) {
          src = $video.attr('src');
          $video.attr('src', src + '?autoplay=1');
        }

      });
    });
  }

  var _expandMobileDrawer = function () {
    
    $('.bar-top').on('click', function(e) {
      $('.slide-drawer').toggleClass('active');
    });

    $(".slide-drawer a").each(function() {
      $(this).on('click', function(e) {
        var text = $(this).text();
        $('.slide-drawer a').removeClass('selected');
        $(this).addClass('selected');
        $('.slide-drawer').toggleClass('active');
        $('.bar-top').html(text);
      });
    }); 
  }

  var _stickynavSection = function () {
    $(window).on("load scroll", function () {
      if ($(this).scrollTop() > 87) {
        $('.sticky_nav_slide').addClass('sticky');
      } else {
        $('.sticky_nav_slide').removeClass('sticky');
      }
    });
  };

  var _smoothscroll = function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          const offset = 200; // Adjust the offset as needed
          const targetOffsetTop = targetElement.offsetTop - offset;
  
          window.scrollTo({
              top: targetOffsetTop,
              behavior: 'smooth'
          });
      });
  });
  }
  var _testimonial_slider = function () {

    $('.testimonial-slider').slick({
      autoplay: false,
      autoplaySpeed: 2000,
      cssEase: 'linear',  
      infinite: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
        }
      },
      {
        breakpoint: 990,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
        }
      }
      ]
    });
  };
  var _banner_slider = function () {
    $('.banner-slider').each(function() {
      var $slider = $(this);
      var $controls = $slider.closest('section').find('.slider-controls'); // Find controls in the same section
  
      $slider.on("init", function(event, slick){
        console.log("Total slides in this slider:", slick.slideCount); // Debugging
  
        if (slick.slideCount <= 1) {
          $controls.hide();
          $slider.find('.slick-dots').hide();
        } else {
          $controls.show();
          $slider.find('.slick-dots').show();
        }
      });
  
      $slider.slick({
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $controls.find('.left'),
        nextArrow: $controls.find('.right'),
        responsive: [
          {
            breakpoint: 843,
            settings: {
              dots: true,
            }
          }
        ]
      });
    });
  };
	var _banner_slider_v2 = function () {
    $('.banner-slider-v2').each(function() {
      var $slider = $(this);
      var $controls = $slider.closest('section').find('.slider-controls'); // Find controls in the same section
  
      $slider.on("init", function(event, slick){
        console.log("Total slides in this slider:", slick.slideCount); // Debugging
  
        if (slick.slideCount <= 1) {
          $controls.hide();
          $slider.find('.slick-dots').hide();
        } else {
          $controls.show();
          $slider.find('.slick-dots').show();
        }
      });
  
      $slider.slick({
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $controls.find('.left'),
        nextArrow: $controls.find('.right'),
        responsive: [
          {
            breakpoint: 843,
            settings: {
              dots: true,
            }
          }
        ]
      });
    });
  };

  /////////////////////
  // Public Methods //
  ///////////////////
  const init = function () {
	  _testimonial_slider();
    _banner_slider();
// 	  _banner_slider_v2();

	  
    _smoothscroll();
    _expandMobileDrawer();
    _stickynavSection();
    _text_banner_slider();
    _categoryBar();
    _featuredCoursesSlider();
    _seamlessIframe();
    _videoThumbnail();
    _mainNavToggler();
    _topNavToggler();
  };

  return {
    init: init,
  };
})();