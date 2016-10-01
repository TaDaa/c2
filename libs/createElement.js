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
