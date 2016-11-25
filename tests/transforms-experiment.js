// const direx = require('..');
const direx2 = require('../index2');

const example1 = direx2('camelcase', {
    transform: ['camelcase', 'basename'],
    recursive: true,
    cwd: 'transforms'
});

const example2 = direx2({
    transform: ['camelcase', 'basename'],
    recursive: true,
    cwd: 'transforms/camelcase'
});

const example3 = direx2({
    transform: ['camelcase', 'basename'],
    recursive: true
});

const example4 = direx2('.');

console.log('1', example1);
console.log('2', example2);
console.log('3', example3);
console.log('4', example4);
process.exit();

module.exports = {
    example1,
    example2
};
