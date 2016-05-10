'use strict';

var Transform = require('readable-stream/transform');
var rs = require('replacestream');

function unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
}

module.exports = function (search, separator, dedupe) {
  var seperator = seperator || ',';
  return new Transform({
    objectMode: true,
    transform: function (file, enc, callback) {

      if (file.isNull()) return callback(null, file);

      function doSearch() {
        var result;

        if (file.isStream()) {
          file.contents = file.contents.pipe(rs(search));
        } else if (file.isBuffer()) {
          result = String(file.contents).match(search) || [];
          if(dedupe){ result = unique(result); }
          file.contents = new Buffer(result.join(separator));
        }

        return callback(null, file);
      }

      doSearch();
    }
  });
};
