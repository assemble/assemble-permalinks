/*!
 * assemble-permalinks <https://github.com/jonschlinkert/assemble-permalinks>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var through = require('through2');
var utils = require('./utils');

/**
 * Expose `permalink`
 */

module.exports = function permalinksPlugin(pattern, config) {
  if (utils.isObject(pattern)) {
    config = pattern;
    pattern = null;
  }

  config = utils.merge({ regex: /:([(\w ),.]+)/ }, config);

  return function plugin(app) {

    if (!app.isView && !app.isItem) {
      app.emit('plugin', 'permalinks', this);

      app.define('permalink', function(viewPattern, data) {
        return through.obj(function(view, enc, next) {
          var structure = viewPattern || pattern;
          try {
            view.permalink(structure, data);
            var fp = path.resolve(view.data.permalink);
            view.path = path.resolve(view.base, fp);
            next(null, view);
          } catch (err) {
            next(err);
          }
        });
      });
      return plugin;
    }

    var options = utils.merge({}, config, this.options.permalinks);

    this.define('permalink', function(dest, opts) {
      if (typeof dest !== 'string') {
        opts = dest;
        dest = null;
      }

      var ctx = utils.merge({}, options, this.data, opts);
      var parse = ctx.parsePath || this.parsePath;
      var paths = copyPaths(this, parse);

      // merge in paths before context, so custom values
      // passed on the options will override parsed values
      ctx = utils.merge({}, paths, ctx);

      try {
        var fn = utils.placeholders(ctx);
        pattern = dest || ctx.pattern || ':path';

        // set the pattern on `options.permalink`
        this.options.permalink = pattern;

        // add the rendered permalink (path) to `data.permalink`
        this.data.permalink = fn(pattern, ctx);
      } catch (err) {
        err.reason = 'permalinks parsing error';
        throw err;
      }
      return this;
    });

    /**
     * Support passing the permalink pattern to the plugin
     */

    if (typeof pattern === 'string') {
      return this.permalink(pattern);
    }
  };
};

/**
 * Since views are vinyl files and paths are getters/setters,
 * we need to copy paths from `view` onto a plain object
 */

function copyPaths(view, fn) {
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
