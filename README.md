# direx

Node helper module to `require()` directories. Allows you to traverse through directories and `require()` every file that can be `require()`'d. All `require()`'d files are returned as hash with customizable keys.

<!--
## Installation

`npm install direx`
-->

## Goals of this module: 
- ✅ Destructuring support (`const { foo, bar } = require('baz');` and even `import { foo, bar } from './baz'`)
- ✅ Recursive loading of modules within a (sub)directory
- ✅ Default set of module key transformation (e.g. ´camelcase` to return `my-module` as `myModule`)
- ✅ Custom transformation functions to modify module keys
- ✅ Basic support for ES2015 `export default`
- ✅ Based on `glob` with support for [glob options](https://github.com/isaacs/node-glob#options) and glob patterns
- ✅ Supports ignore patterns
- ✅ Small in size
