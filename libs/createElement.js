const registry = require('./Registry');

module.exports = function (tag) {
    var result;
    if (typeof tag === 'string') {
        result = registry[tag|0];
    } else {
        result = tag;
    }
    result = new result();
    result.ownerDocument = this;
    return result;
};
