const assert = require('assert');

const {
    camelCase,
    lcfirst,
    ucfirst,
    basename,
    lowercase,
    uppercase,
    custom
} = require('./tests/transforms');

const { recursive } = require('./tests/recursive');
const { esModules } = require('./tests/es-modules');
const { ignore, pattern, cwd, cwdAndPattern } = require('./tests/options');

assert.deepEqual(camelCase, {
    camelCase1: 'camelCase1',
    camel3case: 'camel3case',
    camelCase2: 'camelCase2'
});

assert.deepEqual(lcfirst, {
    lCFIRST: 'lCFIRST'
});

assert.deepEqual(ucfirst, {
    Ucfirst: 'Ucfirst'
});

assert.deepEqual(basename, {
    'file-1': 'file-1.js',
    'file-2': { filename: 'file-2.json' }
});

assert.deepEqual(lowercase, {
    lowercase: 'lowercase'
});

assert.deepEqual(uppercase, {
    UPPERCASE: 'UPPERCASE'
});

assert.deepEqual(custom, {
    AxBxC: 'AxBxC'
});

assert.deepEqual(recursive, {
    oneTwo: 'OneTwo',
    oneTwoThree: 'OneTwoThree'
});

assert.deepEqual(esModules, {
    module1: 'es-modules/module-1'
});

assert.deepEqual(ignore, {
    loadMe: 'load-me'
});

assert.deepEqual(pattern, {
    optionsPatternPattern: 'pattern'
});

assert.deepEqual(cwd, {
    pattern: 'pattern'
});

assert.deepEqual(cwdAndPattern, {
    patternPattern: 'pattern'
});
