
var _password = require('../classes/cl-login');

module.exports = function () {

	$( ".js-signup-form" ).on( "submit", function( event ) {
		event.preventDefault();
		console.log('signup form submitted');
		_password.createPassword($(this));
	 });

	$( ".js-login-form" ).on( "submit", function( event ) {
		event.preventDefault();
		console.log('login form submitted');
		_password.login($(this));
	 });

};
