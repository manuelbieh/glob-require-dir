# glob-require-dir

Node helper module to `require()` complete directories. 

Allows you to traverse through directories and `require()` every file that can be `require()`'d. All `require()`'d files are returned as hash with customizable keys. A [minimatch](https://github.com/isaacs/minimatch) pattern can be provided as well as [node-glob](https://github.com/isaacs/node-glob#options) options.

This module was inspired by [require-dir](https://www.npmjs.com/package/require-dir) - a great module to require directories but mostly without options to modify the outcome of the require process.

## Goals of this module: 
- ✅ Destructuring support (`const { foo, bar } = require('baz');` and even `import { foo, bar } from './baz'`)
- ✅ Recursive loading of modules within a (sub)directory
- ✅ Default set of module key transformation (e.g. `camelcase` to return `my-module` as `myModule`)
- ✅ Custom transformation functions to modify keys in the generated hash.
- ✅ Basic support for ES module `export default`
- ✅ Based on [`node-glob`](https://github.com/isaacs/node-glob) with support for [node-glob options](https://github.com/isaacs/node-glob#options) and glob patterns
- ✅ Supports ignore patterns
- ✅ Small in size

## Installation

```
npm install glob-require-dir
```
or
```
yarn add glob-require-dir
```

## Examples
Given this directory structure:

```
Controllers/
├── League.js
├── Player.js
└── Team.js
```

`require('glob-require-dir')({cwd: './Controllers'})` will return the equivalent of:

```js
{ 
  League: require('./Controllers/League.js'), 
  Player: require('./Controllers/Player.js'), 
  Team: require('./Controllers/Team.js') 
}
```

The easiest and recommended way to use `glob-require-dir` is to create an `index.js` within your desired directory and add the following line:

```js
module.exports = require('glob-require-dir')();
```

You can then use `const Controllers = require('./Controllers');` to have all your controllers in your `Controllers` variable. Doing it this way you can also use [ES2015 object destructuring](http://www.2ality.com/2015/01/es6-destructuring.html):

```js
const { League, Player } = reqiure('./Controllers');
```
or as ES module:
```js
import { League, Player } from './Controllers';
```

For more examples have a look at the [`./tests`](./tests) folder.

## Usage

Require the module itself:
`const globRequireDir = require('glob-require-dir');`
it will export a function which expects 0, 1 or 2 arguments. 

- `globRequireDir()`
If no argument is given, all files from the current working dir will be loaded.

- `globRequireDir('Controllers/')`
If only one argument is specified and the argument is a **string**, it will be treated as minimatch pattern.

- `globRequireDir({ cwd: './Controllers' })`
If only one argument is specified and the argument is an **object**, it will be treated as [options](#options) object.

- `globRequireDir('Controllers/', { transform: ['uppercase'] })`
If two arguments are given, the first argument will be used as **minimatch pattern** while the second argument will be used as **options object**.

## Options

`glob-require-dir` supports a number of options. You can pass them as single or as second parameter to the `globRequireDir()` function.

### .transform [Array, String]
**Default:**: `['camelcase', 'basename']`

`glob-require-dir` uses transformer functions (or short: *transforms*) when creating the keys for the exported hash. By default the full path of a matching file will be camelCased and then basenamed (in other words: the file extension will be dropped). There are a number of supported transforms (UPPERCASE, lowercase, camelCase, snake_case, …) but you can also deactivate it completely or write your own **custom transformer functions**. Custom transformer functions take the current filename as only argument and must return the transformed key as string. 

#### Example: 
```js
globRequireDir({
  transform: [
    'basename', // get the basename of a matching file first
    (key) => key.replace(/1/g,'one') // then replace every "1" in all filenames with "one"
  ]
}); 
```

**Attention:** the order in which the transformer functions are specified matters! While `['basename', 'camelcase']` gives you `MyExample` on a file `./Controllers/my-example`, `['camelcase', 'basename']` gives you `ControllersMyExample`.

### .recursive [Boolean], 
**Default:** `false`

The `recursive` option prefixes your pattern (no matter if a custom pattern is given or not) with `**/` so that glob loads files from a folder as well as from subfolders.


### .append [String]
**Default:** `''`

Appends a string to the transformed key. 

#### Example:
```js
globRequireDir({ 
  cwd: './Controllers',
  append: 'Controller'
});
```
would yield an object like:
```js
{ 
  LeagueContoller: […], 
  PlayerContoller: […], 
  TeamContoller: […] 
}
```

### .prepend [String]
**Default:** `''`

Same as append, but prepends …

### .esModules [Boolean]
**Default:** `false`

Enabling this option makes `glob-require-dir` to look for a property `default` in the export of the required file. If a `default` export is found, this will be used as only export.

### .globOptions [Object]
**Default:** `null`

All glob options with the exception of `cwd` (which is used internally) and `nodir` (which is always `false`) will be passed 1:1 to the `glob.sync()` call.

### .ignore [Array, String]
**Default:** `['**/node_modules**']`

Shortcut to globOptions.ignore for convenience. You can specify a pattern or an array of patterns which will be ignored while loading files.

## License

MIT
