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
      cssEase: 'linear',
      speed: 100,
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

  /////////////////////
  // Public Methods //
  ///////////////////
  const init = function () {
    _smoothscroll();
    _expandMobileDrawer();
    _stickynavSection();
    _banner_slider();
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


// AppName.Modules.ThemeModule = (function () {
//   //Dependencies
//   var core = AppName.Core;

//   //////////////////////
//   // Private Methods //
//   ////////////////////
//   const _privateMethod = () => {
//     // private stuff

//     // const swiper = new Swiper('.swiper-container', {
//     //   pagination: {
//     //     el: '.swiper-pagination',
//     //   },
//     // });
//   };
	
//    var _categoryBar = function() {
//     let categoryRowWidth = $('.category-row').width();
//     let categoryRowWidthULOnload = $('.category-row ul').width();

//     let slickify = () => {
//       let selectedCategory = $('.category-list').children('.active').index();
   
//       $('.category-list').not('.slick-initialized').slick({
//         slidesToShow: 1,
//         dots: false,
//         variableWidth: true,
//         infinite: true,
//         swipeToSlide: true,
//         initialSlide: selectedCategory
//       });

//       $('.slick-prev').html(' ');
//       $('.slick-next').html(' ');
//     }

//     if (categoryRowWidthULOnload >= categoryRowWidth) {
//       slickify();
//     }

//     $(window).resize(function(){
//       var categoryRowWidth = $('.category-row').width();
//       var categoryRowWidthUL = $('.category-row ul').width();
//       if (categoryRowWidthUL >= categoryRowWidth) {
//         slickify();
//       } 
//       if (categoryRowWidthULOnload <= categoryRowWidth) {
//         if($('.category-list').hasClass('slick-initialized')) {
//               $('.category-list').slick("unslick");
//         }
//       }
//     })
//   }

//   var _stickynav = function () {
//     $(window).on("load scroll", function () {
//       if ($(this).scrollTop() > 10) {
//         $('header').addClass('sticky');
//       } else {
//         $('header').removeClass('sticky');
//       }
//     });
//   };

//   var _banner_slider = function () {

//     $('.banner-slider').on("init", function(event, slick){
//       if(slick.slideCount == 1) {
//         $('.slider-controls').hide();
//         $('.slick-dots').hide();
//       }
//     });

//     $('.banner-slider').slick({
//       infinite: false,
//       dots: false,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       arrows: true,
//       prevArrow: $('.left'),
//       nextArrow: $('.right'),
// 	  cssEase: 'linear',
//       speed: 1000,
//       responsive: [
//         {
//           breakpoint: 768,
//           settings: {
//             dots: true,
//           }
//         }
//       ]
//     }).slick('slickFilter', ':not(.d-none)');
//   };


//   var _text_banner_slider = function () {

//     $('.text-banner-slider').slick({
//       autoplay: true,
//       autoplaySpeed: 2000,
//       cssEase: 'linear',  
//       infinite: true,
//       dots: false,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       arrows: false,
//       prevArrow: false,
//       nextArrow: false,
//     });
//   };
	

//   var _shortCourseFilter = function() {
// // 	  var currentPage = 1;
// // 	  var totalPage = 1; 

// // 	  function loadCourses(cat) {
// // 		  var searchData = {
// // 			  search: $('.short-courses-search').val(),
// // 			  page: currentPage,
// // 			  course_difficulty: $('.short-courses-difficulty').val(),
// // 			  course_year: $('.short-courses-year').val(),
// // 			  course_mentors: $('.short-courses-mentors').val(),
// //        	      category: cat,
// // 		  };

// // 		  if (searchData.course_difficulty === 'Difficulty') {
// // 			  searchData.course_difficulty = ''; 
// // 		  }
// // 		  if (searchData.course_year === 'Year') {
// // 			  searchData.course_year = ''; 
// // 		  }
// // 		  if (searchData.course_mentors === 'Mentor') {
// // 			  searchData.course_mentors = ''; 
// // 		  }

// // 		  $.ajax({
// // 			  url: ajaxurl,
// // 			  type: 'post',
// // 			  data: {
// // 			  action: 'filter_courses',
// // 			  searchData: searchData,
// // 		  },
// // 				 dataType: 'json',
// // 				 beforeSend: function () {
			  
// // 		  },
// // 			  success: function (response) {
// // 				  if (response.success) {
// // 					  if (currentPage === 1) {
// // 						  $('.course-wrapper').empty();
// // 					  }
// // 					  $('.course-wrapper').append(response.data.output);

// // 					  totalPage = response.data.totalPages;
// // 					  if (currentPage < totalPage) {
// // 						  $('.load-more-btn').show();
// // 					  } else {
// // 						  $('.load-more-btn').hide();
// // 					  }
// // 				  } else {
// // 					  console.log('Error: Unable to retrieve filtered courses.');
// // 				  }
// // 			  },
// // 				  error: function () {
// // 					  console.log('Error: AJAX request failed.');
// // 				  },
// // 			  complete: function () {
// // 			  },
// // 		  });
// // 	  }

// // 	  $('.short-courses-search').on('keyup', function () {
// // 		  currentPage = 1; 
// // 		  loadCourses();
// // 	  });

// // 		$('.load-more-btn').on('click', function (e) {
// // 			e.preventDefault();
// // 			currentPage++;
// // 			loadCourses();
// // 		});

// // 		$('.short-courses-difficulty, .short-courses-year, .short-courses-mentors').on('change', function () {
// // 			currentPage = 1; 
// // 			loadCourses();
// // 		});
	  
// // 	  $('.category-list a').on('click', function (e) {
// // 		  e.preventDefault();
// // 		  $('.category-list li').removeClass('active');
// // 		  $(this).closest('li').addClass('active');

// // 		  var categorySlug = $(this).data('slug');

// // 		  currentPage = 1; 
// // 		  loadCourses(categorySlug);
// // 	  });
// 		var currentPage = 1;
// var totalPage = 1;
// var currentCategory = null; // Variable to store the current category

// function loadCourses(cat) {
//   var searchData = {
//     search: $('.short-courses-search').val(),
//     page: currentPage,
//     course_difficulty: $('.short-courses-difficulty').val(),
//     course_year: $('.short-courses-year').val(),
//     course_mentors: $('.short-courses-mentors').val(),
//     category: cat || currentCategory, // Use the parameter if provided, otherwise use the currentCategory
//   };

//   if (searchData.course_difficulty === 'Difficulty') {
//     searchData.course_difficulty = '';
//   }
//   if (searchData.course_year === 'Year') {
//     searchData.course_year = '';
//   }
//   if (searchData.course_mentors === 'Mentor') {
//     searchData.course_mentors = '';
//   }

//   $.ajax({
//     url: ajaxurl,
//     type: 'post',
//     data: {
//       action: 'filter_courses',
//       searchData: searchData,
//     },
//     dataType: 'json',
//     beforeSend: function() {},
//     success: function(response) {
//       if (response.success) {
//         if (currentPage === 1) {
//           $('.course-wrapper').empty();
//         }
//         $('.course-wrapper').append(response.data.output);

//         totalPage = response.data.totalPages;
//         if (currentPage < totalPage) {
//           $('.load-more-btn').show();
//         } else {
//           $('.load-more-btn').hide();
//         }
//       } else {
//         console.log('Error: Unable to retrieve filtered courses.');
//       }
//     },
//     error: function() {
//       console.log('Error: AJAX request failed.');
//     },
//     complete: function() {},
//   });
// }

// // Function to update the URL with the category as a parameter
// function updateUrlParameter(category) {
//   const urlParams = new URLSearchParams(window.location.search);
//   urlParams.set('course', category);
//   const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
//   history.pushState({}, '', newUrl);
// }

// $('.short-courses-search').on('keyup', function() {
//   currentPage = 1;
//   loadCourses();
// });

// $('.load-more-btn').on('click', function(e) {
//   e.preventDefault();
//   currentPage++;
//   loadCourses();
// });

// $('.short-courses-difficulty, .short-courses-year, .short-courses-mentors').on('change', function() {
//   currentPage = 1;
//   loadCourses();
// });

// // Handle category list clicks
// $('.category-list a').on('click', function(e) {
//   e.preventDefault();
//   $('.category-list li').removeClass('active');
//   $(this).closest('li').addClass('active');

//   var categorySlug = $(this).data('slug');
//   currentCategory = categorySlug; // Update the current category
//   updateUrlParameter(categorySlug); // Update the URL with the category parameter
//   currentPage = 1;
//   loadCourses(categorySlug);
// });

// // Check if there is a category parameter in the URL and load courses accordingly
// const urlParams = new URLSearchParams(window.location.search);
// const categoryParam = urlParams.get('course');
// if (categoryParam) {
//   $('.category-list a[data-slug="' + categoryParam + '"]').trigger('click');
// } else {
//   // Load default courses if no category parameter is found
//   loadCourses();
// }

//   }
  
  
//   var _featuredCoursesSlider = function () {
//     $('.featured-courses .news-wrapper').slick({
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       prevArrow: false,
//       nextArrow: false,
// //       variableWidth: true, 
//       dots: true,
//       responsive: [{
//         breakpoint: 991,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       }, {
//           breakpoint: 767,
//           settings: {
//             slidesToShow: 1,
//             slidesToScroll: 1,
//           }
//       }]
//     });
//   }
  
  
//     var _creditFilter = function() {
// 	  var currentPage = 1;
// 	  var totalPage = 1; 

// 	  function loadCredits() {
// 		  var searchData = {
// 			  page: currentPage,
// 			  credit_vendor: $('.credit-vendor').val(),
// 			  credit_certification: $('.credit-certification').val(),
// 			  credit_course: $('.credit-course').val(),
// 			  credit_credit: $('.credit-credit').val(),
// 			  location: $('.short-courses-location').val(),
// 		  };

		  
// 		  if (searchData.credit_vendor === 'Vendor/Provider') {
// 			  searchData.credit_vendor = ''; 
// 		  }
// 		  if (searchData.credit_certification === 'Certification') {
// 			  searchData.credit_certification = ''; 
// 		  }
// 		  if (searchData.credit_course === 'Course') {
// 			  searchData.credit_course = ''; 
// 		  }
// 		  if (searchData.credit_credit === 'Credit') {
// 			  searchData.credit_credit = ''; 
// 		  }

// 		  $.ajax({
// 			  url: ajaxurl,
// 			  type: 'post',
// 			  data: {
// 			  action: 'credit_filter',
// 			  searchData: searchData,
// 		  },
// 				 dataType: 'json',
// 				 beforeSend: function () {
			  
// 		  },
// 			  success: function (response) {
// 				  if (response.success) {
					  
// 					  if (currentPage === 1) {
// 						  $('.credit-table .table-data').empty();
// 					  }

					 
// 					  $('.credit-table .table-data').append(response.data.output);

					  
// 					  totalPage = response.data.totalPages;

					 
// 					  if (currentPage < totalPage) {
// 						  $('.load-more-credit').show();
// 					  } else {
// 						  $('.load-more-credit').hide();
// 					  }
// 				  } else {
					 
// 					  console.log('Error: Unable to retrieve filtered credits.');
// 				  }
// 			  },
// 				  error: function () {
					  
// 					  console.log('Error: AJAX request failed.');
// 				  },
// 			  complete: function () {

// 			  },
// 		  });
// 	  }

// 		$('.btn-credit-filter').on('click', function () {
// 			currentPage = 1; 
// 			loadCredits();
// 		});
		
// 		$('.load-more-credit').on('click', function (e) {
// 			e.preventDefault();
// 			currentPage++;
// 			loadCredits();
// 		});
//   }
	
// var _newsfilter = function () {
// 	var currentPage = 1;
//     var maxPages = $('.news-list').data('max-pages'); // Get the maximum number of pages
//     var activeYear = null; // Store the active year

//     function loadPosts(year, page) {
//         $.ajax({
//             type: 'POST',
//             url: ajaxurl,  // WordPress AJAX URL
//             data: {
//                 action: 'filter_news',  // AJAX action
//                 year: year,
//                 page: page // Send the current page number
//             },
//             success: function(response) {
//                 $('.news-list').append(response);
//                 currentPage++;
                
//                 if (currentPage > maxPages) {
//                     $('.load-more').hide();
//                 }
//             }
//         });
//     }

//     $('.filter-date .year, .filter-date .past-years').click(function() {
//         var year = $(this).data('year');
//         currentPage = 1; // Reset the current page
//         $('.news-list').empty(); // Clear the news list
//         $('.load-more').show(); // Show the "Load More" button
//         activeYear = year; // Store the active year
//         loadPosts(year, currentPage);
//     });

//     $('.load-more a').click(function(event) {
//         event.preventDefault();
//         loadPosts(activeYear, currentPage);
//     });
// }

// var _seamlessIframe = function () {
// 	window.onload = function () {
//       var iframes = document.getElementsByTagName("iframe");
      
//       for (var i = 0; i < iframes.length; i++) {
//         var src = iframes[i].src;
//         if (src.includes("edu.au")) {
//           window.seamless(iframes[i]);
//         }
//       }
//     };
// }

// var _videoThumbnail = function () {

// 	$(".news-item .thumbnail").each(function() {
// 		$(this).on('click', function(e) {

// 			$(this).find("img").hide();

// 			var $video = $(this).siblings("iframe");

// 			if ($video.length > 0) {
// 				src = $video.attr('src');
// 				$video.attr('src', src + '?autoplay=1');
// 			}

// 		});
// 	});
// }

// var _search_function_all = function() {
//     $("#search-all").on("click", function(event) {
// 		  event.preventDefault();
// 		  $("#search-all").hide();

// 		  var searchQuery = $('#search-box-all').val();
// 		  console.log(searchQuery);

// 		  $.ajax({
// 		  url: ajaxurl,
// 		  type: 'POST',
// 		  data: {
// 			action: 'load_more_posts',
// 			search_query: searchQuery,
// 		  },
// 		  success: function(response) {
// 			// your success code here
// 			jQuery('.card-container').html(response);
// 		  },
// 		  error: function(xhr, status, error) {
// 			// your error code here
// 		  }
// 		});

// 	  });
// 	}

//  const _mainNavToggler = () => {
//     $('.navbar-main .navbar-toggler').click(() => {
//       $('.navbar-main .navbar-collapse').toggleClass('show');
//       $('body').toggleClass('no-scroll');
//       // $('.navbar-top .navbar-toggler').toggleClass('hide');
//     })

//     $('.navbar-main .close-drawer').click(() => {
//       $('.navbar-main .navbar-collapse').toggleClass('show');
//       $('body').toggleClass('no-scroll');
//       // $('.navbar-main .navbar-toggler').delay(1000).toggleClass('hide');
//     })
//   }

//   const _topNavToggler = () => {
//     $('.navbar-top .navbar-toggler').click(() => {
//       $('.navbar-top .navbar-collapse').toggleClass('show');
//       $('body').toggleClass('no-scroll');
//       // $('.navbar-main .navbar-toggler').delay(1000).toggleClass('hide');
//     })

//     $('.navbar-top .close-drawer').click(() => {
//       $('.navbar-top .navbar-collapse').toggleClass('show');
//       $('body').toggleClass('no-scroll');
//       // $('.navbar-main .navbar-toggler').delay(1000).toggleClass('hide');
//     })

//     $('.navbar-top .dropdown-toggle').click( function(){
//       if ($(this).next().is(':visible')) {
//         location.href = $(this).attr('href');;
//       }
//     });

//     $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
//       if (!$(this).next().hasClass('show')) {
//         $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
//       }

//       if ($(this).next().is(':visible')) {
//         location.href = $(this).attr('href');
//         console.log('asdx');
//       } 

//       var $subMenu = $(this).next(".dropdown-menu");
//       $subMenu.toggleClass('show');
//       // console.log('asd');
      
//       $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
//       $('.dropdown-menu .dropdown-menu.show').removeClass("show");
//       });
  
  
//       return false;
//     });

//     $(window).on('load', 'resize', function(){

//       if ($(window).width() > 767) {
//         $( ".navbar-top .dropdown" )
//         .mouseover(function() {
//           $( this ).addClass('show').attr('aria-expanded',"true");
//           $( this ).find('.dropdown-menu').addClass('show');
//         })
//         .mouseout(function() {
//           $( this ).removeClass('show').attr('aria-expanded',"false");
//           $( this ).find('.dropdown-menu').removeClass('show');
//         });
//       }

//     });

// 	  $(document).click(function(event) {
// 		  var targetElement = $(".navbar-main .nav-link.parent");

// 		  if (!targetElement.is(event.target) && targetElement.has(event.target).length === 0) {
// 			  $('.dropdown-menu').removeClass('show');
// 		  }
// 	  });

//     $('.navbar-main .nav-link.parent').each(function(){
      
//       $(this).click((e) => {
       
//         if ($(this).next().is(':visible')) {
//           location.href = $(this).attr('href');
//         } else {
//            if (!$(this).siblings().hasClass('show')){
//             $('.dropdown-menu').removeClass('show');
//             $(this).siblings().addClass('show');
//           } else {
//             $('.dropdown-menu').removeClass('show');
//           }
//           $('.nav-button').removeAttr('style');

//           e.preventDefault();
//         }

//       });
//     });

//     $('.second-level-list .dropdown-toggle').each(function(){
//       $(this).click((e) => {
     
//         if ($(this).next().is(':visible')) {
//           // location.href = $(this).attr('href');
//           // e.preventDefault();
//         } 
       
//         var dropdownHight = $(this).next().height();
//         $(this).parent().parent().parent().css({ "height": dropdownHight + 2 });
        
//       });
//     });
//   }



//   /////////////////////
//   // Public Methods //
//   ///////////////////
//   const init = function () {
//     _privateMethod();
//     _stickynav();
//     _banner_slider();
//     _text_banner_slider();
// 	_categoryBar();
// 	_shortCourseFilter();
// 	_featuredCoursesSlider();
// 	_creditFilter();
// 	_newsfilter();
// 	_seamlessIframe();
// 	_videoThumbnail();
// 	_search_function_all();
// 	_mainNavToggler();
//     _topNavToggler();
//   };

//   return {
//     init: init,
//   };
// })();