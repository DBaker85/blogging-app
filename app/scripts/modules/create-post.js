var markdown = require('marked');
var alertify = require('alertify.js');

var createPost = function () {

  this.postEditor = '.js-post-editor';
  this.previewArea = '.js-preview-area';
  this.previewArea = '.js-preview-sliced-area';
  this.editPostEditor = '.js-edit-post-editor';
  this.editPreviewArea = '.js-edit-preview-area';
  this.editSlicedPreview = '.js-edit-preview-sliced-area';
  this.textMode = '.js-text-mode';
  this.titleStore = localStorage.getItem("PostTitle");
  this.postStore = localStorage.getItem("PostContent");
  this.titleEditor = '.js-title-editor';
  this.articleListContainer = '.js-article-list';

  this.markdownPrev = function(editor, sliced, preview){
    $(editor).on('input',function () {
      $(preview).html(markdown.toHTML($(editor).val()));
      $(sliced).html(markdown.toHTML($(editor).val().slice(0,300)));
    });
    $(preview).html(markdown.toHTML($(editor).val()));
    $(sliced).html(markdown.toHTML($(editor).val().slice(0,300)));
    $(this.textMode).html('Markdown');

  };


  this.markupPrev = function(editor, sliced, preview){
    $(editor).on('input',function () {
      $(preview).html($(editor).val());
      $(sliced).html($(editor).val().slice(0,300));
    });
    $(preview).html($(editor).val());
    $(sliced).html($(editor).val().slice(0,300));
    $(this.textMode).html('Markup');
  };

  this.saveDraft = function(){

    if (this.titleStore){
      $(this.titleEditor).val(this.titleStore);
    }

    $(this.titleEditor).on('input',function () {
      localStorage.setItem("PostTitle", $(this.titleEditor).val());
    });

    if (this.postStore){
      $(this.postEditor).html(this.postStore);
    }

    $(this.postEditor).on('input',function () {
      localStorage.setItem("PostContent", $(this.postEditor).val());
    });
  };

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
          complete  : function(){},
          success   : function(data){
            alertify.success("Post created");
            form.find('input').val('');
            form.find('textarea').val('');
            if ( $(this.previewArea) ){
              $(this.previewArea).html('');
            }
            if( $(this.previewArea) ) {
              $(this.previewArea).html('');
            }
            $(this.articleListContainer).html(data);
            localStorage.removeItem("PostTitle");
            localStorage.removeItem("PostContent");
          },
          error   : function(data){
            alertify.error("An error occured: "+data);
          }
        });
        };



        if ($(this.postEditor).length > 0){
          this.saveDraft();
          this.markupPrev(this.postEditor,this.previewArea,this.previewArea);
        }

        $('.js-markup-preview').on('click',function () {
          $(this).toggleClass('active');
          this.markupPrev();
        });

        $('.js-markdown-preview').on('click',function () {
          $(this).toggleClass('active');
          this.markdownPrev();
        });

        $( ".js-create-post" ).on( "submit", function( event ) {
          event.preventDefault();
          this.createPost($(this));
         });

};

module.exports = new createPost();
