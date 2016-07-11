'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('define-property', 'define');
require('is-valid-app', 'isValid');
require('isobject', 'isObject');
require('mixin-deep', 'merge');
require('placeholders');
require('through2', 'through');
require = fn;

/**
 * Since views are vinyl files and paths are getters/setters,
 * we need to copy paths from `view` onto a plain object
 * (since most merge/extend functions won't trigger the getters otherwise)
 */

utils.copyPaths = function(view, fn) {
  var paths = {};
  paths.cwd = view.cwd;
  paths.base = view.base;
  paths.path = view.path;
  paths.absolute = path.resolve(view.path);
  paths.dirname = view.dirname;
  paths.relative = view.relative;
  paths.basename = view.basename;
  paths.extname = view.extname;
  paths.ext = view.extname;

  paths.filename = view.stem;
  paths.name = view.stem;
  paths.stem = view.stem;
  if (typeof fn === 'function') {
    fn(paths);
  }
  return paths;
}

/**
 * Expose `utils` modules
 */

module.exports = utils;
