// 'use strict';

// var path = require('path');
// var assemble = require('assemble-core');
// var List = assemble.List;
// var permalinks = require('..');
// var app = assemble();

// app.create('post', {
//   renameKey: function(key) {
//     return path.basename(key, path.extname(key));
//   }
// });

// app.create('list')
//   .addView('archives', {path: 'index.hbs', content: 'index'})
//   .addView('archive', {path: 'archive.hbs', content: 'archive'});

// var archives = app.group('archives', app.posts, app.lists);

// // placeholders('/site/blog/:path', {path: 'foo-bar.md'});
// app.data({base: 'dist'});
// app.posts({
//   'a/b/c/a.txt': {locals: {base: '_gh_posts/blog'}, content: 'aaa'},
//   'a/b/c/b.txt': {locals: {base: '_gh_posts/blog'}, content: 'bbb'},
//   'a/b/c/c.txt': {locals: {base: '_gh_posts/blog'}, content: 'ccc'},
//   'a/b/c/d.txt': {locals: {base: '_gh_posts/blog'}, content: 'ddd'},
//   'a/b/c/e.txt': {locals: {base: '_gh_posts/blog'}, content: 'eee'},
//   'a/b/c/f.txt': {locals: {base: '_gh_posts/blog'}, content: 'fff'},
//   'a/b/c/g.txt': {locals: {base: '_gh_posts/blog'}, content: 'ggg'},
//   'a/b/c/h.txt': {locals: {base: '_gh_posts/blog'}, content: 'hhh'},
//   'a/b/c/i.txt': {locals: {base: '_gh_posts/blog'}, content: 'iii'},
//   'a/b/c/j.txt': {locals: {base: '_gh_posts/blog'}, content: 'jjj'}
// });

// archives.create('archives', {
//   all: true,
//   paginate: { limit: 3 },
//   permalinks: permalinks(':index(pagination.idx):name.html', {
//     index: function(i) {
//       return i ? `page/${i + 1}/` : '';
//     }
//   })
// });

// Object.keys(app.views.archives).forEach(function(key) {
//   var page = app.views.archives[key];
//   console.log(key);
//   console.log(page.data);
//   console.log();
// });
