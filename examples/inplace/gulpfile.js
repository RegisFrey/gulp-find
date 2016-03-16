var gulp = require('gulp');
/** REMOVE ME **/ var find = require('../../');
/** USE ME **/ // var find = require('gulp-find');

gulp.task('find', function() {
  // Do an in-place replace on file.txt
  return gulp.src('file.txt', { base : './' } )
    //.pipe(find('roof'))//string
    //.pipe(find(/ds.rpc.provide\('\w+\-?\w+/))
    .pipe(find(/\'\w+\-\w+'/g))
    .pipe(gulp.dest('./file2.txt'));
});

gulp.task('default', ['find']);
