var markdown = require('marked');
var alertify = require('alertify.js');

var createPost = function () {

  var postEditor = '.js-post-editor';
  var previewArea = '.js-preview-area';
  var slicedPreview = '.js-preview-sliced-area';
  var editPostEditor = '.js-edit-post-editor';
  var editPreviewArea = '.js-edit-preview-area';
  var editSlicedPreview = '.js-edit-preview-sliced-area';
  var textMode = '.js-text-mode';
  var titleStore = localStorage.getItem("PostTitle");
  var postStore = localStorage.getItem("PostContent");
  var titleEditor = '.js-title-editor';
  var articleListContainer = '.js-article-list';

	this.markdownPrev = function(editor, sliced, preview){
		$(editor).on('input',function () {
			$(preview).html(markdown.toHTML($(editor).val()));
			$(sliced).html(markdown.toHTML($(editor).val().slice(0,300)));
		});
		$(preview).html(markdown.toHTML($(editor).val()));
    $(sliced).html(markdown.toHTML($(editor).val().slice(0,300)));
		$(textMode).html('Markdown');

	}


	this.markupPrev = function(editor, sliced, preview){
		$(editor).on('input',function () {
			$(preview).html($(editor).val());
			$(sliced).html($(editor).val().slice(0,300));
		});
		$(preview).html($(editor).val());
    $(sliced).html($(editor).val().slice(0,300));
		$(textMode).html('Markup');
	}

	this.saveDraft = function(){

		if (titleStore){
			$(titleEditor).val(titleStore);
		};

		$(titleEditor).on('input',function () {
			localStorage.setItem("PostTitle", $(titleEditor).val())
		});

		if (postStore){
			$(postEditor).html(postStore);
		};

		$(postEditor).on('input',function () {
			localStorage.setItem("PostContent", $(postEditor).val())
		});
	}

	this.createPost = function(context){
		form = context;

		$.ajax({
	 		url         : form.attr('action'),
	 		type        : form.attr('method'),
	 		data        : JSON.stringify(form.serializeObject()),
	  	    // format returned from server
	  	    // dataType    : 'HTML',
        	// data format to server
        	contentType : 'application/json',
        	complete 	: function(){},
        	success		: function(data){
        		alertify.success("Post created");
        		form.find('input').val('');
        		form.find('textarea').val('');
        		if ( $(slicedPreview) ){
        			$(slicedPreview).html('');
        		};
        		if( $(previewArea) ) {
        			$(previewArea).html('');
        		};
        		$(articleListContainer).html(data);
        		localStorage.removeItem("PostTitle");
        		localStorage.removeItem("PostContent");
        	},
        	error		: function(data){
        		alertify.error("An error occured: "+data);
        	}
        })
        }

        /*
          Make local variables accessible outside
         */
        this.postEditor        = postEditor;
        this.previewArea       = previewArea;
        this.slicedPreview     = slicedPreview;
        this.editPostEditor    = editPostEditor;
        this.editPreviewArea   = editPreviewArea;
        this.editSlicedPreview = editSlicedPreview;
}

module.exports = new createPost();
