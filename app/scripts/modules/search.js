/** This is a description of the foo function. */
var search = function () {

  this.openSearchBar = function(){
    $('.js-search').toggleClass('active');
  };

  $('.js-search-icon').on('click', function(e) {
    e.preventDefault();
    this.openSearchBar();
  });

};

module.exports = new search();
