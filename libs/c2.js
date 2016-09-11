
function c2 () {
    var registry = [],
    invalid_parents = [],
    invalid_cleanup = [];


    c2._invalid_timeout = false;

    invalid_cleanup.index = 0;
    invalid_parents.index = 0;

    c2.types = {
        'int' : 'v|0',
        'float' : '+v',
        'string' : 'v',
        'object' : 'v',
        'array' : 'v',
        'any' : 'v'
    };

    //invalid_cleanup_index=0;

    //parent invalid..ontick...each child needs to be rendered
    //any children marked _invalid_ are checked for children


    c2.do_invalidate = function do_invalidate () {
        var parents = invalid_parents,
        cleanup = invalid_cleanup,
        i,ln,
        item;

        c2._invalid_timeout = false;

        for (i=0,ln=parents.length;i<ln;i++) {
            parents[i].render();
        }

        for (i=0,ln=cleanup.length;i<ln;i++) {
            item = cleanup[i];
            item._invalid_ = false;
            if (item.__changed__ !== undefined) {
                item.__changed__.length = 0;
                //item.__changed__ = undefined;
            }
        }

        //parents.length = cleanup.length=0;
        //invalid_parents = [];
        //invalid_cleanup = [];

        parents.index = cleanup.index  = 0;
    };


    function c2_Drawable (render) {
        var p,
        id = registry.push(this.c2_renderable = (0,eval)('(function c2_renderable () {'+
            'if (this.constructor !== this._c) {this.constructor()}'+
        '})')) - 1,
        prototype = this.c2_renderable.prototype;

        this.c2_renderable.prototype = new c2_baseClass();
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
    c2_Drawable.prototype = new c2_baseClass();
    c2_Drawable.prototype.attributes = c2_renderable_attributes;
    c2_Drawable.prototype.constructor = c2_renderable_constructor;
    c2_Drawable.prototype.render = c2_renderable_render;
    c2_Drawable.prototype.proto = c2_renderable_proto;
    c2_Drawable.prototype.compile = c2_renderable_compile;
    c2_Drawable.prototype.toString = c2_renderable_toString;


    c2.create = function create (render) {
        return new c2_Drawable(render);
    };
    function c2_renderable_toString () {
        return this._c2_id;
    }
    function c2_renderable_compile () {
        //do we want this?
        //optimize based on scope
    }
    function c2_renderable_constructor (fn) {
        this.c2_renderable.prototype.constructor = fn;
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
    function c2_renderable_render (fn) {
        this.c2_renderable.prototype.render = fn;
        return this;
    }
    function c2_renderable_attributes (attributes) {
        var p,
        setter = [],
        getter = [],
        remover = [],
        type;
        for (p in attributes) {
            type = attributes[p];
            //setter.push('(n === "'+p+'" && (this["'+p+'"]='+type+',this._invalid_ === 0 && this.invalidate(),true)) === true');
            setter.push('if (n === "'+p+'") {this["'+p+'"]='+type+';}');
            remover.push('if (n === "'+p+'") {this["'+p+'"]=undefined;}');
            //getter.push('(n === "'+p+'" && (v=this["'+p+'"],true)) === true ');
            getter.push('if (n === "'+p+'") {return this["'+p+'"];}');
        }
        //this.c2_renderable.prototype.setAttribute = eval('(function (n,v) {var date=new Date(),me=this;' + setter.join('|| ') + '|| (this[n]=v,this._invalid_ === 0 && this.invalidate(),true)===true;total_time += (new Date() - date);!start_time && check();})');
        this.c2_renderable.prototype.setAttribute = (0,eval)('(function (n,v) {' + setter.join('else ') + 'else {this[n]=v;}  '+'if (this._invalid_ == false) {' + this.c2_renderable.prototype.invalidate.compiled  + '}})')//'(this._invalid_ === false) &&  this.invalidate() })');
        //this.c2_renderable.prototype.getAttribute = eval('(function (n) {var v;'+getter.join('||')+'|| (v=this[n]);return v; })')
        this.c2_renderable.prototype.getAttribute = (0,eval)('(function (n) {'+getter.join('else ')+' else {return this[n];}})');
        this.c2_renderable.prototype.removeAttribute = (0,eval)('(function (n) {' + remover.join('else ') + 'else {this[n]=undefined} if (this._invalid_ === false) {' + this.c2_renderable.prototype.invalidate.compiled+ '}})');
        return this;
    }
    function c2_baseClass () {
        this._events = {};
    }
    c2_baseClass.prototype._invalid_ = false;
    c2_baseClass.prototype._invalid_cleanup = invalid_cleanup;
    c2_baseClass.prototype._invalid_parents = invalid_parents;
    c2_baseClass.prototype.appendChild = c2_appendChild;
    c2_baseClass.prototype.insertBefore = c2_insertBefore;
    c2_baseClass.prototype.removeChild = c2_removeChild;
    c2_baseClass.prototype.querySelector = c2_querySelector;
    c2_baseClass.prototype.querySelectorAll = c2_querySelectorAll;
    c2_baseClass.prototype.addEventListener = c2_addEventListener;
    c2_baseClass.prototype.removeEventListener = c2_removeEventListener;
    c2_baseClass.prototype.render = c2_baseClass.prototype.oninvalid =c2_baseClass.prototype.ontock = c2_baseClass.prototype.ontick = undefined;
    c2_baseClass.prototype.invalidate = c2_invalidate;
    c2_baseClass.prototype._events = undefined;


    //special instance
    //returns array that contains itself
    c2.Context2d = function () {
        if (this._c2Context2d_) {
            return this._c2Context2d_;
        }
        var ref = new (c2._Context2d.c2_renderable);
        //var ref = {};
        //ref[0] = ref;
        ref.canvas = this;
        ref.context = this.getContext('2d');
        ref.children =  [];
        //ref.appendChild = c2_appendChild;
        //ref.removeChild = c2_removeChild;
        //ref.querySelector = c2_querySelector;
        //ref.querySelectorAll = c2_querySelectorAll;
        ref.ownerDocument = ref;
        //ref.createElementNS = c2_createElementNS;
        //ref.insertBefore = c2_insertBefore;
        //ref.addEventListener = c2_addEventListener;
        //ref.removeEventListener = c2_removeEventListener;
        //ref.render = c2_context_render;
        //ref._invalid_ = false;
        //ref.invalidate = c2_context_invalidate;
        this._c2Context2d_ = ref;
        ref._events = {};
        return ref;
    };

    function c2_context_invalidate () {
        if (this._invalid_ === false) {
            this._invalid_cleanup[this._invalid_cleanup.index++] = this;
            this._invalid_ = true;
            this._invalid_parents[this._invalid_parents.index++] = this;

            if (c2._invalid_timeout === false) {
                c2._invalid_timeout = requestAnimationFrame(c2.do_invalidate);
            }
        }
    }
    c2_context_invalidate.compiled = c2_context_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1) ; 

    c2._Context2d = c2.create(c2_context_render)
        .proto({
            'invalidate' : c2_context_invalidate,
            'createElementNS' : c2_createElementNS
        })
        //properties we care about transitioning
        .attributes({
            'fillStyle' : c2.types.string,
            'globalAlpha' : c2.types.float,
            'lineWidth' : c2.types.float,
            'strokeStyle' : c2.types.string,
            'shadowColor' : c2.types.string,
            'shadowBlur' : c2.types.float,
            'shadowOffsetX' : c2.types.float,
            'shadowOffsetY' : c2.types.float
        })



    c2.Layer2d = c2.create()
        .constructor(function () {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            this.children = [];
            this._events = {};
        })
        .attributes({
            'x' : c2.types.int,
            'y' : c2.types.int,
            'width' : c2.types.int,
            'height' : c2.types.int
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
    function c2_createElementNS (a,b) {
        var result = new registry[b|0]();
        result.ownerDocument = this;
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
    function c2_appendChild (drawable) {
        drawable.parentNode && drawable.parentNode.removeChild(drawable);
        var result = this.children && (this.children.push(drawable),drawable.parentNode=this,drawable) || null;
        if (this._invalid_ === false && result !== null) {
            this.invalidate();
        }
        return result;
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

}
c2();

if (typeof module === 'object') {
    if (typeof module.exports === 'object') {
        module.exports = c2;
    }
} 
if (typeof window === 'object') {
    window.c2 = c2;
}








