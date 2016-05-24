var iconfont    = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var gulp        = require('gulp');
var merge       = require('merge-stream');
var clean       = require('gulp-clean');

var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var nodemon     = require('nodemon');
var webpackS     = require('webpack-stream');
var header      = require('gulp-header');

var plumber     = require('gulp-plumber');
var sourcemaps  = require('gulp-sourcemaps');
var webpack     = require("webpack");
var config      = require('./app/content/content');
var banner      = [
  '/*',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * Compiled on '+new Date(),
  ' */',
  ''
].join('\n');
var pkg         = require('./package.json');

gulp.task('icon-build', function(){
  var icon = gulp.src(['./app/icons/*.svg'])
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
        timestamp: Math.round(Date.now()/1000) // recommended to get consistent builds when watching files
        }))
    .on('glyphs', function(glyphs, options) {
          // CSS templating, e.g.
          console.log(glyphs, options);
          })
    .pipe(gulp.dest('temp_icons'));

  var iconPipe = gulp.src(['./temp_icons/*.eot','./temp_icons/*.svg','./temp_icons/*.ttf','./temp_icons/*.woff' ])
    .pipe(gulp.dest('public/fonts/icons'));

  var sassPipe = gulp.src(['./temp_icons/sass/*.scss'])
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('app/sass/components/'));

  return merge (icon, iconPipe, sassPipe);

});


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

gulp.task('icon', ['icon-build'], function () {
  gulp.src('temp_icons', {read: false, force: true})
    .pipe(clean());
});

gulp.task('js', function() {
  return gulp.src('app/scripts/app.js')
    .pipe(webpackS({
      resolve: {
        modulesDirectories: ["bower_components", "node_modules"]
      },
      plugins: [
          new webpack.ResolverPlugin(
              new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
          ),
          new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
        //   new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     // compress: {
        //     //   // sequences: true,
        //     //   // dead_code: true,
        //     //   // conditionals: true,
        //     //   // booleans: true,
        //     //   // unused: false,
        //     //   // if_return: true,
        //     //   // join_vars: true,
        //     //   drop_console: true
        //     // },
        //     mangle: {
        //       except: ['$super', '$', 'exports', 'require']
        //     },
        //     output: {
        //       comments: false
        //     }
        // })
      ],
      output: {
        filename: 'all.min.js',
      },
    }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('sass',function(){
  return gulp.src('./app/sass/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});


gulp.task('default', ['nodemon', 'sass', 'js'], function () {
  browserSync.init(null, {
        proxy: "http://localhost:"+config.config.port
    });
  gulp.watch('./app/icons/*.svg', ['icon'])
});



