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
        			alertify.success('password created');
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
        			if(data.redirect){
        				window.location.replace(data.redirect);
        			} 

        		} else {
        				alertify.error('incorrect username or password');
        			}
        		}
        	
        })

	}
}

module.exports = new passwordHandler();