const direx = require('..');

const ignore = direx({
    recursive: true,
    ignore: ['folder/**'],
    cwd: 'options/ignore'
});

const pattern = direx('options/pattern');

const cwd = direx({ cwd: 'options/pattern' });

const cwdAndPattern = direx('pattern', {
    cwd: 'options'
});

console.log(cwdAndPattern);

module.exports = {
    ignore,
    pattern,
    cwd,
    cwdAndPattern
};
