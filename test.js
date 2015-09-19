require('mocha');
var assert = require('assert');
var assemble = require('assemble');
var permalink = require('./');
var app;

describe('permalinks', function () {
  it('should support passing the plugin to the app instance:', function () {
    app = assemble();

    app.pages('a/b/aaa.txt', {content: '...'});
    app.pages('a/b/bbb.txt', {content: '...'});
    app.pages('a/b/ccc.txt', {content: '...'});

    app.use(permalink())

    app.page('a/b/c.txt', {content: '...'})
      .permalink(':name.html')

    assert(typeof app.views.pages['a/b/c.txt'].permalink === 'function');
    assert(app.views.pages['a/b/c.txt'].url === 'c.html');
  });

  it('should support passing the plugin to a collection instance:', function () {
    app = assemble();

    app.create('posts')
      .use(permalink());

    app.posts('a/b/aaa.txt', {content: '...'});
    app.posts('a/b/bbb.txt', {content: '...'});
    app.posts('a/b/ccc.txt', {content: '...'});

    app.posts.getView('a/b/aaa.txt')
      .permalink(':name.html');

    assert(typeof app.posts.getView('a/b/aaa.txt').permalink === 'function');
    assert(app.posts.getView('a/b/aaa.txt').url === 'aaa.html');
  });

  it('should support passing the plugin to a view:', function () {
    app = assemble();

    app.create('posts');

    app.posts('a/b/aaa.txt', {content: '...'});
    app.posts('a/b/bbb.txt', {content: '...'});
    app.posts('a/b/ccc.txt', {content: '...'});

    app.posts.getView('a/b/aaa.txt')
      .use(permalink())
      .permalink(':name.html');

    assert(typeof app.posts.getView('a/b/aaa.txt').permalink === 'function');
    assert(app.posts.getView('a/b/aaa.txt').url === 'aaa.html');
  });

  it('should use custom data:', function () {
    app = assemble();
    app.create('posts')
      .use(permalink())

    app.posts('a/b/aaa.txt', {content: '...'})
      .getView('a/b/aaa.txt')
      .permalink(':dirname/:foo/:baz.html', {foo: 'bar', baz: 'qux'});

    assert(typeof app.posts.getView('a/b/aaa.txt').permalink === 'function');
    assert(app.posts.getView('a/b/aaa.txt').url === 'a/b/bar/qux.html');
  });
});
