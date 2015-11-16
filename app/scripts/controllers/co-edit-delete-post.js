var _editDelete = require('../classes/cl-edit-delete-posts');

module.exports = function () {

	$(document).on('click', '.js-delete-post-button', function(e){
		var post = $(this);
		e.preventDefault();
		_editDelete.deletePost(post);

	});

  $(document).on('click', '.js-edit-post-button', function(e){
    var post = $(this);
    e.preventDefault();
    _editDelete.fetchEditPost(post);

  });

  $( '.js-edit-post' ).on( "submit", function( event ) {
    event.preventDefault();
    _editDelete.editPost($(this));
   });

  $( '.js-close-editor' ).on( "click", function() {
    _editDelete.closeEditor();
   });



}
