var invalidator = require('./Invalidate.js'),
registry = require('./Registry.js');


function c2_Base () {
    this._events = {};
}

c2_Base.prototype._invalid_ = false;
c2_Base.prototype._invalid_cleanup = invalidator.cleanup;
c2_Base.prototype._invalid_parents = invalidator.parents;
c2_Base.prototype.registry = registry;
c2_Base.prototype.invalidator = invalidator;
c2_Base.prototype.appendChild = c2_appendChild;
c2_Base.prototype.insertBefore = c2_insertBefore;
c2_Base.prototype.removeChild = c2_removeChild;
c2_Base.prototype.querySelector = c2_querySelector;
c2_Base.prototype.querySelectorAll = c2_querySelectorAll;
c2_Base.prototype.addEventListener = c2_addEventListener;
c2_Base.prototype.removeEventListener = c2_removeEventListener;
c2_Base.prototype.render = c2_Base.prototype.oninvalid =c2_Base.prototype.ontock = c2_Base.prototype.ontick = undefined;
c2_Base.prototype.invalidate = c2_invalidate;
c2_Base.prototype._events = undefined;



function c2_appendChild (drawable) {
    drawable.parentNode && drawable.parentNode.removeChild(drawable);
    var result = this.children && (this.children.push(drawable),drawable.parentNode=this,drawable) || null;
    if (this._invalid_ === false && result !== null) {
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
            children.splice(index,0,drawable);
        } else {
            children.push(drawable);
        }
        drawable.parentNode=this;
    } else {
        drawable = null;
    }
    if (drawable && this._invalid_ === false) {
        this.invalidate();
    }
    return drawable;
}


function c2_removeChild (drawable) {
    var children = this.children,
    index = children ? children.indexOf(drawable) : -1,
    result = index !== -1 && (children.splice(index,1))[0] || null;
    if (this._invalid_ === false && result !== null) {
        this.invalidate();
    }
    return result;
}


function c2_querySelector (selector) {
    var children = this.children,
    child,
    result;
    if (children) {
        for (var i=0,ln=children.length;i<ln;i++) {
            child = children[i];
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
    return null;
}


function c2_querySelectorAll (selector,passThrough) {
    var children = this.children,
    child,
    result = passThrough || [];
    if (children) {
        for (var i=0,ln=children.length;i<ln;i++) {
            child = children[i];
            child._c2_proto === selector && result.push(child);
            (child.children && child.children.length) && c2_querySelectorAll.call(child,selector,result);
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


function c2_invalidate () {
    if (this._invalid_ === false) {
        var parent = this.parentNode;

        this._invalid_cleanup[this._invalid_cleanup.index++]=this;
        this._invalid_ = true;

        if (parent.__changed__) {
            (parent._invalid_ === false) && parent.invalidate();
            parent.__changed__.push(this);
        } else {
            parent.__changed__ = [this];
            (parent._invalid_ === false) && parent.invalidate();
        }
    }
}

c2_invalidate.compiled = c2_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1);


module.exports = c2_Base;
