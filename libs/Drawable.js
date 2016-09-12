var Base = require('./Base');

function c2_Drawable (render) {
    var p,
    id = this.registry.push(this.c2_renderable = (0,eval)('(function c2_renderable () {'+
        'if (this.constructor !== this._c) {this.constructor()}'+
        '})')) - 1,
    prototype = this.c2_renderable.prototype = new Base();

    prototype._c = this.c2_renderable;
    prototype._c2_proto = this;

    this._c2_id = this.c2_renderable._c2_id =  id;
    if (render) {
        if (typeof render === 'object') {
            for (p in render) {
                prototype[p] = render[p];
            }
        } else if (typeof render === 'function') {
            this.render(render);
        }
    }
}
c2_Drawable.prototype = new Base();
c2_Drawable.prototype.attributes = c2_renderable_attributes;
c2_Drawable.prototype.constructor = c2_renderable_constructor;
c2_Drawable.prototype.render = c2_renderable_render;
c2_Drawable.prototype.proto = c2_renderable_proto;
c2_Drawable.prototype.compile = c2_renderable_compile;
c2_Drawable.prototype.toString = c2_renderable_toString;


function c2_renderable_attributes (attributes) {
    var p,
    setter = [],
    getter = [],
    remover = [],
    type;
    for (p in attributes) {
        type = attributes[p];
        setter.push('if (n === "'+p+'") {this["'+p+'"]='+type+';}');
        remover.push('if (n === "'+p+'") {this["'+p+'"]=undefined;}');
        getter.push('if (n === "'+p+'") {return this["'+p+'"];}');
    }
    this.c2_renderable.prototype.setAttribute = (0,eval)('(function (n,v) {' + setter.join('else ') + 'else {this[n]=v;}  '+'if (this._invalid_ == false) {' + this.c2_renderable.prototype.invalidate.compiled  + '}})')//'(this._invalid_ === false) &&  this.invalidate() })');
    this.c2_renderable.prototype.getAttribute = (0,eval)('(function (n) {'+getter.join('else ')+' else {return this[n];}})');
    this.c2_renderable.prototype.removeAttribute = (0,eval)('(function (n) {' + remover.join('else ') + 'else {this[n]=undefined} if (this._invalid_ === false) {' + this.c2_renderable.prototype.invalidate.compiled+ '}})');
    return this;
}


function c2_renderable_constructor (fn) {
    this.c2_renderable.prototype.constructor = fn;
    return this;
}


function c2_renderable_render (fn) {
    this.c2_renderable.prototype.render = fn;
    return this;
}

function c2_renderable_proto (obj) {
    var p,
    proto = this.c2_renderable.prototype;
    for (p in obj) {
        proto[p] = obj[p];
    }
    return this;
}

function c2_renderable_compile () {
    //do we want this?
    //optimize based on scope
}


function c2_renderable_toString () {
    return this._c2_id;
}

module.exports = c2_Drawable;
