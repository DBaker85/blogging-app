var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var DIR = require('../directories');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var header = require('gulp-header');
var cssnano = require('cssnano');
var banner = ['/**',
  '*',
  ' * compiled on :' + new Date(),
  '*',
  ' */',
  ''].join('\n');

var plugins = [
    
    autoprefixer({browsers: ['last 2 versions']}),
    // cssnano()
    
];

module.exports = {
    // dependencies: ['clean-css'],
    task: function () {
        return gulp.src(path.join(DIR.CONTENT,'sass', '/main.scss'))
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({
                errLogToConsole: true
                ,includePaths: [path.join(DIR.NODE_MODULES, '/bootstrap/scss')]
            }).on('error', sass.logError))
            .pipe(postcss(plugins))
            .pipe(header(banner))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(path.join(DIR.DIST,'/css')))
    }
};
