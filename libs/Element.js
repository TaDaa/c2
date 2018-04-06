const Base = require('./Base'),
Types = require('./Types'),
Registry = require('./Registry');

class Element extends Base {
    constructor (config={}) {
        super(config);
        const id = this._c2_id === undefined ? (this._c2_id = Registry.push(this.constructor)-1) : this._c2_id,
        render = typeof config === 'function' ? config : (config && config.render);
        var attributes = config && config.attributes;

        if (render || attributes) {
            class Temp extends this.constructor {
                constructor () {
                    super();
                }
            }
            render && (Temp.render(render));
            attributes && (Temp.attributes(attributes));
            return new Temp();
        }
        //this.render = this.render;
        //this.setAttribute = this.setAttribute;
        //this.getAttribute = this.getAttribute;
        //this.invalidate = this.invalidate;
        //this._invalidate = this._invalidate;
        //this._invalid_cleanup=this._invalid_cleanup;
        //this._invalid_parents=this._invalid_parents;
        //this._invalid_children=this._invalid_children;
        //this._invalid_children_=-1;
        //this._not_invalid_=1;
        this.ownerDocument = null;

        var p;
        attributes = this.constructor._attributes;
        for (p in attributes) {
            this[p] = attributes[p].defaultValue;
        }
        //for (p in this) {
            //this[p] = this[p]
        //}
    }
    //occurs on enter
    static apply (parent) {
        /*
         *var result;
         *if (!this.c2_renderable) {
         *    this.c2_renderable = this.compile();
         *}
         *result = new this.c2_renderable();
         *result.ownerDocument = parent;
         *return new this.c2_renderable();
         */
         //return new this();
         return new this();
    }

    //occurs on select
    static call (parent,n,i) {
        if (typeof i === 'number') {
            if (c2._$selectionAll) {
                const result = parent.querySelectorAll.call(parent,this);
                return result;
            } else if (c2._$selection) {
                return parent.querySelector.call(parent,this+'');
            }
        }
        //otherwise we are creating an instance
        //console.error(parent);
        //console.error('condition met');
        //return Function.apply.apply(this.prototype.constructor,arguments);
        //Function.call.call(this,...arguments);
        return Function.call.apply(this,arguments);
    }

    static render (render) {
        this.prototype.render = render;
        return this;
    }

    static attributes (attributes) {
        if (!attributes) {
            return this;
        } 

        !this._attributes && (this._attributes = {});

        if (this._attributes) {
            attributes = Object.assign({},this._attributes,attributes)
        }

        var p,
        setter = [],
        getter = [],
        remover = [],
        type;

        this._attributes = attributes;

        for (p in attributes) {
            type = attributes[p];
            //this.prototype[p] = attributes[p].defaultValue;
            setter.push('if (n === "'+p+'" ) {this["'+p+'"]='+attributes[p].setValue`v`+';}');
            remover.push('if (n === "'+p+'") {this["'+p+'"]=null;}');
            getter.push('if (n === "'+p+'") {return this["'+p+'"];}');
        }
        this.prototype.setAttribute = (0,eval)('(function c2_setAttribute (k,b) {var n=k,v=b; ' + setter.join('else ') + 'else {this[n]=v;} ' +  this.prototype.invalidate.compiled +  '})');//'(this._invalid_ === false) &&  this.invalidate() })');
        //this.setAttribute = (0,eval)('(function c2_setAttribute (k,b) {var n=k,v=b;this[n]=v; ' +  this.invalidate.compiled +  '})');//'(this._invalid_ === false) &&  this.invalidate() })');
        this.prototype.getAttribute = (0,eval)('(function (k) {var n=k;' +getter.join('else ')+' else {return this[n];}})');
        this.prototype.removeAttribute = (0,eval)('(function (k) {var n=k;' + remover.join('else ') + 'else {this[n]=null} if (this._not_invalid_) {' + this.prototype.invalidate.compiled+ '}})');

        return this;
    }

    static compile () {
        var p,
        result,
        renderable = "(function () {";
            var attributes = this._attributes,
            v;


            for (p in attributes) {
                v = attributes[p].defaultValue;
                renderable += 'this["'+p+'"]='+(v === '' && '""' || v) + ';';
            }
            renderable += //"this._invalid_cleanup=this._invalid_cleanup;" +
                //"this._invalid_parents=this._invalid_parents;" + 
                //"this._invalid_children=this._invalid_children;"+
                "this._invalid_children_=-1;"+
                "this._not_invalid_=1;";
                //"for (var p in this) {this[p]=this[p]}"

            //renderable+="this._constructor && this._constructor();"+
                renderable+="})";

        result = (eval)(renderable);

        result.prototype = new this();
        return result;
    }

    static _isElement () {}
    static toString () {
        this._c2_id === undefined && (this._c2_id = Registry.push(this)-1);
        return this._c2_id;
    }
};
module.exports = Element;
