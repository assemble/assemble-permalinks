'use strict';

var path = require('path');
var indexer = require('assemble-indexer');
var assemble = require('assemble-core');
var List = assemble.List;

var permalink = require('./');
var app = assemble();

app.create('post', {
  renameKey: function(key) {
    return path.basename(key, path.extname(key));
  }
});

var index = app.view({path: 'index.hbs', content: 'index'})
  .use(permalink(':index(pagination.idx):name.html', {
    index: function(i) {
      return i ? ((i + 1) + '/') : '';
    }
  }));

app.create('archives')
  .use(indexer({view: index}));

// placeholders('/site/blog/:path', {path: 'foo-bar.md'});
app.data({base: 'dist'});
app.posts({
  'a/b/c/a.txt': {locals: {base: '_gh_posts/blog'}, content: 'aaa'},
  'a/b/c/b.txt': {locals: {base: '_gh_posts/blog'}, content: 'bbb'},
  'a/b/c/c.txt': {locals: {base: '_gh_posts/blog'}, content: 'ccc'},
  'a/b/c/d.txt': {locals: {base: '_gh_posts/blog'}, content: 'ddd'},
  'a/b/c/e.txt': {locals: {base: '_gh_posts/blog'}, content: 'eee'},
  'a/b/c/f.txt': {locals: {base: '_gh_posts/blog'}, content: 'fff'},
  'a/b/c/g.txt': {locals: {base: '_gh_posts/blog'}, content: 'ggg'},
  'a/b/c/h.txt': {locals: {base: '_gh_posts/blog'}, content: 'hhh'},
  'a/b/c/i.txt': {locals: {base: '_gh_posts/blog'}, content: 'iii'},
  'a/b/c/j.txt': {locals: {base: '_gh_posts/blog'}, content: 'jjj'}
});

var list = new List(app.posts);
var pages = list.paginate({limit: 3});

app.archives.addIndices(pages);
console.log(app.views.archives);

// var view = app.posts
//   .getView('a.txt')
//   // .getView('a/b/c/a.txt')
//   .use(permalink(':dirname/:basename'))

// console.log(view.url)
