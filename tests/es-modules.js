const direx = require('..');

const esModules = direx('./es-modules', {
    esModules: true
});

console.log(esModules);

module.exports = {
    esModules
};
