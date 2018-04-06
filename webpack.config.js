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
        entry : {
            app : ['./libs/c2.js']
        },
        externals : {
            d3: {
                commonjs: "d3",
                commonjs2: "d3",
                amd: "d3",
                root: "d3",
                global: "d3"
            }
        },
        output : {
            path : dir,
            publicPath : '/dist/',
            library : 'c2',
            libraryTarget : target,
            filename : 'c2'+optionalName +'.js'
        },
        module : {
            loaders : [{
                loader : 'babel-loader',
                include : [path.resolve(__dirname,'libs')],
                test : /\.js?$/,
                query : {
                    plugins : ['transform-runtime'],
                    presets : ['es2015']
                }
            }]
        }
    });
    module.exports.push({
        entry : {
            app : ['./libs/c2.js']
        },
        externals : {
            d3: {
                commonjs: "d3",
                commonjs2: "d3",
                amd: "d3",
                root: "d3",
                global: "d3"
            }
        },
        output : {
            path : dir,
            publicPath : '/dist/',
            library : 'c2',
            libraryTarget : target,
            filename : 'c2'+optionalName+'.min.js'
        },
        module : {
            loaders : [{
                loader : 'babel-loader',
                include : [path.resolve(__dirname,'libs')],
                test : /\.js?$/,
                query : {
                    plugins: ['transform-runtime'],
                    presets : ['es2015']
                }
            }]
        }
        //plugins : [
            //new webpack.optimize.UglifyJsPlugin({minimize:true})
        //]
    });
}

