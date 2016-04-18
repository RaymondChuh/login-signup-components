var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    globby = require('globby'),
    through = require('through2'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    eslint = require('gulp-eslint'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');
    srcPaths = {
      scripts: ['./src/**/*.jsx'],
      html: ['./*.html']
    },
    destPaths = {
      basedir: './dist/'
    };

gulp.task('connect',function () {
  connect.server({
    port: 9000,
    livereload: true
  });
});

gulp.task('clean', function(){
  gulp.src(destPaths.basedir + '/*')
      .pipe(clean());
});

gulp.task('lint', function() {
  gulp.src(srcPaths.scripts)
      .pipe(eslint());
});

gulp.task('html', function () {
  gulp.src(srcPaths.html)
      .pipe(connect.reload());
});

gulp.task('javascript', ['lint'], function () {
  // gulp expects tasks to return a stream, so we create one here.
  var bundledStream = through();

  bundledStream
    // turns the output bundle stream into a stream containing
    // the normal attributes gulp plugins expect.
    .pipe(source('login-signup-form.js'))
    .pipe(gulp.dest(destPaths.basedir))
    .pipe(connect.reload());

  // "globby" replaces the normal "gulp.src" as Browserify
  // creates it's own readable stream.
  globby(srcPaths.scripts).then(function(entries) {
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

gulp.task('watch', function () {
  gulp.watch(srcPaths.html, ['html']);
  gulp.watch(srcPaths.scripts, ['javascript']);
});


gulp.task('default', ['clean','javascript','html','connect', 'watch'], function(){
  console.log('gulp started');
});
