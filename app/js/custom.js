$(document).ready(function(){
//send popup
// $(".popup-form").submit(function() {
//   $.ajax({
//     type: "POST",
//     url: "message.php",
//     data: $(this).serialize()
//   }).done(function() {
//     $(this).find("input").val("");
//     alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
//     $(".popup-form").trigger("reset");
//          $(".popup").css('opacity','0').delay(200);  // delay() позволяет сделать паузу между изменениями свойств
//          $(".popup").css('display', 'none'); 
//          $(".popup").dequeue();
//        });
//   return false;
// });

$('.header-top-nav-search .search-btn').on('click', function(ev) {
  ev.preventDefault();
  $(this).toggleClass('active');
});

//review slider
var swiper = new Swiper('.review .swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//menu burger
$('.main-navigation-link').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('open').blur().next('.menu-list').slideToggle('medium', function() {
    if ($(this).is(':visible'))
      $(this).css('display','flex');
  });
});

//click inside
$('.center-menu-item, .thematic-item, .last-projects-item, .m_blog-item').click(function() {
  $(this).find('a')[0].click();
});
$('.news-block-item .title, .news-block-item .img-wrap').click(function() {
  $(this).parent().find('a')[0].click();
});

//catalog-tabs
$('.catalog-tabs-caption').on('click', 'li:not(.active)', function() {
  $(this).addClass('active').siblings().removeClass('active').closest('.catalog').find('.catalog-content-item').removeClass('active').eq($(this).index()).addClass('active');
});

//popup button
$('.popup-btn').click(function(e) {
  e.preventDefault();
  $('.popup').show();
  $('.overlay').show();
});
$('.popup-close, .overlay').click(function() {
  $('.overlay, .popup').hide();
});
$('.useful-item-popup-close, .overlay').click(function() {
  $(this).closest('body').find('.useful-item-popup').removeClass('active');
  $('.overlay').hide();
});
//useful-popup
$('.useful-btn').click(function(e) {
  e.preventDefault();
  $(this).closest('.useful-info').find('.useful-item-popup').eq($(this).data("popup")-1).addClass('active');
  // .show();
  $('.overlay').show();
});

//header-banner
$('.header_banner .owl-carousel').owlCarousel({
  items : 1,
  loop:true,
  nav: true,
  dots:true,
  autoplay:false,
  navSpeed: 3000,
});
//useful carousel
$('.useful-info .owl-carousel').owlCarousel({
  loop:true,
  nav: true,
  dots:false,
  margin: 40,
  autoplay:true,
  autoplaySpeed: 3000,
  navSpeed: 3000,
  autoplayTimeout:5000,
  autoplayHoverPause:true,
  responsive : {
    0 :{
      items : 1
    },
    768 :{
      items : 2
    },
    992 :{
      items : 2
    },
    1200 :{
      items : 3
    }
  }
});
//review carousel
$('.review .owl-carousel').owlCarousel({
  loop:true,
  nav: true,
  dots:false,
  autoplay:true,
  autoplaySpeed: 3000,
  navSpeed: 3000,
  autoplayTimeout:5000,
  autoplayHoverPause:true,
  responsive : {
    0 :{
      items : 1
    },
    600 :{
      items : 2
    },
    992 :{
      items : 3
    },
    1200 :{
      items : 4
    }
  }
});

//review tabs
$('.review_clients').on('click', 'li:not(.active)', function() {
  $(this).addClass('active').siblings().removeClass('active').closest('.review').find('.review_item').removeClass('active').eq($(this).index()).addClass('active').next().addClass('active');
});
$('.cases-item-info .title').click(function() {
  $(this).next().toggle('400').parent().toggleClass('active').siblings('.cases-item-info').removeClass('active').find('ul').hide('400');
});
//counter
var offset_count = $('.consalt-block').length ?
  $('.consalt-block').offset().top :  0;
var count_flag = 0;
$(document).scroll(function() {
  console.log($(document).scrollTop());
  if(offset_count < $(document).scrollTop()+200 && !count_flag){
    count_flag=1;
      $('.consalt-number').countTo({
      speed: 2500
    })
  }
});


//project popup
$('.projects-item').click(function(e) {
  e.preventDefault();
  bg_img = $(this).data('img');
  console.log(bg_img);
  $('.project-popup img').attr('src', bg_img);
  $('.project-popup').show();
  // $('.project-popup').css('background-image', 'url(' + bg_img + ')').show();
  $('.overlay').show();
});
$('.popup-close, .overlay').click(function() {
  $('.overlay, .project-popup').hide();
});

//services-tabs
$('.services__tabs--list').on('click', 'li:not(.active)', function(e) {
  e.preventDefault();
  $(this).addClass('active').siblings().removeClass('active').closest('.services__tabs').find('.services__tabs--content--item').removeClass('active').eq($(this).index()).addClass('active');
});
//footer tabs
var tabs = document.querySelector('.footer-contacts-content');
$('.footer-contacts-content-item:first-child').addClass('active');
const select = document.querySelector('.footer-contacts-city select');
    select.onchange = () => {
      tabs.querySelector('.active').classList.remove('active');
      tabs.querySelectorAll('.footer-contacts-content-item')[select.options.selectedIndex].classList.add('active');
    }

    // upload

    $(".upload input[type='file']").on('change', function (e) {
      var label = $(this).siblings('label').children('span');
      var fileName = e.target.files[0].name;
      label.text(fileName);
    });

    if ($('.js-form').length) {
      $('.js-form').each(function () {
        $(this).validate({

          rules: {
            name: {
              required: false,
              minlength: 2
            },
            phone: {
              required: true,
              minlength: 6
            },
            email: {
              required: true,
              email: true
            },
            message: {
              required: false
            }
          },
          errorPlacement: function (error, element) {
          },

          submitHandler: function (form) {
            $.ajax({
              type: "POST",
              url: "/wp-content/themes/marketing/mail/mail.php",
              data: $(form).serialize(),
              success: function () {
                alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
                $(".popup").css('opacity', '0').delay(200);
                $(".popup").css('display', 'none');
                $(".popup").dequeue();

                setTimeout(function () {
                  $(form).trigger("reset");
                }, 3000);
              }
            });
          }

        });
      });
    }

  });
