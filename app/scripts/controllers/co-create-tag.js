var _createTag = require('../classes/cl-create-tag');


module.exports = function () {

  $('.js-add-subcategory').on('click', function(){
    _createTag.addSubcategory();
  });

  $(document).on('click', '.js-remove-subcategory', function(){
    _createTag.removeSubcategory($(this));
  })

	$( '.js-add-tags' ).on( 'submit', function( event ) {
		event.preventDefault();
		_createTag.createTag($(this));
	 });

  $('.js-tag-tab').on('click', function(){
    _createTag.getTaglist();
  })

};
