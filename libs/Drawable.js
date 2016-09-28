var Base = require('./Base');



function c2_Drawable (render) {
    var p,
    id = this.registry.push(this)-1,
    me = this;

    this._c2_proto = this;
    this._c2_id =  id;
    this._isDrawable = true;

    if (render) {
        this.render = render;
    } else {
        console.error('trace');
        throw new Error("Render function must be provided to Drawable constructor");
    }

}
c2_Drawable.prototype = new Base();
c2_Drawable.prototype.attributes = c2_renderable_attributes;
c2_Drawable.prototype.constructor = c2_renderable_constructor;
c2_Drawable.prototype.proto = c2_renderable_proto;
c2_Drawable.prototype.compile = c2_renderable_compile;
c2_Drawable.prototype.toString = c2_renderable_toString;


function c2_renderable_attributes (attributes) {
    var p,
    cnt=0,
    setter = [],
    getter = [],
    remover = [],
    type;

    this._attributes = attributes;
    for (p in attributes) {
        type = attributes[p];
        this[p] = attributes[p].defaultValue;
        setter.push('if (n === "'+p+'" ) {this["'+p+'"]='+attributes[p].setValue+';}');
        remover.push('if (n === "'+p+'") {this["'+p+'"]=null;}');
        getter.push('if (n === "'+p+'") {return this["'+p+'"];}');
    }
    //this.setAttribute = (0,eval)('(function c2_setAttribute1 (k,b) {var n=k,v=b; (this.parentNode && this.parentNode.children[0] === this) && (window.start=new Date()) || (this.parentNode && this.parentNode.children[this.parentNode.children.length-1] === this && (console.error(new Date() - window.start))) ;' + setter.join('else ') + 'else {this[n]=v;} ' +  this.invalidate.compiled +  '})');//'(this._invalid_ === false) &&  this.invalidate() })');
    this.setAttribute = (0,eval)('(function c2_setAttribute (k,b) {var n=k,v=b; ' + setter.join('else ') + 'else {this[n]=v;} ' +  this.invalidate.compiled +  '})');//'(this._invalid_ === false) &&  this.invalidate() })');
    //this.setAttribute = (0,eval)('(function c2_setAttribute (k,b) {var n=k,v=b;this[n]=v; ' +  this.invalidate.compiled +  '})');//'(this._invalid_ === false) &&  this.invalidate() })');
    //this.setAttribute = (0,eval)('(function c2_setAttribute (k,b) {(this.parentNode && this.parentNode.children[0] === this) && (window.start=new Date()) || (this.parentNode && this.parentNode.children[this.parentNode.children.length-1] === this && (console.error(new Date() - window.start)));var n=k,v=b;this[n]=v; ' +  this.invalidate.compiled +  '})');//'(this._invalid_ === false) &&  this.invalidate() })');
    //console.error(this.setAttribute.toString());
    this.getAttribute = (0,eval)('(function (k) {var n=k;' +getter.join('else ')+' else {return this[n];}})');
    this.removeAttribute = (0,eval)('(function (k) {var n=k;' + remover.join('else ') + 'else {this[n]=null} if (this._not_invalid_) {' + this.invalidate.compiled+ '}})');

    return this;
}


function c2_renderable_constructor (fn) {
    this._constructor = fn;
    return this;
}



function c2_renderable_proto (obj) {
    var p;
    for (p in obj) {
        this[p] = obj[p];
    }
    return this;
}

function c2_renderable_compile () {
    var p,
    renderable = "(function () {";
        //"var p;",
    //these are commented because I am still tinkering with this performance wise
    //"this.render=r.render;this.setAttribute=r.setAttribute;this.getAttribute=r.getAttribute;this.removeAttribute=r.removeAttribute;",
    //this is essentially a hack to give ~50% boost in iteration over relying on prototype inheritance
    //result;
    //item;
    //renderable+=
    //for (p in this) {
        //if (p !== 'render' && p !== 'setAttribute') {
            //renderable+='this["'+p+'"]=this["'+p+'"];'
        //}
    //}
    //"for (p in this) {this[p]=this[p]}";
    //"var attributes=this._attributes;for (p in attributes) {this[p]=attributes[p].defaultValue;}"+
    var attributes = this._attributes,
    v;
    for (p in attributes) {
        v = attributes[p].defaultValue;
        renderable += 'this["'+p+'"]='+(v === '' && '""' || v) + ';';
    }
    renderable += "this._invalid_cleanup=this._invalid_cleanup;" +
        "this._invalid_parents=this._invalid_parents;" + 
        "this._invalid_children=this._invalid_children;"+
        "this._invalid_children_=-1;"+
        "this._not_invalid_=1;";

    renderable+="this._constructor && this._constructor();"+
    "})";

    result = (0,eval)(renderable);
    //console.error(result.toString());
    //console.error(result.toString());
/*
 *    var me = this;
 *    var result =function () {
 *
 *        this._invalid_cleanup = this._invalid_cleanup;
 *        this._invalid_parents = this._invalid_parents;
 *        this._invalid_children = this._invalid_children;
 *        this._invalid_children_ = -1;
 *        this._invalid_ = 0;
 *
 *        this.render = this.render;
 *        this.invalidate = this.invalidate;
 *
 *        var p,attributes = this._attributes;
 *
 *        for (p in attributes) {
 *            this[p] = attributes[p].defaultValue;
 *        }
 *
 *        this._constructor && this._constructor();
 *    };
 */

    result.prototype = this;
    return result;
};


function c2_renderable_toString () {
    return this._c2_id;
}

module.exports = c2_Drawable;
