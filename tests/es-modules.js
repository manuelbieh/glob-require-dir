const direx = require('..');

const esModules = direx({
    esModules: true,
    cwd: 'es-modules'
});

module.exports = {
    esModules
};
