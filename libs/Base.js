const invalidator = require('./Invalidate'),
registry = require('./Registry'),
animate = require('./Animate');

class Base {
    constructor () {
        this.children = this.childNodes = [];
        this._invalid_children_ = -1;
        this._invalid_children = invalidator.children;

        this._not_invalid_ = 1;
        this._invalid_cleanup = invalidator.cleanup;
        this._invalid_parents = invalidator.parents;
        this.registry = registry;
        this.invalidator = invalidator;
    }

    appendChild (element) {
        var children;

        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }

        children = this.children;

        element.parentIndex=children.push(element)-1;
        element.parentNode = this;

        if (this._not_invalid_) {
            this.invalidate();
        }
        return element;
    }

    insertBefore (element,referenceNode) {
        var children,
        index;

        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }

        children = this.children;
        index = -1;

        if (referenceNode && referenceNode.parentNode === this) {
            index = children.indexOf(referenceNode);
        }
        if (index !== -1) {
            element.parentIndex = index;
            children.splice(index,0,element);
        } else {
            element.parentIndex = children.push(element) - 1;
        }
        element.parentNode=this;

        if (this._not_invalid_) {
            this.invalidate();
        }
        return element;
    }

    removeChild (element) {
        if (element._c2_transition) {
            animate.remove(element);
        }

        if (element.parentNode !== this) {
            return undefined;
        } 


        if (this._invalid_children_ === -1) {
            this._invalid_children_ = element.parentIndex|0;
            this._invalid_children[this._invalid_children.index++]=this;
        }
        if (this._invalid_children_ > element.parentIndex) {
            this._invalid_children_ = element.parentIndex;
        }

        if (this.children) {
            this.children[element.parentIndex] = undefined;
            element.parentIndex = -1;
            element.parentNode = undefined;
        }

        if (this._not_invalid_) {
            this.invalidate();
        }
        return element;
    }

    // TODO support better queries
    querySelector (selector) {
        var children = this.children,
        child,
        result;
        if (children) {
            for (var i=0,ln=children.length;i<ln;i++) {
                if (child = children[i]) {
                    if (child.constructor === selector) {
                        return child;
                    } else if (child.children && child.children.length) {
                        result = child.querySelector(selector);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
        }
        return null;
    }

    querySelectorAll (selector,passThrough) {
        var children = this.children,
        child,
        result = passThrough || [];
        if (children) {
            for (var i=0,ln=children.length;i<ln;i++) {
                if (child = children[i]) {
                    child.constructor === selector && result.push(child);
                    (child.children && child.children.length) && child.querySelectorAll(selector,result);
                }
            }
        }
        return result;
    }

    addEventListener (name,listener) {
        var events = this._events;
        !events && (events = this._events = {});
        events[name] && events[name].push(listener) || (events[name] = [listener]);
        return true;
    }

    removeEventListener (name,listener) {
        var events = this._events[name],
        index = events ? events.indexOf(listener) : -1;
        return index !== -1 && (events.splice(index,1),true);
    }
    setAttribute (name,value) {
        if (this[name] !== value) {
            this[name] = value;

            if (this._not_invalid_) {
                this.invalidate();
            }
        }
        //this[name] !== value && (this[name] = value,(this.children && this._not_invalid_) && (this.parentNode && this.parentNode._not_invalid_) && (this.invalidate()));
    }
    getAttribute (name) {
        return this[name];
    }
    removeAttribute (name) {
        if (this[name] !== undefined) {
            this[name] = undefined;

            if (this._not_invalid_) {
                this.invalidate();
            }
        }
        //this[name] !== undefined && (this[name] = undefined,(this.children && this._not_invalid_) && (this.parentNode && this.parentNode._not_invalid_) && (this.invalidate()));
    }
    render () {
    }

    invalidate () {
        if (this.parentNode) { 
            if (this._not_invalid_) {
                this._invalid_cleanup[this._invalid_cleanup.index++]=this;
                this._not_invalid_ = 0;
                if (this.parentNode._not_invalid_) {
                    this.parentNode.invalidate();
                }
            }
        } else if (this._not_invalid_) {
            this._not_invalid_ = 0;
            this._invalid_cleanup[this._invalid_cleanup.index++]=this;
            this._invalid_parents[this._invalid_parents.index++]=this;
            if (!this.invalidator.scheduled_next) {
                this.invalidator();
            }
        }
    }
    /*
     *_invalidate () {
     *    if (this.parentNode) { 
     *        this._not_invalid_ && (
     *            this._invalid_cleanup[this._invalid_cleanup.index++]=this,
     *            this._not_invalid_ = 0,
     *            this.parentNode._not_invalid_ && this.parentNode._invalidate()
     *        )
     *    } else if (this._not_invalid_) {
     *        this._not_invalid_ = 0,
     *        this._invalid_cleanup[this._invalid_cleanup.index++]=this;
     *        this._invalid_parents[this._invalid_parents.index++]=this;
     *        !this.invalidator.scheduled_next && this.invalidator();
     *    }
     *}
     */
}


Base.prototype.invalidate.compiled =  Base.prototype.invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1);
//Base.prototype._invalidate.compiled =  Base.prototype._invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1);
//Base.prototype._not_invalid_ = 1;
//Base.prototype._invalid_cleanup = invalidator.cleanup;
//Base.prototype._invalid_parents = invalidator.parents;
//Base.prototype._invalid_children_ = -1;
//Base.prototype._invalid_children = invalidator.children;
//Base.prototype.registry = registry;
//Base.prototype.invalidator = invalidator;
//Base.prototype._events = undefined;

module.exports = Base;
