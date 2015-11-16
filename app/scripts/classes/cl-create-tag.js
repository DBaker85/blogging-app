
var createTag = function () {

    this.getTaglist = function(){
        $.ajax({
            url         : '/category-list',
            type        : 'get',
            contentType : 'application/json',
            complete    : function(){},
            success     : function(data){
                $('.js-category-list').html(data);
            },
            error       : function(){}
        })

    };
    // find skeleton div and use this as template to add categories into the form
    this.addSubcategory = function(){
        var skeleton = $('.edit-tag__subcategory-holder.skeleton').clone();
        skeleton
            .removeClass('sr-only skeleton')
            .addClass('removable')
            .appendTo('.js-subcategory-holders');
    }

    this.removeSubcategory = function(context){
        context.parents('.edit-tag__subcategory-holder').remove();
    }

	this.createTag = function(context){
		form = context;
    var subcats = [];
    // - Add subcategories to an array for processing on the backend
    $('.js-subcategory-holders .js-subcategories').each(function(){
        subcats.push(this.value);
    })
    var params = {
      category : form.find('.js-category-input').val(),
      subcategories:subcats
    }



		$.ajax({
	 		url         : form.attr('action'),
	 		type        : form.attr('method'),
	 		data        : JSON.stringify(params),
	  	  // format returned from server
	  	// dataType    : 'HTML',
        	// data format to server
        	contentType : 'application/json',
        	complete 	: function(){},
        	success		: function(data){
        		alertify.success("tag created");
        		$('.js-add-tags').find('input').val('');
                $('.js-add-tags').find('.removable').remove();
        		$('.js-category-list').html(data);

        	},
        	error		: function(data){
        		alertify.error("An error occured: "+data);
        	}
        })
        }
}

module.exports = new createTag();
