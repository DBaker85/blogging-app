module.exports = {

	js:{
		files: ['app/scripts/**/*.js','app/scripts/*.js'],
		tasks: ['browserify','uglify']
	},
	sass:{
		files:'app/sass/**/*.scss',
		tasks: ['skin','sass:prodpink','postcss']
	},
	server:{
		options:{
			spawn: false,
			reload: true,
		},
		files: ['app.js','Gruntfile.js','tasks/*.js','app/controllers/*.js','app/routes/*.js','app/content/*.*'],
		tasks: 'express:dev'
	},

}
