define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	function c2 () {
	}
	c2.create = function c2_create (render) {
	    return new this.Drawable(render);
	};
	c2.registry = __webpack_require__(2);
	c2.invalidator = __webpack_require__(3);
	c2.types = __webpack_require__(4);
	c2.Base = __webpack_require__(5);
	c2.Drawable = __webpack_require__(6);
	c2.Context2d = __webpack_require__(7);
	c2.Layer2d = __webpack_require__(8);


	module.exports = c2;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var registry = [];
	module.exports = registry;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var 
	invalid_parents = [],
	invalid_cleanup = [];

	invalid_parents.index = invalid_cleanup.index = 0;

	function c2_invalidate () {
	    var parents = invalid_parents,
	    cleanup = invalid_cleanup,
	    i,ln,
	    item;

	    c2_invalidate.timeout = false;

	    for (i=0,ln=parents.length;i<ln;i++) {
	        parents[i].render();
	    }

	    for (i=0,ln=cleanup.length;i<ln;i++) {
	        item = cleanup[i];
	        item._invalid_ = false;
	        if (item.__changed__ !== undefined) {
	            item.__changed__.length = 0;
	        }
	    }

	    parents.index = cleanup.index  = 0;
	}
	c2_invalidate.timeout = false;
	c2_invalidate.parents = invalid_parents;
	c2_invalidate.cleanup = invalid_cleanup;


	module.exports = c2_invalidate;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var types = {
	    'int' : 'v|0',
	    'float' : '+v',
	    'string' : 'v||""',
	    'object' : 'v',
	    'array' : 'v',
	    'any' : 'v'
	};
	module.exports = types;



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var invalidator = __webpack_require__(3),
	registry = __webpack_require__(2);


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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Base = __webpack_require__(5);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	

	var 
	Drawable = __webpack_require__(6),
	types = __webpack_require__(4);

	Context2d = new Drawable(c2_context_render)
	    .proto({
	        'invalidate' : c2_context_invalidate,
	        'createElementNS' : c2_createElementNS
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

	function c2_createElementNS (a,b) {
	    var result = new this.registry[b|0]();
	    result.ownerDocument = this;
	    return result;
	}

	function c2_context_invalidate () {
	    if (this._invalid_ === false) {
	        this._invalid_ = true;
	        this._invalid_cleanup[this._invalid_cleanup.index++] = this;
	        this._invalid_parents[this._invalid_parents.index++] = this;

	        if (this.invalidator.timeout === false) {
	            this.invalidator.timeout = requestAnimationFrame(this.invalidator);
	        }
	    }
	}

	c2_context_invalidate.compiled = c2_context_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1) ; 


	module.exports = function () {
	    if (this._c2Context2d_) {
	        return this._c2Context2d_;
	    }
	    var ref = new (Context2d.c2_renderable);
	    ref.canvas = this;
	    ref.context = this.getContext('2d');
	    ref.children = [];
	    ref.ownerDocument = ref;
	    this._c2Context2d_ = ref;
	    ref._events = {};
	    return ref;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Drawable = __webpack_require__(6),
	types = __webpack_require__(4);

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


/***/ }
/******/ ])});;