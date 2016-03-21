# gulp-find 
[![NPM version][npm-image]][npm-url] 
[![Build status][travis-image]][travis-url]

## Overview
Simple text finder(files, streams) via gulp.


### Install

```shell
npm install --save-dev gulp-find
```

### Usage

##### Regex find

```javascript
var find = require('gulp-find');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(find(/foo(.{3})/g))
    .pipe(gulp.dest('build/file.txt'));
});
```

##### String find

```javascript
var find = require('gulp-find');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(find('bar'))
    .pipe(gulp.dest('build/file.txt'));
});
```
##### What if I need replace?

Use [gulp-replace][1] for string replace.

if you need first find, and replace after, you may combine `gulp-find` and `gulp-replace` via pipe

[1]:https://github.com/lazd/gulp-replace
