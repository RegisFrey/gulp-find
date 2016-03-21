'use strict';

var concatStream = require('concat-stream');
var findPlugin = require('../');
var fs = require('fs');
var should = require('should');
var File = require('vinyl');

describe('gulp-find.', function () {

  function makeFile(isReadFile) {

    var content;

    if (isReadFile) {
      content = fs.readFileSync('test/fixtures/helloworld.txt');
    } else {
      content = fs.createReadStream('test/fixtures/helloworld.txt');
    }

    return new File({
      path: 'test/fixtures/helloworld.txt',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: content
    });
  }

  var expected = {
    helloworld: 'test/expected/helloworld.txt',
    hellofarm: 'test/expected/hellofarm.txt'
  };

  function checkExpected(stream, fileName) {
    return stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      newFile.contents.pipe(concatStream({encoding: 'string'}, function (data) {
        data.should.equal(fs.readFileSync(fileName, 'utf8'));
        done();
      }));
    });
  }

  function checkExpectedStr(stream, fileName) {
    return stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(fs.readFileSync(fileName, 'utf8'));
      done();
    });
  }

  describe('Stream checks.', function () {

    describe('String checks.', function () {

      it('Find string', function (done) {
        var file = makeFile();
        var stream = findPlugin('world', 'person');

        checkExpected(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Find string with a function', function (done) {
        var file = makeFile();
        var stream = findPlugin('world', function () {
          return 'person';
        });

        checkExpected(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Should call function once for each find', function (done) {
        var file = makeFile();

        var replacements = [
          'cow',
          'chicken',
          'duck',
          'person'
        ];

        var stream = findPlugin('world', function () {
          return replacements.shift();
        });

        checkExpected(stream, expected.hellofarm);

        stream.write(file);
        stream.end();
      });

    });

    describe('Regex checks.', function () {

      it('Find regex', function (done) {
        var file = makeFile();
        var stream = findPlugin(/world/g, 'person');

        checkExpected(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Find regex with a function', function (done) {
        var file = makeFile();

        var stream = findPlugin(/world/g, function () {
          return 'person';
        });

        checkExpected(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Should call function once for each find', function (done) {
        var file = makeFile();

        var replacements = [
          'cow',
          'chicken',
          'duck',
          'person'
        ];
        var stream = findPlugin(/world/g, function () {
          return replacements.shift();
        });

        checkExpected(stream, expected.hellofarm);

        stream.write(file);
        stream.end();
      });

    });

  });

  describe('Buffer checks.', function () {

    describe('String checks.', function () {

      it('Find string', function (done) {
        var file = makeFile(true);
        var stream = findPlugin('world', 'person');

        checkExpectedStr(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Find string with a function', function (done) {
        var file = makeFile(true);
        var stream = findPlugin('world', function () {
          return 'person';
        });

        checkExpectedStr(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Should call function once for each find', function (done) {
        var file = makeFile(true);

        var replacements = [
          'cow',
          'chicken',
          'duck',
          'person'
        ];
        var stream = findPlugin('world', function () {
          return replacements.shift();
        });

        checkExpectedStr(stream, expected.hellofarm);

        stream.write(file);
        stream.end();
      });

    });

    describe('Regex checks.', function () {

      it('Find regex', function (done) {
        var file = makeFile(true);
        var stream = findPlugin(/world/g, 'person');

        checkExpectedStr(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Find regex with a function', function (done) {
        var file = makeFile(true);

        var stream = findPlugin(/world/g, function () {
          return 'person';
        });

        checkExpectedStr(stream, expected.helloworld);

        stream.write(file);
        stream.end();
      });

      it('Should call function once for each find', function (done) {
        var file = makeFile(true);

        var replacements = [
          'cow',
          'chicken',
          'duck',
          'person'
        ];
        var stream = findPlugin(/world/g, function () {
          return replacements.shift();
        });

        checkExpectedStr(stream, expected.hellofarm);

        stream.write(file);
        stream.end();
      });

    });

  });

  it('should trigger events on a stream', function (done) {
    //var file = new File({
    //  path: 'test/fixtures/helloworld.txt',
    //  cwd: 'test/',
    //  base: 'test/fixtures',
    //  contents: fs.readFileSync('test/fixtures/helloworld.txt')
    //});
    var file = makeFile(true);

    var stream = findPlugin('world', 'elephant')
        .on('finish', function () {
          // No assertion required, we should end up here, if we don't the test will time out
          done();
        });

    stream.write(file);
    stream.end();
  });
});
