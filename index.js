'use strict';

var Transform = require('readable-stream/transform');
var rs = require('replacestream');
var isTextOrBinary = require('istextorbinary');

module.exports = function (search, options) {
  return new Transform({
    objectMode: true,
    transform: function (file, enc, callback) {
      if (file.isNull()) return callback(null, file);

      function doReplace() {
        if (file.isStream()) {
          file.contents = file.contents.pipe(rs(search));
          return callback(null, file);
        }

        if (file.isBuffer()) {
          if (search instanceof RegExp) {
            //file.contents = new Buffer(String(file.contents).replace(search));
            file.contents = new Buffer(String(file.contents).find(search));
          }
          else {
            var chunks = String(file.contents).split(search);
            var result = chunks.join(',');

            file.contents = new Buffer(result);
          }
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
