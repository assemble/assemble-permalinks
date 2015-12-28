'use strict';

var rimraf = require('rimraf');
var assemble = require('assemble-core');
var permalinks = require('..');
var app = assemble()
app.use(permalinks());

app.task('site', function() {
  return app.src('./*.js')
    .pipe(app.permalink('./site/:name/index.html'))
    .pipe(app.dest('.'));
});

app.build('site', function(err) {
  if (err) throw err;
  console.log('done!');
});
