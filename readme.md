# assemble-permalinks [![NPM version](https://img.shields.io/npm/v/assemble-permalinks.svg?style=flat)](https://www.npmjs.com/package/assemble-permalinks) [![NPM monthly downloads](https://img.shields.io/npm/dm/assemble-permalinks.svg?style=flat)](https://npmjs.org/package/assemble-permalinks)  [![NPM total downloads](https://img.shields.io/npm/dt/assemble-permalinks.svg?style=flat)](https://npmjs.org/package/assemble-permalinks) [![Linux Build Status](https://img.shields.io/travis/assemble/assemble-permalinks.svg?style=flat&label=Travis)](https://travis-ci.org/assemble/assemble-permalinks) [![Windows Build Status](https://img.shields.io/appveyor/ci/assemble/assemble-permalinks.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/assemble/assemble-permalinks)

> Assemble plugin for easily creating permalinks (Assemble ^0.6.0)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save assemble-permalinks
```

Install with [yarn](https://yarnpkg.com):

```sh
$ yarn add assemble-permalinks
```

**HEADS UPS**

* 0.5.0 has a breaking change. It will no longer immediately run the permalink when used on a view directly.

## Usage

```js
var permalinks = require('assemble-permalinks');
var assemble = require('assemble');

var app = assemble();

// register the plugin, optionally passing a
// default permalink pattern to use as an argument
// to the plugin
app.use(permalinks());
```

**Example usage**

```js
// create a view collection
app.create('pages');

// add a page
app.page('a/b/c.txt', {content: '...'})
  .permalink(':name.html');

var page = app.pages.getView('a/b/c.txt');
console.log(page.data.permalink);
//=> 'c.html'
```

**Pipeline plugin**

```js
var posts = app.create('posts')
  .use(permalink('actual/:name/index.html'));

app.task('site', function() {
  return posts.src('*.js')
    .pipe(posts.permalink())
    .pipe(posts.dest('.'));
});

app.build('site', function(err) {
  if (err) throw err;
  console.log('done!');
});
```

## About

### Related projects

* [assemble](https://www.npmjs.com/package/assemble): Get the rocks out of your socks! Assemble makes you fast at creating web projects… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Get the rocks out of your socks! Assemble makes you fast at creating web projects. Assemble is used by thousands of projects for rapid prototyping, creating themes, scaffolds, boilerplates, e-books, UI components, API documentation, blogs, building websit")
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine… [more](https://github.com/jonschlinkert/templates) | [homepage](https://github.com/jonschlinkert/templates "System for creating and managing template collections, and rendering templates with any node.js template engine. Can be used as the basis for creating a static site generator or blog framework.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** |  
| --- | --- |  
| 26 | [doowb](https://github.com/doowb) |  
| 14 | [jonschlinkert](https://github.com/jonschlinkert) |  

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on June 17, 2017._