const Pass = require('./Pass'),
createElement = require('./createElement');

class Document extends Pass {
    constructor () {
        super()
    }
}
Document.prototype.createElement = createElement;
module.exports = Document;
