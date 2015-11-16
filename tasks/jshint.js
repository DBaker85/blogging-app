module.exports = {
	files: ['app/scripts/namespace.js' , 'app/scripts/controllers/*.js', 'app/scripts/classes/*.js'],
	options: {
		force: true,
		reporter: require('jshint-json'),
	    reporterOutput: 'app/test/sources/js-report.json'
	}
}
