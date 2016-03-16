'use strict';

var Transform = require('readable-stream/transform');
var rs = require('replacestream');
var isTextOrBinary = require('istextorbinary');

module.exports = function (search, options) {
  return new Transform({
    objectMode: true,
    transform: function (file, enc, callback) {
      if (file.isNull()) return callback(null, file);
      var result;

      function doReplace() {
        if (file.isStream()) {
          console.log('Debug: stream');
          file.contents = file.contents.pipe(rs(search));
          console.log(file.contents);
          return callback(null, file);
        }

        if (file.isBuffer()) {
          if (search instanceof RegExp) {
            result = String(file.contents).match(search);
          } else {
            result = String(file.contents).match(search);
          }
          file.contents = new Buffer(result.join(','));
          return callback(null, file);
        }

        callback(null, file);
      }

      if (options && options.skipBinary) {
        isTextOrBinary.isText(file.path, file.contents, function (err, result) {
          if (err) return callback(err, file);


          if (!result) {
            callback(null, file);
          } else {
            doReplace();
          }
        });

        return;
      }

      doReplace();
    }
  });
};
