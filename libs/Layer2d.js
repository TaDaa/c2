var Drawable = require('./Drawable.js'),
types = require('./Types');

module.exports =  new Drawable()
.constructor(function () {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.children = [];
    this._events = {};
})
.attributes({
        'x' : types.int,
        'y' : types.int,
        'width' : types.int,
        'height' : types.int
})
.render(function (parentContext,d,ix,changed) {
    var events = this._events,
    context = this.context,
    tock = events.tock,
    tick = events.tick,
    i,ln,
    children = this.children,
    child;

    if (this.width && this.width !== this.canvas.width) {
        this.canvas.width = this.width;
    }
    if (this.height && this.height !== this.canvas.height) {
        this.canvas.height = this.height;
    }


    if (tick) {
        for (i=0,ln=tick.length|0;i<ln;i++) {
            tick[i].call(this,context);
        }
    }
    if (this._forced || (changed && changed.length)) {
        this._forced && (this._forced = false);
        for (i=0,ln=children.length|0;i<ln;i++) {
            child = children[i];
            child.render(context,child.__data__,i,child.__changed__);
        }
    }

    if (tock) {
        for (i=0,ln=tock.length|0;i<ln;i++) {
            tock[i].call(this,context);
        }
    }

    parentContext.drawImage(this.canvas,this.x|0,this.y|0);
})
.proto({
        'forceUpdate' : function () {
            this._forced = true;
        }
});
