# gulp-find [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]
> A string finder plugin for gulp 3

## Usage

First, install `gulp-find` as a development dependency:

```shell
npm install --save-dev gulp-find
```

Then, add it to your `gulpfile.js`:

### Regex find
```javascript
var find = require('gulp-find');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(find(/foo(.{3})/g, '$1foo'))
    .pipe(gulp.dest('build/file.txt'));
});
```
### String find
```javascript
var find = require('gulp-find');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(find('bar', 'foo'))
    .pipe(gulp.dest('build/file.txt'));
});
```
