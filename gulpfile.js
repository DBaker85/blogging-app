var iconfont       = require('gulp-iconfont');
var iconfontCss    = require('gulp-iconfont-css');
var gulp           = require('gulp');
var runSequence    = require('run-sequence');
var clean          = require('gulp-clean');
var replace        = require('gulp-replace');

var browserSync    = require('browser-sync').create();
var sass           = require('gulp-sass');
var nodemon        = require('nodemon');
var uglify         = require('gulp-uglify');
var header         = require('gulp-header');
var concat         = require('gulp-concat');
var postcss        = require('gulp-postcss');

var autoprefixer   = require('autoprefixer');
var plumber        = require('gulp-plumber');
var sourcemaps     = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');
var config         = require('./app/content/content');

var pug            = require('gulp-pug');

var banner         = [
  '/*',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * Compiled on '+new Date(),
  ' */',
  ''
].join('\n');
var pkg         = require('./package.json');

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
  return gulp.src('app/scripts/app.js')
    .pipe( sourcemaps.init() )
    .pipe(uglify())
    .pipe( sourcemaps.write('.') )
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('public/scripts/'))
    .pipe(browserSync.stream());
});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
      .pipe(concat('vendors.js'))
      .pipe(uglify())
      .pipe(header(banner, { pkg : pkg } ))
      .pipe(gulp.dest('public/scripts'))
      .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src('./app/sass/main.scss')
      .pipe(plumber())
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
      'pretty' : true
    }))
    .pipe(gulp.dest('./public/templates'))
    .pipe(browserSync.stream());

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



