const direx = require('..');

const basename = direx('./transforms/basename', {
    transform: ['basename']
});

const camelCase = direx('./transforms/camelcase', {
    transform: ['camelcase', 'basename']
});

const lcfirst = direx('./transforms/lcfirst', {
    transform: ['lcfirst', 'basename']
});

const ucfirst = direx('./transforms/ucfirst', {
    transform: ['ucfirst', 'basename']
});

const uppercase = direx('./transforms/uppercase', {
    transform: ['uppercase', 'basename']
});

const lowercase = direx('./transforms/lowercase', {
    transform: ['lowercase', 'basename']
});

const custom = direx('./transforms/custom', {
    transform: [(filename) => {
        return filename.replace('1', 'A').replace('2', 'B').replace('3', 'C').replace(/-/g, 'x');
    }, 'basename']
});

module.exports = {
    basename, camelCase, lcfirst, ucfirst, uppercase, lowercase, custom
};
