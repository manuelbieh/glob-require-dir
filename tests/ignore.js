const direx = require('..');

const ignore = direx({
    recursive: true,
    ignore: ['folder/**'],
    cwd: 'ignore'
});

module.exports = {
    ignore
};
