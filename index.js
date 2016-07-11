'use strict';

var path = require('path');
var permalink = require('view-permalink');
var utils = require('./utils');

module.exports = function(pattern, data) {
  return utils.through.obj(function(file, enc, next) {
    try {

      if (typeof file.use === 'function') {
        file.use(permalink(pattern, data));
      } else {
        permalink(pattern, data)(file);
      }

      var res = path.resolve(file.permalink(pattern, data));
      file.path = path.resolve(file.base, res);
      next(null, file);
    } catch (err) {
      next(err);
    }
  });
};
