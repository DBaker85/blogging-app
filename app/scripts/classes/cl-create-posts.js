var markdown = require('marked');
var alertify = require('alertify.js');

var createPost = function () {

  var postEditor = '.js-post-editor';
  var previewArea = '.js-preview-area';
  var slicedPreview = '.js-preview-sliced-area';
  var textMode = '.js-text-mode';
  var titleStore = localStorage.getItem("PostTitle");
  var postStore = localStorage.getItem("PostContent");
  var titleEditor = '.js-title-editor--';
  var articleListContainer = '.js-article-list';

	this.markdownPrev = function(){
		$(postEditor).on('input',function () {
			$(previewArea).html(markdown.toHTML($(postEditor).val()));
			$(slicedPreview).html(markdown.toHTML($(postEditor).val().slice(0,300)));
		});
		$(previewArea).html(markdown.toHTML($(postEditor).val()));
		$(textMode).html('Markdown');
	}


	this.markupPrev = function(){
		$(postEditor).on('input',function () {
			$(previewArea).html($(postEditor).val());
			$(slicedPreview).html($(postEditor).val().slice(0,300));
		});
		$(previewArea).html($(postEditor).val());
		$(textMode).html('Markup');
	}

	this.saveDraft = function(){

		if (titleStore){
			$(titleEditor).html(titleStore);
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
}

module.exports = new createPost();
