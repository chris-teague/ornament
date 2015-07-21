/*jslint browser: true, indent: 2, todo: true, unparam: true */
/*global jQuery,Ornament /*/

// http://www.scriptiny.com/2012/09/jquery-input-textarea-limiter/
(function($) {
  $.fn.extend( {
    limiter: function(limit, elem, isMicro) {
      isMicro = isMicro || false;
      $(this).on("keyup focus", function() {
        setCount(this, elem);
      });
      function setCount(src, elem) {
        var chars = src.value.length;
        if (chars > limit) {
          src.value = src.value.substr(0, limit);
          chars = limit;
        }
        if(isMicro) {
          elem.html( chars + "/" + limit );
        } else {
          elem.html( limit - chars + " left");
        }
      }
      setCount($(this)[0], elem);
    }
  });
})(jQuery);

(function (document, window, $) {

  "use strict";

  $(document).on("ornament:refresh", function () {

    $("[data-limiter]").each(function(i,elem) {
      // only apply if the element is found
      var $elem = $(elem);
      var limit = $elem.data("limiter");
      var isMicro = $elem.is("[data-limiter-micro]");
      if($elem.length > 0) {
        var $charCountContainer = $("<span class='form--field-with-count--counter' />");
        var $charCountHeading = $("<div class='form--field-with-count--heading' />");
        var $charCountWrapper = $("<div class='form--field-with-count' />");

        if(isMicro) {
          $charCountWrapper.addClass("form--field-with-count__micro"); 
        } else {
          $charCountHeading.text(limit + " character limit");
        }

        if($elem.is("textarea")) {
          $charCountWrapper.addClass("form--field-with-count__textarea");
        }

        $charCountHeading.append($charCountContainer);

        $elem.wrap($charCountWrapper).before($charCountHeading);
        $elem.limiter(limit,$charCountContainer,isMicro);
      }
    });

  });

}(document, window, jQuery));