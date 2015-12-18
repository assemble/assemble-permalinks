require('mocha');
var assert = require('assert');
var templates = require('templates');
var permalink = require('./');
var app;

describe('permalinks', function() {
  beforeEach(function() {
    app = templates();
  });

  it('should support passing the plugin to the app instance:', function() {
    app.use(permalink());
    app.create('pages');

    var page = app.page('a/b/c.txt', {content: '...'})
      .permalink(':name.html');

    assert(typeof page.permalink === 'function');
    console.log(page.data);
    assert(page.data.permalink === 'c.html');
  });

  it('should support passing the plugin to a collection instance:', function() {
    app.create('posts')
      .use(permalink());

    app.posts('a/b/aaa.txt', {content: '...'});

    var post = app.posts.getView('a/b/aaa.txt')
      .permalink(':name.html');

    assert(typeof post.permalink === 'function');
    assert(post.data.permalink === 'aaa.html');
  });

  it('should support passing the plugin to a view:', function() {
    app.create('posts');

    app.post('a/b/aaa.txt', {content: '...'});
    app.post('a/b/bbb.txt', {content: '...'});
    app.post('a/b/ccc.txt', {content: '...'});

    var post = app.posts.getView('a/b/aaa.txt')
      .use(permalink())
      .permalink(':name.html');

    assert(typeof post.permalink === 'function');
    assert(post.data.permalink === 'aaa.html');
  });

  it('should support passing the pattern to the plugin', function() {
    app.create('posts')
      .use(permalink('foo/:name.html'));

    app.post('a/b/aaa.txt', {content: '...'});
    app.post('a/b/bbb.txt', {content: '...'});
    app.post('a/b/ccc.txt', {content: '...'});

    var post = app.posts.getView('a/b/aaa.txt');

    assert(typeof post.permalink === 'function');
    assert(post.data.permalink === 'foo/aaa.html');
  });

  it('should use custom data:', function() {
    app.create('posts')
      .use(permalink());

    var post = app.post('a/b/aaa.txt', {content: '...'})
      .permalink(':dirname/:foo/:baz.html', {foo: 'bar', baz: 'qux'});

    assert(typeof post.permalink === 'function');
    assert(post.data.permalink === 'a/b/bar/qux.html');
  });
});
