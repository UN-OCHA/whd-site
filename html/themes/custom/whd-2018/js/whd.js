/**
 * @file
 * Theme JavaScript.
 */

var mq = window.matchMedia("(max-width:992px)");
var key;
var current_language;
var current_flag = '';

$(document).ready(function () {

  if ($('body').hasClass('lang-en')) {
    current_language = 'en';
  }
  else if ($('body').hasClass('lang-es')) {
    current_language = 'es';
  }
  else if ($('body').hasClass('lang-fr')) {
    current_language = 'fr';
  }
  else if ($('body').hasClass('lang-zh-hans')) {
    current_language = 'zh';
  }
  else if ($('body').hasClass('lang-pt-pt')) {
    current_language = 'pt';
  }
  else if ($('body').hasClass('lang-ru')) {
    current_language = 'ru';
  }
  else if ($('body').hasClass('lang-ar')) {
    current_language = 'ar';
  }

/*  $.post('/session/token',null,function (token) {
      $.ajaxSetup({
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
        },
      });
    $.get('/petition/count', function (data) {
      $('#petition-countries-count').html(data.length);
      var total = 0;
      $.each(data,function (pos,el) { total += parseInt(el.field_country) || 0; });
      $('#petition-signatures-count').html(total + 4980);
    });
  });
*/
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds.
    var secondDate = new Date(new Date().getFullYear(),8,26);
    var firstDate = new Date();
    var daysLeft = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    $('#petition-days-left').html(daysLeft.toString());

    $('.video-player').on('click', function (e) {
      e.preventDefault();
      var videoId = $(this).data('videoid');
      if (videoId != '') {
        $('#video-container, #overlay, section.site-section').addClass('active');
        ytVideoPlayer.loadVideoById(videoId);
        ytVideoPlayer.playVideo();
      }
    });

    $('#video-close').on('click', function (e) {
      e.preventDefault();
      if (ytVideoPlayer) {
        ytVideoPlayer.stopVideo();
      }
      $('#video-container, #overlay, section.site-section').removeClass('active');
    });

    $('#mobile-menu').on('click', function (e) {
      $('#nav-links, .language-selector').toggleClass('active');
    });

    $('#nav').on('click', function () {
      if ($(this).hasClass('active')) {
        $('#nav, #nav-menu, #overlay, section.site-section, ').removeClass('active');
      }
      else {
        $('#nav, #nav-menu, #overlay, section.site-section').addClass('active');
      }
    });

    $('#nav-menu li').on('click', function () {
      if ($(this).attr('data-target')) {
        $('#nav, #nav-menu, #overlay, section.site-section, #nav-links').removeClass('active');
        jumpToSection($('#' + $(this).attr('data-target')));
      }
    });

    $('#section-about .btn-cta').on('click',function (e) {
      e.preventDefault();
    $('#section-about article').addClass('active');
    });

  $(document).keyup(function (e) {
      if (e.keyCode == 27) { // Escape key maps to keycode `27`.
      if (ytVideoPlayer) {
        ytVideoPlayer.stopVideo();
      }
      $('#video-container, #petition-full, #overlay, #nav-menu, section.site-section').removeClass('active');
      }
  });

  $('[track-click]').on('click', function () {
    if (ga) {
      var category = $(this).data('ga-category');
      var action = $(this).data('ga-action');
      var label = $(this).data('ga-label');
      ga('send','event',category,action,label);
    }
  });

  $('[social-share]').on('click', function () {
    shareLink(this);
  });

  $('#section-whatiswhd ul li .cta').on('click', function () {
    $('[data-aos^=fade][data-aos^=fade].aos-animate').addClass('overlay');
    $('header').hide();
    $('footer').hide();
    $(this).next().addClass('active');
  });

  $('#section-whatiswhd ul li aside .button-close').on('click', function () {
    $(this).parent().removeClass('active');
    $('header').show();
    $('footer').show();
    $('[data-aos^=fade][data-aos^=fade].aos-animate').removeClass('overlay');
  });

  $('#current_language').on('click', function () {
    $('.language-selector').toggleClass('active');
  });
  AOS.init({duration: 750});
});

var jumpToSection = function (target) {
  $('html, body').animate({
    scrollTop: (target.offset().top - $('header').outerHeight())
    }, 1000, function () {
      // Callback after animation
      // Must change focus!
      var $target = $(target);
      /*$target.focus();
      if ($target.is(":focus")) { // Checking if the target was focused
        return false;
      } else {
        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
        $target.focus(); // Set focus again
      };*/
    });

}

var validateEmail = function (Email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return $.trim(Email).match(pattern) ? true : false;
}

var shareLink = function (element) {
  var winTop = (screen.height / 2) - (400 / 2),
    winLeft = (screen.width / 2) - (500 / 2);
  var strParam = 'width=' + 400 + ',height=' + 500 + ',resizable=' + 'no,' + 'top=' + winTop + ',left=' + winLeft;

  var link = document.location.origin + '/' + current_language + $(element).data('url');

  var objWindow = window.open("https://www.facebook.com/sharer/sharer.php?u=" + link, '', strParam).focus();
}
