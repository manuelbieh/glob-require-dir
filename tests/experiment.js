// const direx = require('..');
const direx = require('..');

const example1 = direx('camelcase', {
    transform: ['camelcase', 'basename'],
    recursive: true,
    cwd: 'transforms'
});

const example2 = direx({
    transform: ['camelcase', 'basename'],
    recursive: true,
    cwd: 'transforms/camelcase'
});

const example3 = direx({
    transform: ['camelcase', 'basename'],
    recursive: true
});

const example4 = direx('.');

const example5 = direx(['transforms', 'options'], {
    recursive: true,
    transform: ['camelcase', 'ucfirst', 'basename'],
    // cwd: 'transforms',
    prepend: 'Wiremore',
    append: 'Controller'
});

// console.log('1', example1);
// console.log('2', example2);
// console.log('3', example3);
// console.log('4', example4);
console.log('5', example5);
process.exit();

//module.exports = {
//    example1,
//    example2
//};
