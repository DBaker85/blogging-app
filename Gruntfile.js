module.exports = function(grunt) {
  var path = require('path');
  var theme = grunt.option('skin') || 'pink';

  // execution stats
  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    // path to task.js files, defaults to grunt dir
    configPath: path.join(process.cwd(), 'tasks'),
  })

  // writes the default skin 'pink' for compiling
  grunt.registerTask('skin', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_' + theme + '.scss";');
  });

  // skin task writes the variable from each theme defined in the sass folders for compiling
  grunt.registerTask('skindefault', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_pink.scss";');
  });
  grunt.registerTask('skinyellow', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_yellow.scss";');
  });
  grunt.registerTask('skinorange', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_orange.scss";');
  });
  grunt.registerTask('skinred', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_red.scss";');
  });
  grunt.registerTask('skinpurple', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_purple.scss";');
  });
  grunt.registerTask('skinblue', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_blue.scss";');
  });
  grunt.registerTask('skingreen', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_green.scss";');
  });
  grunt.registerTask('skingrey', function () {
    grunt.file.write('app/sass/_main-color.scss', '@import "themes/_grey.scss";');
  });


  // dev tasks
  grunt.registerTask('default', ['skin' ,'browserify','uglify','express', 'browserSync', 'watch'])
  // test tasks
  grunt.registerTask('test', ['sass:prodpink', 'concurrent:test', 'merge-json', 'jade:test', 'open']);
  // compile everything for deployment
  grunt.registerTask('build', ['skindefault','sass:prodpink','skinyellow','sass:prodyellow','skinorange','sass:prodorange','skinred','sass:prodred','skinpurple','sass:prodpurple','skinblue','sass:prodblue','skingreen','sass:prodgreen','skingrey','sass:prodgrey','postcss', 'browserify','uglify']);

};
