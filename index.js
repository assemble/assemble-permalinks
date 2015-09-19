/*!
 * assemble-permalinks <https://github.com/jonschlinkert/assemble-permalinks>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var merge = require('mixin-deep');
var parsePath = require('parse-filepath');
var placeholders = require('placeholders');

function permalink(pattern, options) {
  options = options || {};

  return function(app) {
    var data = app.get('cache.data');
    var opts = merge({}, data, options);

    if (app.isView) {
      return toPermalink(pattern, app, opts);
    }

    return function(views) {
      if (views.isView) {
        return toPermalink(pattern, views, opts);
      }

      return function(view) {
        return toPermalink(pattern, view, opts);
      };
    };
  };
}

function toPermalink(pattern, app, options) {
  options = merge({regex: /:([(\w ),.]+)/}, options, app.options.permalinks);
  pattern = pattern || options.pattern;
  var fn = placeholders(options);

  app.permalink = function permalink(dest, opts) {
    if (typeof dest !== 'string') {
      opts = dest;
      dest = null;
    }

    var data = parsePath(this.path);
    var ctx = merge({}, options, data, opts);
    ctx.pagination = ctx.pagination || {};
    pattern = dest || ctx.pattern || pattern || ':path';
    this.data.permalink = pattern;
    this.url = fn(pattern, ctx);
    return this;
  };

  if (pattern && pattern.indexOf(':') > -1) {
    return app.permalink();
  }
  return app;
}

/**
 * Expose `permalink`
 */

module.exports = permalink;
