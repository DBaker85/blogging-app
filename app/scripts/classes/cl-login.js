var passwordHandler = function () {
	this.createPassword = function(context){

		form = context;

		$.ajax({
	 		url         : form.attr('action'),
	 		type        : form.attr('method'),
	 		data        : JSON.stringify(form.serializeObject()),
	 		contentType : 'application/json',
        	complete 	: function(){},
        	success		: function(data){
        		if (!data.exists){
        			alertify.success('Password created');
        		}
                        window.location.replace('/login');
        	}
        })

	}

	this.login = function(context){

		form = context;

		$.ajax({
	 		url         : form.attr('action'),
	 		type        : form.attr('method'),
	 		data        : JSON.stringify(form.serializeObject()),
	 		contentType : 'application/json',
        	complete 	: function(){},
        	success		: function(data){
        		if(data.valid){
              alertify.success('Password valid');
        			if(data.redirect){
        				window.location.replace(data.redirect);
        			}

        		} else {
        				// alertify.closeLogOnClick(true).error('Incorrect username or password');
              alertify
                .delay(0)
                .closeLogOnClick(true)
                .error('Incorrect username or password');
                $('.js-login-form').parsley().reset();
                $('.js-login-form input').on('input', function(){
                  $('.error').trigger('click');
                })
        			}
        		}

        })

	}
}

module.exports = new passwordHandler();
