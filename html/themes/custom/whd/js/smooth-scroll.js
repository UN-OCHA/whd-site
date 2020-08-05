(function ($) {
  'use strict';

  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      var $root = $('html, body');

      $('.menu-item:nth-child(2n)').click(function () {
        $root.animate({
          scrollTop: $("#stories").offset().top
        }, 1000);

        return false;
      });

      $('.menu-item:nth-child(3n)').click(function () {
        $root.animate({
          scrollTop: $("#what-is-world-humanitarian-day").offset().top
        }, 1000);

        return false;
      });
    }
  };
})(jQuery);

