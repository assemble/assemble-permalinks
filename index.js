/*!
 * assemble-permalinks <https://github.com/assemble/assemble-permalinks>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var path = require('path');
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
  var args = [].slice.call(arguments);

  return function appPlugin(app) {
    if (!utils.isValid(app, 'assemble-permalinks')) {
      return collectionPlugin.apply(this, arguments);
    }

    app.define('permalink', pipeline(pattern));

    function collectionPlugin(collection) {
      if (collection.isView || collection.isItem) {
        return viewPlugin.apply(this, arguments);
      }

      if (!utils.isValid(collection, 'assemble-permalinks', ['collection', 'views'])) {
        return collectionPlugin;
      }

      collection.define('permalink', pipeline(pattern));

      collection.onLoad(/./, function(file, next) {
        if (collection.options.plural !== file.options.collection) {
          return next();
        }

        if (typeof pattern === 'string') {
          file.permalink.apply(file, args);
        }
        next();
      });

      function viewPlugin(view) {
        if (!utils.isValid(view, 'assemble-permalinks', ['view', 'item'])) {
          return;
        }

        this.define('permalink', function(dest, opts) {
          if (typeof dest !== 'string') {
            opts = dest;
            dest = null;
          }

          this.emit('permalink', this);

          var options = utils.merge({}, config, this.options.permalinks);
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
      };

      return viewPlugin;
    };

    return collectionPlugin;
  };
};

function pipeline(pattern) {
  return function(viewPattern, data) {
    return utils.through.obj(function(view, enc, next) {
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
  };
}

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
