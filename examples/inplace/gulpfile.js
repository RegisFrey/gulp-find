var gulp = require('gulp');
/** REMOVE ME **/ var find = require('../../');
/** USE ME **/ // var find = require('gulp-find');

gulp.task('find', function() {
  return gulp.src('file.txt', { base : './' } )
    .pipe(find(/\'\w+\-\w+'/g))//regex
    .pipe(find('woof'))//string
    .pipe(gulp.dest('./file2.txt'));
});

gulp.task('default', ['find']);
