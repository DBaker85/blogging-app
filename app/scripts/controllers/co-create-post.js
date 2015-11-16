var _createPost = require('../classes/cl-create-posts');


module.exports = function () {
	_createPost.markupPrev();
	_createPost.saveDraft();

	$('.js-markup-preview').on('click',function () {
		$(this).toggleClass('active');
		_createPost.markupPrev();
	});

	$('.js-markdown-preview').on('click',function () {
		$(this).toggleClass('active');
		_createPost.markdownPrev();
	});

	$( ".js-create-post" ).on( "submit", function( event ) {
		event.preventDefault();
		_createPost.createPost($(this));
	 });

};
