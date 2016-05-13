var alertify = require('alertify.js');

var editDelete = function(){

    this.closeEditor = function(){
      $('.js-edit-post-container').removeClass('show');
    };

    this.deletePost = function(context){
    var post = context;
    var message = "<p>Are you sure you wish to delete post:</p><h5>"+post.data("post-title")+"</h5><p>This cannot be undone</p>";

    alertify.confirm(message, function () {
      $.ajax({
        url         : '/post',
        type        : 'DELETE',
        data        : JSON.stringify({postId: post.data("post-id"), category: post.data("post-category")}),
          // format returned from server
          // dataType    : 'HTML',
            // data format to server
            contentType : 'application/json',
            complete  : function(){},
            success   : function(data){
              alertify.error("Post Deleted");
              $('.js-article-list').html(data);
            },
            error   : function(){}
        });
    }, function() {
        alertify.log("Post delete cancelled");
    });
  };

  this.fetchEditPost = function(context){
    var post = context;
      $.ajax({
        url         : '/edit-post',
        type        : 'post',
        data        : JSON.stringify({postId: post.data("post-id")}),
          // format returned from server
          // dataType    : 'HTML',
            // data format to server
            contentType : 'application/json',
            complete  : function(){},
            success   : function(data){
              // populate fields for editing and show edit page
              $('.js-edit-post .js-edit-post-editor').val(data.body);
              $('.js-edit-post .js-edit-post-title').html(data.title);
              $('.js-edit-post .js-post-id').val(data.postId);
              $('.js-edit-post .js-post-category').val(data.category);
              $('.js-edit-post .js-old-category').val(data.category);
              $('.js-edit-post-container').addClass('show');
              _createPost.markupPrev(_createPost.editPostEditor,_createPost.editSlicedPreview,_createPost.editPreviewArea);
            },
            error   : function(){}
        });

  };

  var previewArea = '.editpost .js-edit-preview-area';
  var slicedPreview = '.editpost .js-edit-preview-sliced-area';
  var articleListContainer = '.js-article-list';

  this.editPost = function(context){
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
            // edit post and clear all fields
            alertify.success("Post updated");
            form.find('input').val('');
            form.find('textarea').val('');
            if ( $(slicedPreview) ){
              $(slicedPreview).html('');
            }
            if( $(previewArea) ) {
              $(previewArea).html('');
            }
            $('.js-edit-post-container').removeClass('show');
            $(articleListContainer).html(data);
          },
          error   : function(data){
            alertify.error("An error occured: "+data);
          }
        });

      };
      $(document).on('click', '.js-delete-post-button', function(e){
    var post = $(this);
    e.preventDefault();
    this.deletePost(post);

  });

  $(document).on('click', '.js-edit-post-button', function(e){
    var post = $(this);
    e.preventDefault();
    this.fetchEditPost(post);

  });

  $( '.js-edit-post' ).on( "submit", function( event ) {
    event.preventDefault();
    this.editPost($(this));
   });

  $( '.js-close-editor' ).on( "click", function() {
    this.closeEditor();
   });

};

module.exports = new editDelete();
