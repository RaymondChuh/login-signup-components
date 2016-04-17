var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var globby = require('globby');
var through = require('through2');
var gutil = require('gulp-util');
var babelify = require('babelify');

gulp.task('default', ['javascript'], function(){
  console.log('gulp started');
});


gulp.task('javascript', function () {
  // gulp expects tasks to return a stream, so we create one here.
  var bundledStream = through();

  bundledStream
    // turns the output bundle stream into a stream containing
    // the normal attributes gulp plugins expect.
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/'));

  // "globby" replaces the normal "gulp.src" as Browserify
  // creates it's own readable stream.
  globby(['./src/**/*.jsx']).then(function(entries) {
    // create the Browserify instance.
    var b = browserify({
      entries: entries
    });

    // pipe the Browserify stream into the stream we created earlier
    // this starts our gulp pipeline.
    b.transform(babelify, {presets: ["es2015", "react"]})
     .bundle()
     .pipe(bundledStream);
  }).catch(function(err) {
    // ensure any errors from globby are handled
    bundledStream.emit('error', err);
  });

  // finally, we return the stream, so gulp knows when this task is done.
  return bundledStream;
});
