

var 
createElement = require('./createElement'),
Drawable = require('./Drawable'),
types = require('./Types');




Context2d = new Drawable(c2_context_render)
.proto({
        'invalidate' : c2_context_invalidate,
        '_invalidate' : c2_context_pre_checked_invalidate,
        'createElementNS' : c2_context_createElementNS
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
    children = this.children,
    i,ln,
    child;

    if (tick) {
        for (i=0,ln=tick.length;i<ln;i++) {
            tick[i].call(this,context);
        }
    }
    for (i=0,ln=children.length;i<ln;i++) {
        (child=children[i]).render(context,child.__data__,i);
    }
    if (tock) {
        for (i=0,ln=tock.length;i<ln;i++) {
            tock[i].call(this,context);
        }
    }
}

function c2_context_createElementNS (a,b) {
    return createElement(b);
}

function c2_context_pre_checked_invalidate () {
    if (this._not_invalid_) {
        this._not_invalid_ = 0;
        this._invalid_cleanup[this._invalid_cleanup.index++] = this;
        this._invalid_parents[this._invalid_parents.index++] = this;

        !this.invalidator.t2 && this.invalidator();
    }
}
function c2_context_invalidate () {
    if (this._not_invalid_) {
        this._not_invalid_ = 0;
        this._invalid_cleanup[this._invalid_cleanup.index++] = this;
        this._invalid_parents[this._invalid_parents.index++] = this;

        !this.invalidator.t2 && this.invalidator();
    }
}

c2_context_invalidate.compiled = c2_context_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1) ; 


module.exports = function () {
    if (this._c2Context2d_) {
        return this._c2Context2d_;
    }
    var ref = c2.createElement(Context2d);
    ref.canvas = this;
    ref.context = this.getContext('2d');
    ref.ownerDocument = ref;
    this._c2Context2d_ = ref;
    ref._events = {};
    return ref;
};
