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

    $('.banner-slider').on("init", function(event, slick){
      if(slick.slideCount == 1) {
        $('.slider-controls').hide();
        $('.slick-dots').hide();
      }
    });

    $('.banner-slider').slick({
      infinite: false,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: $('.left'),
      nextArrow: $('.right'),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: true,
          }
        }
      ]
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

  /////////////////////
  // Public Methods //
  ///////////////////
  const init = function () {
    _stickynav();
    _banner_slider();
    _text_banner_slider();
  };

  return {
    init: init,
  };
})();
