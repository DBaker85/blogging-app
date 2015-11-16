module.exports = {
	landing:{
		options: {
			pretty: true,
            debug: false
		},
		files: [ {
			expand: true,
			cwd: 'app/jade/_landing/',
			src: '*.jade',
			dest: 'public/html/landing',
			ext: '.html'
		} ]
	},
	test:{
		options: {
			pretty: true,
            debug: false,
            data: function( dest, src ) {

			    // Return an object of data to pass to templates
   				return require('../app/test/sources/temp/reports.json');
  			}
		},
		files: {
      'app/test/report.html': [ 'app/jade/_test/report.jade' ]
   	 }
	}
}
