function c2 () {
}
c2.create = function c2_create (render) {
    return new this.Drawable(render);
};
c2.registry = require('./Registry');
c2.invalidator = require('./Invalidate');
c2.types = require('./Types');
c2.Base = require('./Base');
c2.Drawable = require('./Drawable');
c2.Context2d = require('./Context2d');
c2.Layer2d = require('./Layer2d');


module.exports = c2;
