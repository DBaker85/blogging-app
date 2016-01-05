var _createPost = require('../classes/cl-create-posts');


module.exports = function () {
	_createPost.saveDraft();
	_createPost.markupPrev(_createPost.postEditor,_createPost.slicedPreview,_createPost.previewArea);

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

