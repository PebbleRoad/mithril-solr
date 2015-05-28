'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();


// Server
gulp.task('connect', function() {
  $.connect.server({
    root: './',
    livereload: true,
    port: 8000
  });  
});

// Jade
gulp.task('jade', function(){

  return gulp.src(['jade/*.jade', '!jade/_*.jade'])
      .pipe($.jade({
          pretty : true
      }))
      .pipe(gulp.dest(''))
});

// Reload
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe($.connect.reload());
});

// Watch
gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./jade/*.jade'], ['jade']);
});

// Default task
gulp.task('default', ['connect', 'watch']);