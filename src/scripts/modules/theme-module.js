AppName.Modules.ThemeModule = (function () {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////
 
  var _stickynav = function () {
    $(window).on("load scroll", function () {
      if ($(this).scrollTop() > 10) {
        $('header').addClass('sticky');
      } else {
        $('header').removeClass('sticky');
      }
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

  /////////////////////
  // Public Methods //
  ///////////////////
  const init = function () {
    _testimonial_slider();
    _stickynav();
    _banner_slider();
    _text_banner_slider();
  };

  return {
    init: init,
  };
})();
