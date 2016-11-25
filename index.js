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

    const dir = (args.length === 1 || args.length === 2) && typeof args[0] === 'string' ? args[0] : parentDir;
    const options = args.length === 1 && typeof args[0] === 'object' ? args[0] : args[1] || {};

    const basePath = path.resolve(parentDir, dir);

    const globOptions = Object.assign({}, options.globOptions, {
        ignore: ['**/node_modules/**']
            .concat((options.globOptions || {}).ignore, options.ignore)
            .filter((pattern) => typeof pattern !== 'undefined'),
        nodir: true,
        cwd: basePath
    });

    const transform = options.transform || ['camelcase', 'basename'];
    const recursive = options.recurse || options.recursive;
    // const cwd = path.resolve(parentDir, (globOptions.cwd || path.dirname(module.filename)));
    const ext = options.ext || options.extensions || ['js', 'json'];
    const esModules = options.esModules === false ? false : true;

    const getFileKey = (file, transformActions) => {

        // file = path.relative(basePath, file);
        file = pathCleanup(file);
        file = `${options.prepend ? options.prepend + '/' : ''}${file}${options.append ? '/' + options.append : ''}`;

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

        return file;

    };

    // const files = glob.sync(`${basePath}/${recursive ? '**/' : ''}*.{${ext}}`, globOptions);
    const files = glob.sync(`${recursive ? '**/' : ''}*.{${ext}}`, globOptions);

    const filesMap = {};

    files.forEach((file) => {

        //const filePath = file;
        const filePath = path.resolve(path.join(basePath, file));

        if (filePath !== parentFile) {

            let loadedModule = require(filePath);

            if (esModules && typeof loadedModule.default !== 'undefined') {
                loadedModule = loadedModule.default;
            }

            // filesMap[getFileKey(filePath)] = loadedModule;
            filesMap[getFileKey(file)] = loadedModule;

        }

    });

    return filesMap;

};
