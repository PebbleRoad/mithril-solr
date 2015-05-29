'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

gulp.task('dist', function() {
  gulp.src([
      'scripts/app.js', 
      'scripts/components/Pagination.js',
      'scripts/components/SearchFacets.js',
      'scripts/components/SearchForm.js',
      'scripts/components/SearchResults.js',
      'scripts/components/SearchSelectedFacets.js'
    ])
    .pipe($.concat('mithril.solr.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('./'))
});

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