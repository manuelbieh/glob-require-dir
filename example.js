const { fileB } = require('./examples');
console.log('EXAMPLES', fileB);

const example2 = require('.')('./examples', {
    recursive: true
});
console.log('EXAMPLE2', example2);

// es6 example
// import { es2015 } from './examples';
// console.log(es2015);
