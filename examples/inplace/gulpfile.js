var gulp = require('gulp');
/** REMOVE ME **/ var find = require('../../');
/** USE ME **/ // var find = require('gulp-find');

gulp.task('find', function() {
  // Do an in-place replace on file.txt
  return gulp.src('file.txt', { base : './' } )
    .pipe(find('roof'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['find']);
