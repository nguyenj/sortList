/*! 
 *  jQuery Sorting Order List
 *  (c) 2014 John Nguyen
 *  jnguyen.me
 *
 *  HTML markup should be
 *  ==========
 *  <ul class="sort">
 *    <li>
 *      <span class="name">John Smith</span>
 *    </li>
 *  </ul>
 *
 *  JS call
 *  ==========
 *  $('.sort').sortList();
 */

;(function($) {

  $.fn.sortList = function(options) {

    var settings = $.extend({
      sortBy: $(this).data('sort-by') || "name",
      sortOrder: $(this).data('sort-order') || "desc",
      sortGroup: $(this).data('sort-group') != undefined ? $(this).data('sort-group').toString() : true
    }, options);

    return this.each(function() {

      // define vars
      var $currentList = $(this);
      var sortBy = settings.sortBy;
      var sortOrder = settings.sortOrder;
      var sortGroup = settings.sortGroup;
      var list = { letters: [] };

      // check if the specified list exists
      // loop through each item create a letter container
      // group each item in the respective letter by the specified "sortBy"
      if ( $currentList.length ) {
        $currentList.children().each(function(i, obj) {
          var name = $(obj).find("."+sortBy).text();
          var letter = name.substring(0,1);
          if ( !(letter in list) ) {
            list[letter] = [];
            list.letters.push(letter);
          }
          list[letter].push(obj);
        });
      }

      // Sort the letters
      if ( sortOrder.toLowerCase() == "asc") {
        list.letters.sort().reverse();
      } else {
        list.letters.sort();
      }

      _tempList = [];
      $.each(list.letters, function(i, letter) {
        // If grouping is true
        if ( sortGroup ) {
          // Define letter container
          var $letterList = $('<li />', { 
            "class": "letter " + letter.toLowerCase(),
            "text": letter
          });
          var $letterListContainer = $('<ul />');
        }

        // Sort items in each letter list
        list[letter].sort(function(a, b) {
          if ( $(a).find('.name').text() < $(b).find('.name').text() ) {
            if ( sortOrder.toLowerCase() == "asc" )  {
              return 1;
            } else {
              return -1;
            }
          }
          return 0;
        });

        $.each(list[letter], function(i, items) {
          // If grouping is false
          if ( !sortGroup ) {
            _tempList.push($(items));
          } else {
            $letterListContainer.append(items);
          }
        });

        // If grouping is true
        if ( sortGroup ) {
          $letterList.append($letterListContainer);
          _tempList.push($letterList)
        }
      });

      // Append the new list to the specified list container
      $currentList.empty().append(_tempList);

    });
  }

  $(function() {
    $('.sort').sortList();
  });

})(jQuery);


