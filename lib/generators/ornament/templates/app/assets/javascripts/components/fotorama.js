//= require fotorama

/*jslint browser: true, indent: 2, todo: true, unparam: true */
/*global jQuery,Ornament */

(function (document, window, $) {

  "use strict";

  $(document).on("ornament:refresh", function () {

    $(".fotorama").not(".fotorama-initialized").each(function () {

      var $slider = $(this);
      $slider.fotorama();

      // Get API
      var fotorama = $slider.data("fotorama");

      // Settings
      var sliderBreakpoint = 500;
      var hasCaptions = $slider.is("[data-fotorama-captions]");
      var shouldToggleAutoplay = $slider.is("[data-fotorma-toggle-autoplay]");

      // Toggle autoplay
      var toggleAutoplay = function($slider) {

        // return false if we don't need to toggle
        if( !shouldToggleAutoplay ) {
          return false;
        }

        // get bottom of slider, check if the user has scrolled past it.
        // if they have scrolled past the slider, stop autoplay
        // if they haven't, re-enable autoplay
        var sliderOffsetBottom = $slider.outerHeight() + $slider.offset().top;
        if( $(document).scrollTop() > sliderOffsetBottom ) {
          fotorama.stopAutoplay();
        } else {
          fotorama.startAutoplay();
        }
      }

      // Resize slider to fit image + caption
      var sliderResize = function($slider) {

        // return false if we don't need to resize
        if(!hasCaptions) {
          return false;
        }

        var $activeStage = $slider.find(".fotorama__active");
        var $bannerContent = $activeStage.find(".fotorama--caption");
        var descriptionHeight = 0;
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // check if content exists
        if($bannerContent.length > 0) {
          console.log("found caption");
          descriptionHeight = $bannerContent.outerHeight();
          console.log(descriptionHeight);
        }

        // revert descriptionHeight to 0 if bigger than breakpoint
        if(windowWidth > sliderBreakpoint) {
          descriptionHeight = 0;
        }

        // add it all together
        var imageHeight = $activeStage.find(".fotorama--image").height();
        var sceneHeight = descriptionHeight + imageHeight;
        $slider.find(".fotorama__stage").height(sceneHeight);

      }

      // fotorama:ready doesn't seem to be working, lets timeout instead :(
      setTimeout(function(){
        sliderResize($slider);
        toggleAutoplay($slider);
      }, 800);

      $slider.on("fotorama:ready", function(){
        sliderResize($slider);
        toggleAutoplay($slider);
      });

      $slider.on("fotorama:load", function(){
        sliderResize($slider);
        toggleAutoplay($slider);
      });

      $slider.on("fotorama:show", function(){
        sliderResize($slider);
        toggleAutoplay($slider);
      });

      $slider.on("fotorama:showend", function(){
        sliderResize($slider);
        toggleAutoplay($slider);
      });

      $(window).on("resize", function(){
        sliderResize($slider);
        toggleAutoplay($slider);
      });

      $(window).on("scroll", function(){
        toggleAutoplay($slider);
      });
      

    }).addClass("fotorama-initialized");

  });

}(document, window, jQuery));
