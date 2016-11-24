//module.exports = require('..')({ 
//    recursive: true,
//    transform: ['camelcase', 'ucfirst', 'basename'],
//    ignore: ['./test/**', './*.json']
//});

module.exports = require('..')('.', {recursive: true});