const direx = require('..');

const ignore = direx('./ignore', {
    recursive: true,
    ignore: ['folder/**']
});

module.exports = {
    ignore
};
