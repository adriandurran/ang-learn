var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	nodemon = require('gulp-nodemon'),
	stylus = require('gulp-stylus'),
  sass = require('gulp-sass'),
  gulpif = require('gulp-if'),
  gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  ngAnnotate = require('gulp-ng-annotate'),
  sourcemaps = require('gulp-sourcemaps'),
  streamify = require('gulp-streamify');

var production = process.env.NODE_ENV === 'production';

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('server/styles/**',  ['stylus']);
  gulp.watch('client/assets/ng/**',  ['ng']);
});

gulp.task('build', ['vendor', 'sass']);

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://127.0.0.1:3000',
        browser: 'google-chrome',
        files: ['client/**/*.*', 'server/styles/**'],
        port: 7000
    });
});

/*
 |--------------------------------------------------------------------------
 | Compile stylus stylesheets
 |--------------------------------------------------------------------------
 */
gulp.task('stylus', function() {
  gulp.src('server/styles/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('client/css'))
    .pipe(browserSync.stream());
});

/*
 |--------------------------------------------------------------------------
 | Compile ng assets
 |--------------------------------------------------------------------------
 */

 gulp.task('ng', function() {
  gulp.src(['client/assets/ng/module.js','client/assets/ng/**/*.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({ mangle: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/js'));
  });

/*
 |--------------------------------------------------------------------------
 | Nodemon to auto restart
 |--------------------------------------------------------------------------
 */
gulp.task('nodemon', function(cb) {
  var started = false;
  return nodemon({
    script: 'server.js'
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});

/*
 |--------------------------------------------------------------------------
 | Compile bootstrap sass stylesheets
 |--------------------------------------------------------------------------
 */
 gulp.task('sass', function() {
    gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(cssmin())
      .pipe(gulp.dest('client/css'));
  });

  /*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/bootstrap/dist/js/bootstrap.js'
    ]).pipe(concat('vendor.js'))
    .pipe(uglify({ mangle: false}))
    .pipe(gulp.dest('client/js'));
  });
