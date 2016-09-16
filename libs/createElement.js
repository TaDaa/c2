var registry = require('./Registry');

module.exports = function (tag) {
    var result;
    if (typeof tag === 'string') {
        result = registry[tag|0];
    } else if (tag._isDrawable === true) {
        result = tag;
    }
    if (!result.c2_renderable) {
        //moves properties from prototype into the object instance - performance improvement for large iteration
        result.c2_renderable = result.compile();
    } 
    result = new result.c2_renderable();
    result.ownerDocument = c2;
    return result;
};

function get_c2_renderable (result) {
    return function c2_renderable () {
        var r =result,p;
         for (p in r) {
             this[p] = r[p];
         }
         if (this._constructor !== undefined) {this._constructor();}
    };
}
