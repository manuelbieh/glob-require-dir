const direx = require('..');

const basename = direx({
    transform: ['basename'],
    cwd: 'transforms/basename'
});

const camelCase = direx({
    transform: ['camelcase', 'basename'],
    cwd: 'transforms/camelcase'
});

const lcfirst = direx({
    transform: ['lcfirst', 'basename'],
    cwd: 'transforms/lcfirst'
});

const ucfirst = direx({
    transform: ['ucfirst', 'basename'],
    cwd: 'transforms/ucfirst'
});

const uppercase = direx({
    transform: ['uppercase', 'basename'],
    cwd: 'transforms/uppercase'
});

const lowercase = direx({
    transform: ['lowercase', 'basename'],
    cwd: 'transforms/lowercase'
});

const custom = direx({
    transform: [(filename) => {
        return filename.replace('1', 'A').replace('2', 'B').replace('3', 'C').replace(/-/g, 'x');
    }, 'basename'],
    cwd: 'transforms/custom'
});

module.exports = {
    basename,
    camelCase,
    lcfirst,
    ucfirst,
    uppercase,
    lowercase,
    custom
};
