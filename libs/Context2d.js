

var 
Drawable = require('./Drawable'),
types = require('./Types');

Context2d = new Drawable(c2_context_render)
    .proto({
        'invalidate' : c2_context_invalidate,
        'createElementNS' : c2_createElementNS
    })
    .attributes({
        'fillStyle' : types.string,
        'globalAlpha' : types.float,
        'lineWidth' : types.float,
        'strokeStyle' : types.string,
        'shadowColor' : types.string,
        'shadowBlur' : types.float,
        'shadowOffsetX' : types.float,
        'shadowOffsetY' : types.float
    });


function c2_context_render (parentContext) {
    var events = this._events,
    tock = events.tock,
    tick = events.tick,
    context = this.context,
    i,ln,
    children = this.children,
    child;

    if (tick) {
        for (i=0,ln=tick.length|0;i<ln;i++) {
            tick[i].call(this,context);
        }
    }
    for (i=0,ln=children.length|0;i<ln;i++) {
        child = children[i];
        child.render(context,child.__data__,i,child.__changed__);
    }
    if (tock) {
        for (i=0,ln=tock.length|0;i<ln;i++) {
            tock[i].call(this,context);
        }
    }
}

function c2_createElementNS (a,b) {
    var result = new this.registry[b|0]();
    result.ownerDocument = this;
    return result;
}

function c2_context_invalidate () {
    if (this._invalid_ === false) {
        this._invalid_ = true;
        this._invalid_cleanup[this._invalid_cleanup.index++] = this;
        this._invalid_parents[this._invalid_parents.index++] = this;

        if (this.invalidator.timeout === false) {
            this.invalidator.timeout = requestAnimationFrame(this.invalidator);
        }
    }
}

c2_context_invalidate.compiled = c2_context_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1) ; 


module.exports = function () {
    if (this._c2Context2d_) {
        return this._c2Context2d_;
    }
    var ref = new (Context2d.c2_renderable);
    ref.canvas = this;
    ref.context = this.getContext('2d');
    ref.children = [];
    ref.ownerDocument = ref;
    this._c2Context2d_ = ref;
    ref._events = {};
    return ref;
};
