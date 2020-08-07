(function ($) {
  'use strict';

  Drupal.behaviors.heroVideo = {
    attach: function (context, settings) {

      function createVideo() {
        var youtubeScriptId = 'youtube-api';
        var youtubeScript = document.getElementById(youtubeScriptId);

        if (youtubeScript === null) {
          var tag = document.createElement('script');
          var firstScriptTag = document.getElementsByTagName('script')[0];

          tag.src = 'https://www.youtube.com/iframe_api';
          tag.id = youtubeScriptId;
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = function () {
          window.player = new window.YT.Player('player', {
            width: '100%',
            height: '334',
            videoId: '8qfpnFZQWmo',
            playerVars: {
              autoplay: 1,
              controls: 0,
              enablejsapi: 1,
              fs: 0,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              widget_referrer: 'WHD 2020'
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        };
      }

      $('#hero__play-button').on('click', function () {
        $('.hero__wrapper').hide();
        $('#hero__image').hide();
        createVideo();
      });

      function onPlayerReady(event) {
        $('#hero__video-container').css({
          'position': 'relative',
          'padding-bottom': '56.25%',
          'height': '0'
        });
        $('#player').css({
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'width': '100%',
          'height': '100%'
        });
      }

      function onPlayerStateChange(event) {
        if (event.data === 0) {
          $('#player').remove();
          $('#hero__video-container').append('<div id ="player" width="100%" height="100%"></div>').css('padding-bottom', '0');
          $('.hero__wrapper').show();
          $('#hero__image').show();
        }
      }
    }
  };
})(jQuery);
