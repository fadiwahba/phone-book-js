/*
Steps:

1. Install gulp globally:
npm install --global gulp

2. Type the following after navigating in your project folder:
npm install gulp gulp-util gulp-sass gulp-uglify gulp-rename gulp-minify-css gulp-concat browser-sync --save-dev

3. Move this file in your project folder

4. Setup your vhosts or just use static server (see 'Prepare Browser-sync for localhost' below)

5. Type 'Gulp'
*/

'use strict';

/* Needed gulp config */
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var buildFolder = './build/';

// build fonts
gulp.task('font', function () {
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest(buildFolder + 'fonts'));
});

/* Scripts task */
gulp.task('script', function () {
  gulp.src(
      [
        /* Add your JS files here, they will be combined in this order */
        './src/scripts/vendor/jquery-1.11.2.js',
        './src/scripts/plugins.js',
        './src/scripts/main.js',

      ]
      // 'src/scripts/**/*.js'
    )
    .pipe(concat('script.js'))
    .pipe(gulp.dest(buildFolder + 'js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(buildFolder + 'js'));
});

/* Sass task */
gulp.task('sass', function () {
  gulp.src('./src/sass/styles.scss')
    .pipe(sass({
      includePaths: ['scss'].concat('neat')
    }))
    .pipe(gulp.dest(buildFolder + 'css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest(buildFolder + 'css'))
});

// build index.html
gulp.task('index', function () {
  gulp.src('./*.html')
    .pipe(gulp.dest(buildFolder));
});

/* Reload task */
gulp.task('bs-reload', function () {
  browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function () {
  browserSync.init([buildFolder + 'css/*.css', buildFolder + 'js/*.js'], {
    /*
    I like to use a vhost, WAMP guide: https://www.kristengrote.com/blog/articles/how-to-set-up-virtual-hosts-using-wamp, XAMP guide: http://sawmac.com/xampp/virtualhosts/
    */
    // proxy: 'your_dev_site.url'
    /* For a static server you would use this: */

    server: {
      baseDir: buildFolder
    }
  });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['index', 'sass', 'script', 'font', 'browser-sync'], function () {
  /* Watch scss, run the sass task on change. */
  gulp.watch(['./src/sass/*.scss', 'src/sass/**/*.scss'], ['sass'])
  /* Watch main.js file, run the scripts task on change. */
  gulp.watch(['./src/scripts/main.js'], ['script'])
  /* Watch font files, run the font task on change. */
  gulp.watch(['./src/fonts/*'], ['font'])
  /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(['*.html'], ['index', 'bs-reload']);
});