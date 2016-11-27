const glob = require('glob');
const path = require('path');

const parentFile = module.parent.filename;
const parentDir = path.dirname(parentFile);
// prevent this file from being cached
delete require.cache[__filename];

const pathCleanup = (file) => {
    return file.replace(/^(\.{1,2}(\\|\/)){1,}/,'');
};

const transformFunctions = {
    basename(file) {
        return path.basename(file, path.extname(file));
    },
    camelcase(str) {
        return str.replace(/([\\\/_-])./ig, (s) => s.substring(1).toUpperCase());
    },
    snakecase(str) {
        return str.replace(/([A-Z])/g, ($1) => '_'+$1.toLowerCase());
    },
    ucfirst(str) {
        return str.split('').shift().toUpperCase() + str.slice(1);
    },
    lcfirst(str) {
        return str.split('').shift().toLowerCase() + str.slice(1);
    },
    uppercase(str) {
        return str.toUpperCase();
    },
    lowercase(str) {
        return str.toLowerCase();
    }
};

module.exports = (...args) => {

    let pattern = (args.length === 1 || args.length === 2) && typeof args[0] === 'string' ? args[0] : null;
    const options = args.length === 1 && typeof args[0] === 'object' ? args[0] : args[1] || {};

    const cwd = options.cwd || (options.globOptions && options.globOptions.cwd);

    const basePath = cwd ? path.resolve(parentDir, cwd) : parentDir;

    const globOptions = Object.assign({}, options.globOptions, {
        ignore: ['**/node_modules/**']
            .concat((options.globOptions || {}).ignore, options.ignore)
            .filter((ignorePattern) => typeof ignorePattern !== 'undefined'),
        nodir: true,
        cwd: basePath
    });

    const transform = options.transform || ['camelcase', 'basename'];
    const recursive = options.recurse || options.recursive;

    const ext = options.ext || options.extensions || Object.keys(require.extensions).map((ext) => ext.substring(1));
    const esModules = options.esModules === false ? false : true;

    const getFileKey = (file, transformActions) => {

        file = pathCleanup(file);
        // file = `${options.prepend ? options.prepend + '/' : ''}${file}${options.append ? '/' + options.append : 'xxx'}`;

        transformActions = transformActions || transform;

        [].concat(transformActions).forEach((t) => {

            if (typeof t === 'function') {
                file = t(file);
                return;
            }

            if (typeof transformFunctions[t] === 'function') {
                file = transformFunctions[t](file);
                return;
            }

        });

        return `${options.prepend || ''}${file}${options.append || ''}`;

    };

    pattern = pattern ? `${pattern.replace(/(\/|\\)*$/g,'')}/` : '';
    const files = glob.sync(`${pattern}${recursive ? '**/' : ''}*.{${ext}}`, globOptions);

    const filesMap = {};

    files.forEach((file) => {

        if (file !== parentFile) {

            let loadedModule = require(path.resolve(basePath, file));

            if (esModules && typeof loadedModule.default !== 'undefined') {
                loadedModule = loadedModule.default;
            }

            filesMap[getFileKey(file)] = loadedModule;

        }

    });

    return filesMap;

};
