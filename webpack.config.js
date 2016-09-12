var path = require('path');
module.exports = {
    'entry' : {
        'app' : ['./libs/c2.js']
    },
    'output' : {
        'path' : path.resolve(__dirname,'dist'),
        'libraryTarget' : 'commonjs2',
        'fileName' : 'c2.js'
    }
};
