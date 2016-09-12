var 
webpack = require('webpack'),
path = require('path'),
dir = path.resolve(__dirname,'dist');
module.exports = [
];

config('var',''),
config('commonjs2','node'),
config('amd'),
config('umd')
function config (target,optionalName) {
    optionalName = optionalName !== '' ? ('.'+(optionalName || target)) : '';
    module.exports.push({
        'entry' : {
            'app' : ['./libs/c2.js']
        },
        'output' : {
            'path' : dir,
            'libraryTarget' : target,
            'filename' : 'c2'+optionalName +'.js'
        }
    });
    module.exports.push({
        'entry' : {
            'app' : ['./libs/c2.js']
        },
        'output' : {
            'path' : dir,
            'libraryTarget' : target,
            'filename' : 'c2'+optionalName+'.min.js'
        },
        'plugins' : [
            new webpack.optimize.UglifyJsPlugin({minimize:true})
        ]
    });
}

