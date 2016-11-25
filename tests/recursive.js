const direx = require('..');

const recursive = direx({
    recursive: true,
    cwd: 'recursive'
});

module.exports = {
    recursive
};
