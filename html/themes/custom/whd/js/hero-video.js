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

        window.onYouTubeIframeAPIReady = function() {
          window.player = new window.YT.Player('player', {
            videoId: '8qfpnFZQWmo',
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0
            },
            events: {
              'onStateChange': onPlayerStateChange
            }
          });
        }
      }

      $('#hero__play-button').on('click', function () {
        console.log('play');
        $(this).hide();
        $("#hero__image").hide();
        createVideo();
      });

      function onPlayerStateChange(event) {
        if (event.data === 0) {
          $("#player").remove();
          $("#hero__video-container").append('<div id ="player" width="300" align="left" height="238" style="margin-right:30px;"></div>');
          $("#hero__play-button").show();
          $("#hero__image").show();
        }
      }

    }
  };
})(jQuery);
