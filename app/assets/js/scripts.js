(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    /**
     * Transform input type for better UX
     */
    $('[data-type]').each(function() {
      $(this).prop('type', $(this).data('type'));
    });

    /**
     * Prevent new lines in textarea to prevent data issues in MF
     */
    $('textarea').keypress(function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });
  });

})(jQuery, window, document);
