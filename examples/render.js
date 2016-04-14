'use strict';

var loader = require('assemble-loader');
var assemble = require('assemble-core');
var permalinks = require('..');

var app = assemble()
  .use(permalinks())
  .use(loader());

app.create('posts');
app.posts('./*.js');

app.toStream('posts')
  .pipe(app.permalink('./site/:name/index.html'))
  .pipe(app.dest('.'));

// app.posts('./*.js')
// app.pipe('posts')
//   .pipe(app.permalink('./site/:name/index.html'))
//   .pipe(app.dest('.'));

// console.log(stream)
