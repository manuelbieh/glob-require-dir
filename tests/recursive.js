const direx = require('..');

const recursive = direx({
    recursive: true,
    cwd: 'recursive'
});

const recursivePattern = direx('**/', {
    cwd: 'recursive'
});


module.exports = {
    recursive,
    recursivePattern
};
