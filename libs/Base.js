var invalidator = require('./Invalidate.js'),
registry = require('./Registry.js');


function c2_Base () {
    this._events = {};
}

c2_Base.prototype._invalid_ = 0;
c2_Base.prototype._invalid_cleanup = invalidator.cleanup;
c2_Base.prototype._invalid_parents = invalidator.parents;
c2_Base.prototype._invalid_children_ = -1;
c2_Base.prototype._invalid_children = invalidator.children;
c2_Base.prototype.registry = registry;
c2_Base.prototype.invalidator = invalidator;
c2_Base.prototype.appendChild = c2_appendChild;
c2_Base.prototype.insertBefore = c2_insertBefore;
c2_Base.prototype.removeChild = c2_removeChild;
c2_Base.prototype.querySelector = c2_querySelector;
c2_Base.prototype.querySelectorAll = c2_querySelectorAll;
c2_Base.prototype.addEventListener = c2_addEventListener;
c2_Base.prototype.removeEventListener = c2_removeEventListener;
c2_Base.prototype.setAttribute = c2_setAttribute;
c2_Base.prototype.getAttribute = c2_getAttribute;
c2_Base.prototype.removeAttribute = c2_removeAttribute;
c2_Base.prototype.render = c2_Base.prototype.oninvalid =c2_Base.prototype.ontock = c2_Base.prototype.ontick = undefined;
c2_Base.prototype.invalidate = c2_invalidate;
//c2_Base.prototype.invalidate2 = c2_invalidate2;
c2_Base.prototype._events = undefined;



function c2_appendChild (drawable) {
    drawable.parentNode && drawable.parentNode.removeChild(drawable);
    var result = this.children && (drawable.parentIndex=this.children.push(drawable)-1,drawable.parentNode=this,drawable) || null;
    if (this._invalid_ === 0 && result !== null) {
        this.invalidate();
    }
    return result;
}


function c2_insertBefore (drawable,referenceNode) {
    if (drawable.parentNode) {
        drawable.parentNode.removeChild(drawable);
    }

    var 
    children = this.children,
    index = -1;

    if (children) { 
        if (referenceNode && referenceNode.parentNode === this) {
            index = children.indexOf(referenceNode);
        }
        if (index !== -1) {
            drawable.parentIndex = index;
            children.splice(index,0,drawable);
        } else {
            drawable.parentIndex = children.push(drawable) - 1;
        }
        drawable.parentNode=this;
    } else {
        drawable = null;
    }
    if (drawable && this._invalid_ === 0) {
        this.invalidate();
    }
    return drawable;
}


function c2_removeChild (drawable) {
    if (drawable.parentNode !== this) {
        return;
    } 

    if (this._invalid_children_ === -1) {
        this._invalid_children_ = drawable.parentIndex|0;
        this._invalid_children[this._invalid_children.index++]=this;
    }
    if (this._invalid_children_ > drawable.parentIndex) {
        this._invalid_children_ = drawable.parentIndex;
    }

    this.children[drawable.parentIndex] = undefined;
    drawable.parentIndex = -1;
    drawable.parentNode = undefined;

    if (this._invalid_ === 0 && result !== null) {
        this.invalidate();
    }
    return drawable;
}


function c2_querySelector (selector) {
    var children = this.children,
    child,
    result;
    if (children) {
        for (var i=0,ln=children.length;i<ln;i++) {
            if (child = children[i]) {
                if (child._c2_proto === selector) {
                    return child;
                } else if (child.children && child.children.length) {
                    result = c2_querySelector.call(child,selector);
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }
    return null;
}


function c2_querySelectorAll (selector,passThrough) {
    var children = this.children,
    child,
    result = passThrough || [];
    if (children) {
        for (var i=0,ln=children.length;i<ln;i++) {
            if (child = children[i]) {
                child._c2_proto === selector && result.push(child);
                (child.children && child.children.length) && c2_querySelectorAll.call(child,selector,result);
            }
        }
    }
    return result;
}


function c2_addEventListener (name,listener) {
    var events = this._events;

    events[name] && events[name].push(listener) || (events[name] = [listener]);
    return true;
}


function c2_removeEventListener (name,listener) {
    var events = this._events[name],
    index = events ? events.indexOf(listener) : -1;
    return index !== -1 && (events.splice(index,1),true);
}

function c2_setAttribute (name,value) {
    //(this.parentNode && this.parentNode.children[0] === this) && (window.start=new Date()) || (this.parentNode && this.parentNode.children[this.parentNode.children.length-1] === this && (console.error(new Date() - window.start)));
    var k = name,v=value;
    this[k] = v;
    this._invalid_ === 0 && (this.invalidate());
}
function c2_getAttribute (name) {
    return this[name];
}
function c2_removeAttribute (name) {
    this[name] = undefined;
    this._invalid_ === 0 && (this.invalidate());
}

function c2_invalidate () {
    if (this._invalid_ === 0) {
        this._invalid_cleanup[this._invalid_cleanup.index++]=this;
        this._invalid_ = 1;

        if (this.parentNode.__changed__ !== undefined) {
            (this.parentNode._invalid_ === 0) && this.parentNode.invalidate();
            this.parentNode.__changed__.push(this);
        } else {
            this.parentNode.__changed__ = [this];
            (this.parentNode._invalid_ === 0) && this.parentNode.invalidate();
        }
    }
}

c2_invalidate.compiled = c2_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1);

/*
 *function c2_invalidate2 (n) {
 *    if (n._invalid_ === 0) {
 *        n._invalid_cleanup[n._invalid_cleanup.index++]=n;
 *        n._invalid_ = 1;
 *
 *        if (n.parentNode.__changed__) {
 *            (n.parentNode._invalid_ === 0) && n.parentNode.invalidate();
 *            n.parentNode.__changed__.push(n);
 *        } else {
 *            n.parentNode.__changed__ = [n];
 *            (n.parentNode._invalid_ === 0) && n.parentNode.invalidate();
 *        }
 *    }
 *}
 *c2_invalidate2.compiled = c2_invalidate2.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1);
 */

module.exports = c2_Base;
