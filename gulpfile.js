const iconfont       = require('gulp-iconfont');
const iconfontCss    = require('gulp-iconfont-css');
const gulp           = require('gulp');
const runSequence    = require('run-sequence');
const clean          = require('gulp-clean');
const replace        = require('gulp-replace');
const gutil          = require('gulp-util');
const browserSync    = require('browser-sync').create();

const sass           = require('gulp-sass');
const nodemon        = require('nodemon');
const uglify         = require('gulp-uglify');
const header         = require('gulp-header');
const concat         = require('gulp-concat');
const postcss        = require('gulp-postcss');

const autoprefixer   = require('autoprefixer');
const plumber        = require('gulp-plumber');
const sourcemaps     = require('gulp-sourcemaps');
const mainBowerFiles = require('main-bower-files');
const config         = require('./app/content/content');
const sassdoc        = require('sassdoc');

const rename         = require("gulp-rename");
const babel          = require('gulp-babel');
const pug            = require('gulp-pug');
const jsdoc          = require('gulp-jsdoc3');
const banner         = [
  '/*',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * Compiled on '+new Date(),
  ' */',
  ''
].join('\n');
const pkg         = require('./package.json');

gulp.task('icon-build', function(){
  return icon = gulp.src(['./app/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'Icons',
      path: 'app/icons/template/icon.scss',
      targetPath: 'sass/_c-icons.scss',
      fontPath: 'temp_icons'
      }))
    .pipe(iconfont({
        fontName: 'Icons', // required
        prependUnicode: true, // recommended option
        formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
        normalize:true,
        fontHeight: 1001,
        timestamp: Math.round(Date.now()/1000) // recommended to get consistent builds when watching files
        }))
    .on('glyphs', function(glyphs, options) {
          // CSS templating, e.g.
          console.log(glyphs, options);
          })
    .pipe(gulp.dest('temp_icons'));


});

gulp.task('pipe-icons', function () {
  return gulp.src(['./temp_icons/*.eot','./temp_icons/*.svg','./temp_icons/*.ttf','./temp_icons/*.woff' ])
    .pipe(gulp.dest('public/fonts/icons'));
})

gulp.task('pipe-sass', function () {
  return gulp.src(['./temp_icons/sass/_c-icons.scss'])
    .pipe(replace('temp_iconsIcons', '../fonts/icons/Icons'))
    .pipe(gulp.dest('app/sass/components/'));
})

gulp.task('clean-icons', function () {
  return gulp.src('temp_icons', {read: false, force: true})
    .pipe(clean())
    .pipe(browserSync.stream());
})




gulp.task('nodemon', function (cb) {

  var started = false;
  return nodemon({
    script: './app.js',
    watch: [
        './app/routes/*.js',
        './app/controllers/*.js',
        './app/content/*.*',
        './app.js',
        './gulpfile.js'
      ],
    ignore: './public/*'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});


// main tasks to be run

gulp.task('icon',function (callback) {
  runSequence('icon-build',
              ['pipe-icons', 'pipe-sass'],
              'clean-icons',
              callback)
});

gulp.task('js', function() {
  return gulp.src(['./app/scripts/app.js','./app/scripts/values/*.js','./app/scripts/filters/*.js','./app/scripts/factories/*.js','./app/scripts/directives/*.js','./app/scripts/controllers/*.js'])
    .pipe(plumber({
        errorHandler: function(err){
          gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
          this.emit('end');
        }
      }))
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe( sourcemaps.init() )
    .pipe(uglify())
    .pipe( sourcemaps.write('.') )
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('public/scripts/'))
    .pipe(browserSync.stream());
});

gulp.task('admin-build-js', function() {
  return gulp.src(['./bower_components/AdminLTE/dist/js/app.min.js'])
    .pipe(plumber({
        errorHandler: function(err){
          gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
          this.emit('end');
        }
      }))
    .pipe(rename('admin.js'))
    .pipe( sourcemaps.init() )
    .pipe(uglify())
    .pipe( sourcemaps.write('.') )
    .pipe(gulp.dest('public/scripts/'))
});

gulp.task('admin-build-css', function() {
  return gulp.src(['./bower_components/AdminLTE/bootstrap/css/bootstrap.min.css','./bower_components/AdminLTE/dist/css/AdminLTE.min.css','./bower_components/AdminLTE/dist/css/skins/skin-red.min.css'])
  .pipe(plumber({
      errorHandler: function(err){
        gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
        this.emit('end');
      }
    }))
    .pipe(concat('admin.css'))
    .pipe( sourcemaps.write('.') )
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
      .pipe(plumber({
        errorHandler: function(err){
          gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
          this.emit('end');
        }
      }))
      .pipe(concat('vendors.js'))
      //.pipe(uglify())
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('public/scripts'))
      .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src('./app/sass/main.scss')
      .pipe(plumber({
        errorHandler: function(err){
          gutil.log(gutil.colors.red(err.name)+' in plugin '+gutil.colors.magenta(err.plugin)+' : '+err.message);
          this.emit('end');
        }
      }))
      .pipe( sourcemaps.init() )
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
      .pipe( sourcemaps.write('.') )
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('public/css'))
      .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('pug',function(){
  return gulp.src('./app/views/_templates/*.pug')
    .pipe(plumber())
    .pipe(pug({
      'pretty' : true,
      'locals' : {'widgetID' :config.Twitter.widgetID}
    }))
    .pipe(gulp.dest('./public/templates'))
    .pipe(browserSync.stream());

});

gulp.task('sassdoc', function () {
  var options = {
    dest: 'docs',
    verbose: true,
  };
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sassdoc(options));
});


gulp.task('doc', function (cb) {
  var config = {
    destination : './jsdoc',
    template : "node_modules/ink-docstrap/template",
    configure : {
        "tags": {
          "allowUnknownTags": true
        },
        "plugins": ["plugins/markdown"],
        "templates": {
          "logoFile": "",
          "cleverLinks": false,
          "monospaceLinks": false,
          "dateFormat": "ddd MMM Do YYYY",
          "outputSourceFiles": true,
          "outputSourcePath": true,
          "systemName": "DocStrap",
          "footer": "",
          "copyright": "DocStrap Copyright © 2012-2015 The contributors to the JSDoc3 and DocStrap projects.",
          "navType": "vertical",
          "theme": "Superhero",
          "linenums": true,
          "collapseSymbols": false,
          "inverseNav": true,
          "protocol": "html://",
          "methodHeadingReturns": false
        },
        "markdown": {
          "parser": "gfm",
          "hardwrap": true
        }
      }

    }

    gulp.src(['readme.md', './app/scripts/app.js' ,'./app/scripts/**/*.js'], {read: true})
        .pipe(jsdoc(config, cb));
});

gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('bower-watch', ['bower'], browserSync.reload);
gulp.task('icon-watch', ['icon'], browserSync.reload);
gulp.task('pug-watch', ['pug'], browserSync.reload);


/*
  Default task that builds everything and serves the local instance
*/

gulp.task('default', ['icon', 'pug' ,'sass', 'bower', 'js','nodemon'], function () {
  browserSync.init(null, {
        proxy: "http://localhost:"+config.config.port
    });
  gulp.watch('./app/icons/*.svg', ['icon-watch']);
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/scripts/**/*.js', ['js-watch']);
  gulp.watch('bower.json', ['bower-watch']);
  gulp.watch('./app/views/**/*.pug', ['pug-watch']);
});
