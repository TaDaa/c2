const Element = require('./Element');
module.exports = class Pass extends Element {
    constructor () {
        super();
    }
    render (parentContext) {
        var events = this._events,
        tock = events && events.tock,
        tick = events && events.tick,
        context = this.context,
        children = this.children,
        i,ln,child;

        if (tick) {
            for (i=0,ln=tick.length;i<ln;i++) {
                tick[i].call(this,context);
            }
        } 
        for (var j=0,jln=children.length;j<jln;j++) {
            children[j].render(context,children[j].__data__,j);
        }

        if (tock) {
            for (i=0,ln=tock.length;i<ln;i++) {
                tock[i].call(this,context);
            }
        }
    }
}
