'use strict';

var permalinks = require('./');
var assemble = require('assemble');
var app = assemble();


var page = app.page('foo', {content: '...'});
page.use(require('./permalinks')());


app.define('permalink', function(name, pattern, fn) {
  if (typeof name === 'string' && arguments.length === 1) {
    return this.permalinks[name];
  }

  this.permalinks[name] = function(file, next) {
    file.permalink = permalink(file, context);
    next();
  };
  return this;
});

app.permalink('blog', ':segs()/:bar', function(file) {

});
app.permalink('site', ':segs()/:bar', function(file) {

});

app.onLoad(/./, function(file, next) {
  app.permalink('blog')(file, function() {
    file.permalink();
    next();
  });
});
app.onLoad(/./, app.permalink('site'));


function Permalinks(options) {
  this.options = options || {};
}

Permalinks.prototype.permalink = function() {
};

function Permalink(pattern, data) {
  this.options = options || {};
}

Permalink.prototype.permalink = function() {
};


function permalinks(options) {
  return function(app) {
    var permalinks = new Permalinks();
    this.define('permalinks', permalinks);
    this.define('permalink', permalinks.permalink.bind(permalinks));
    this.permalink.__proto__ = permalinks;
  };
}
