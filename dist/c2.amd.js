define("c2", [], function() { return /******/ (function(modules) { // webpackBootstrap
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

	/* WEBPACK VAR INJECTION */(function(global) {global.c2 = function c2 () {
	}
	c2.element = c2.create = function c2_create (render) {
	    return new this.Drawable(render);
	};
	c2.animate = __webpack_require__ (2);
	c2.registry = __webpack_require__(4);
	c2.invalidator = __webpack_require__(3);
	c2.types = __webpack_require__(5);
	c2.Base = __webpack_require__(6);
	c2.Drawable = __webpack_require__(7);
	c2.Context2d = __webpack_require__(8);
	c2.Layer2d = __webpack_require__(10);
	c2.createElement = __webpack_require__(9);
	//TODO
	//c2.optimize = require('./Optimize');


	module.exports = c2;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = function (selection) {
	    return new c2_Animate(selection);
	};

	//default d3 ease,delay,duration function
	var DEFAULT_EASE = function easeCubicInOut(t) {
	    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	},
	invalidate = __webpack_require__(3),
	DEFAULT_DELAY = 0,
	DEFAULT_DURATION = 250;


	//var animateIds=1;
	function c2_Animate (name) {

	    function animation (selection) {
	        var compiled;
	        if (compiled = animation._compile()) {
	            animation.tween('',compiled);
	        }
	        pending[pending_cnt++] = {
	            'selection' : selection,
	            'animation' : animation
	        };
	        !c2_timer_running && (c2_timer_running = true,invalidate.nextCalculate(start_c2_timer));
	        !c2_timer_running && (c2_timer_running = true,setTimeout(start_c2_timer));
	        //!c2_timer_running && (c2_timer_running = true,requestAnimationFrame(start_c2_timer));
	    }
	    //animation._id = animateIds++;
	    animation._name = name || '';
	    animation._ease = DEFAULT_EASE;
	    animation._delay = DEFAULT_DELAY;
	    animation._duration = DEFAULT_DURATION;
	    animation._tween_map={};
	    animation._to = {};
	    animation._compiled = {};
	    animation._compiled_fn = undefined;
	    //TODO do we need from?
	    //animation._from = {};
	    //TODO to should allow chaining
	    animation._tweens = [];

	    animation._compile = c2_compile;
	    animation.duration = c2_duration;
	    animation.delay = c2_delay;
	    animation.ease = c2_ease;
	    animation.tween = c2_tween;
	    animation._remove = false;
	    //animation.from = c2_from;
	    animation.to = c2_to;
	    animation.on = c2_on;

	    animation.remove = c2_remove

	    //TODO for chaining
	    //animation.animate;

	    //TODO events + iteration
	    //animation.each



	    //this._selection = selection;

	    //console.error(animation);
	    return animation;
	}
	function c2_duration (duration) {
	    if (arguments.length) {
	        this._duration = duration;
	        return this;
	    }
	    return this._duration;
	}
	function c2_delay (delay) {
	    if (arguments.length) {
	        this._delay = delay;
	        return this;
	    } 
	    return this._delay;
	}
	function c2_ease (ease) {
	    if (arguments.length) {
	        this._ease = ease;
	        return this;
	    } 
	    return this._ease;
	}

	function c2_remove () {
	    this._remove = true;
	    return this;
	}
	function c2_on (name,fn) {
	    if (name === 'end') {
	        !this._on_end && (this._on_end = [fn]) || this._on_end.push(fn);
	    } else if (name === 'start') {
	        !this._on_start && (this._on_start = [fn]) || this._on_start.push(fn);
	    }
	    return this;
	}

	function c2_compile () {
	    var me=this,p,to=this._to,result='(function (to,n) {return function (d,i) {',
	    vars = ['var me=this'],
	    interpolators = [],
	    tween = [],
	    compiled = this._compiled,
	    not_same = false,
	    cnt=0;

	    if (compiled) {
	        for (p in to) {
	            if (compiled[p] !== to[p]) {
	                not_same = true;
	                break;
	            }
	        }
	        if (not_same === false) {
	            return this._compiled_fn;
	        }
	    }


	    compiled = this._compiled =  {};

	    //if (to = this._to) {
	    for (p in to) {
	        compiled[p] = to[p];
	        vars.push('s'+cnt+'=this["'+p+'"]',
	            'v'+(cnt)+'='+ (typeof to[p] === 'function' && 'to["'+p+'"].call(this,d,i)'||'to["'+p+'"]'),
	            't'+(cnt)+'=typeof v'+cnt+' === "number"'
	        );
	        interpolators.push(
	            'if (t'+cnt+') {s'+cnt+'=s'+cnt+'||0;v'+cnt+'-=s'+cnt+';} else {v'+cnt+'=d3.interpolate(s'+cnt+',v'+cnt+');}'
	            //'if (t'+cnt+'===true) {s'+cnt+'=s'+cnt+'||0;v'+cnt+'-=s'+cnt+';} else {v'+cnt+'=d3.interpolate(s'+cnt+',v'+cnt+');}'
	        )
	        //tween.push ('if (t'+cnt+') { m.setAttribute("'+p+'",s'+cnt+'+v'+cnt+'*t);} else {m["'+p+'"]=v'+cnt+'(t);}')
	        //tween.push ('(t'+cnt+') &&  ( m["'+p+'"]=s'+cnt+'+v'+cnt+'*t,true) || (m["'+p+'"]=v'+cnt+'(t));')
	        tween.push ('if (t'+cnt+') m["'+p+'"]=s'+cnt+'+v'+cnt+'*t; else m["'+p+'"]=v'+cnt+'(t);')
	        cnt++;
	    }
	    result += vars.join(',') + ';';
	    result += interpolators.join('');
	    result += 'return function (t,e) {'+
	        'var m = me;';

	    result += tween.join('');
	    //result += 'if (m._not_invalid_) { m._not_invalid_=0;m._invalid_cleanup[m._invalid_cleanup.index++]=m;m.parentNode._not_invalid_&&m.parentNode.invalidate()};'
	    result += 'm._not_invalid_&&m.parentNode&&m._invalidate();'
	    //result += 'm._not_invalid_&& (m._not_invalid_=0,m._invalid_cleanup[me._invalid_cleanup.index++],m.parentNode._not_invalid_&&m.parentNode.invalidate());'
	    result += 'e&&n(m,d,i);'
	    result += '}'

	    //}
	    result += '}})';
	    return this._compiled_fn = (0,eval)(result)(to,function (node,d,i) {
	        var end;
	        if (me._remove) {
	            node.parentNode && node.parentNode.removeChild(node);
	        }
	        if (end = me._on_end) {
	            var i,ln;
	            for (i=0,ln=end.length;i<ln;i++) {
	                end.call(node,d,i,g);
	            }
	        }
	    });
	}

	function c2_to (name,value) {
	    if (arguments.length > 1) { 
	        this._to[name]=value;
	    } else if (typeof name === 'object') {
	        var p;
	        for (p in name) {
	            this._to[p] = name[p];
	        }
	    }
	    return this;
	}
	function c2_to2 (name,value) {
	    if (arguments.length > 1) { 
	        if (typeof value === 'function') {
	            return this.tween('attr.'+name,function (d,i,g) {
	                var me = this,
	                v = value.call(this,d,i,g),
	                s = this[name];
	                if (typeof v === 'number') {
	                    s = s || 0;
	                    v -= s;
	                    return function (t) {
	                        var m = me;
	                        m[name] = s+v*t;
	                        m._invalid_ === false && m.invalidate();
	                    };
	                } else {
	                    v = d3.interpolate(s,v);
	                    return function (t) {
	                        var m = me;
	                        m[name] = v(t);
	                        m._invalid_ === false && m.invalidate();
	                    };
	                }
	            });
	        } else { 
	        return this.tween('attr.'+ name,function () {
	            var me = this,
	            v = value,
	            s = this[name];
	            if (typeof v === 'number' && typeof s === 'number') {
	                return function (t) {
	                    var m = me;
	                    m[name] = s+v*t;
	                    m._invalid_ === false && m.invalidate();
	                };
	            } else {
	                v = d3.interpolate(s,v);
	                return function (t) {
	                    var m = me;
	                    m[name] = v(t);
	                    m._invalid_ === false && m.invalidate();
	                };
	            }
	        });
	        }
	    } else {
	        if (typeof name === 'object') {
	            var p;
	            for (p in name) {
	                this.to(p,name[p]);
	            }
	            return this;
	        }
	        return this.tween(name);
	    }
	}
	function c2_tween (name,tween) {  
	    if (arguments.length > 1) {
	        if (index = this._tween_map[name]) {
	            this._tweens[index] = tween;
	        } else {
	            this._tween_map[name] = this._tweens.push(tween) - 1;
	        }
	        return this;
	    } else {
	        return this._tweens[this._tween_map[name]] || null;
	    }
	}


	window.start_durations=[],
	window.available_start_indices=[],
	window.available_start_cnt=0,
	window.available_invalid = true;
	window.ordered_available = [];
	window.start_duration_end_index=-1,
	window.ease_groups = [],
	window.pending=[],
	window.pending_cnt = 0,
	window.start_duration_map = {},
	window.available={};
	var transitionIds=1,
	c2_timer_running = false;


	function add_pending (date) {
	    var i,ln,j,jln,k,kln,m,mln,groups,group,item,tween_group,tweens,
	    delay,duration,ease,_delay,_duration,delay_is_fn,duration_is_fn,
	    available_start_cnt,
	    _ease_groups = ease_groups,
	    _pending = pending,
	    _tweens,_name,twln,p,
	    ease_group,
	    names,
	    start_duration_key,
	    index,
	    stamp = date,
	    animation,
	    bundle,
	    selection;

	    if (available_invalid) {
	        available_invalid = false;
	        if (start_duration_end_index===-1) {
	            available_start_cnt=0;
	        } else {
	            window.ordered_available = [];
	            for (i=0,ln=available_start_indices.length;i<ln;i++) {
	                if (available_start_indices[i]) {
	                    j = i*2;
	                    if (j > start_duration_end_index) {
	                        break;
	                    } else {
	                        ordered_available.push(j);
	                    }
	                }
	            }
	        }
	        //available_start_indices.sort();
	    }
	    //console.error(ordered_available);
	    //return;
	    for (i=0,ln=pending_cnt;i<ln;i++) {
	        bundle = _pending[i];
	        animation = bundle.animation
	        selection = bundle.selection;
	        selection._started = true;
	        groups = selection._groups;
	        _delay = animation._delay;
	        _duration = animation._duration;
	        _tweens = animation._tweens;
	        _name = animation._name;
	        //console.error(selection);

	        ease = animation._ease;

	        delay_is_fn = typeof _delay === 'function';
	        duration_is_fn = typeof _duration === 'function';

	        for (j=0,jln=groups.length;j<jln;j++) {
	            group = groups[j];
	            for (k=0,kln=group.length;k<kln;k++) {
	                if (item = group[k]) {
	                    if (item._c2_transition) {
	                        names = item._c2_transition;
	                        tweens = names[_name];
	                        if (tweens !== undefined) {
	                            tween_group = tweens.tween_group;
	                            //console.error('falsing',tween_group.cnt);


	                            for (m=0,mln=tweens.length;m<mln;m++) {
	                                tween_group[tweens[m]] = 0;
	                            }

	                            if (tween_group.cnt !== 0 && (tween_group.cnt -= mln) <= 0 ) {
	                                //console.error('stopping');

	                                tween_group.cnt=tween_group.length=0;
	                                //delete start_duration_map[tween_group.key];
	                                //index = tween_group.index-1;
	                                //ease_groups[index/2].length=0;
	                                //start_durations[index]=start_durations[index+1] = -1;
	                                //available_start_indices.push(index);
	                                //available_start_cnt++;

	                                //start_durations[tween_]

	                            }
	                        }
	                    } 
	                    if (delay_is_fn) {
	                        delay = stamp+ _delay.call(item,item.__data__,k,group);
	                    } else {
	                        delay = stamp+_delay;
	                    }
	                    if (duration_is_fn) {
	                        duration = _duration.call(item,item.__data__,k,group);
	                    } else {
	                        duration = _duration;
	                    }
	                    start_duration_key = delay + '-' + duration;
	                    if ( !(ease_group = start_duration_map[start_duration_key])) {
	                        if (available_start_cnt > 0) {
	                            index = ordered_available.shift();
	                            available_start_indices[index/2]=0;
	                            available_start_cnt--;
	                            //index = start_durations.indexOf(-1);
	                            //for (p in available) {
	                                //console.error('taking p');
	                                //index = p;
	                                //delete available[p];
	                                //available_start_cnt--;
	                                //break;
	                            //}
	                            //console.error('a',index);
	                            //index = available_start_indices.shift();
	                            //available_start_cnt--;
	                            //available_start_indices[--available_start_cnt];
	                        } else {
	                            index = start_duration_end_index + 1;
	                        } 

	                        ease_group = _ease_groups[index/2] = start_duration_map[start_duration_key] = [ease,tween_group=[]];
	                        tween_group.cnt =0
	                        //tween_group.key = start_duration_key;
	                        //tween_group.index = index;

	                        start_durations[index] =  delay;
	                        start_durations[++index] = duration;
	                        if (index > start_duration_end_index) {
	                            start_duration_end_index = index;
	                        }

	                    } else {
	                        index = ease_group.indexOf(ease);
	                        if (index !== -1) {
	                            tween_group = ease_group[index+1];
	                        } else {
	                            ease_group.push(ease,tween_group=[]);
	                            tween_group.cnt=0;
	                            //tween_group.key = start_duration_key;
	                            //tween_group.index = ease_group.index;
	                        }
	                    }
	                    names = item._c2_transition;
	                    if (!names) {
	                        names = item._c2_transition = {};
	                    }
	                    //if ((tweens = names[_name]) === undefined) {
	                    tweens = names[_name] = [];
	                    tweens.tween_group = tween_group;
	                    //}
	                    for (m=0,mln=_tweens.length;m<mln;m++) {
	                        tweens[m] = tween_group.push(_tweens[m].call(item,item.__data__,k,group))-1;
	                    }
	                    tween_group.cnt += mln;
	                }
	            }
	        }
	        _pending[i] = undefined;
	    }
	    pending_cnt=0;
	    //console.error(new Date()-stamp);
	}




	function start_c2_timer () {
	    var i,ln,j,jln,group,groups,g,
	    k,kln,m,mln,
	    item,
	    date = Date.now(),
	    start = 0,
	    t=0,e=0,
	    ease_value,
	    duration,tween,
	    tweens,tween_group,
	    cleanup = 0;

	    //first check pending
	    if ( pending_cnt) {
	        add_pending(date);
	    }

	    if (start_duration_end_index > 0) {
	        for (i=0,j=0,g=0,ln=start_duration_end_index;i<ln;i++,g++) {
	            start = start_durations[i++];
	            if (start !== -1 && date > start) {
	                duration = start_durations[i];
	                if (duration > 0) {
	                    t = (date-start) / duration; 
	                    (t >= 1) && (e = t = 1);
	                    if (group = ease_groups[g]) {
	                        for (j=0,jln=group.length;j<jln;j+=2) {
	                            tweens = group[j+1];
	                            if ( kln=tweens.length) {
	                                ease_value = group[j](t);
	                                for (k=0;k<kln;k++) {
	                                    (tween = tweens[k]) && tween(ease_value,e);
	                                }
	                            }
	                        }
	                    }
	                } else {
	                    e=1;
	                }
	                if (e) {
	                    e=0;
	                    available_start_cnt++;
	                    !available_invalid && (available_invalid = true);
	                    available_start_indices[(i-1)/2]=1;
	                    //available_start_indices.push(i-1);
	                    //if (i-1 > available_start_indices[0]) {
	                        //available_start_indices.push(i-1);
	                    //} else {
	                        //available_start_indices.unshift(i-1);
	                    //}
	                    //available[i-1]=true;
	                    //available_start_indices[i-1] = true;
	                    //available_start_indices.push(i-1);
	                    //available_start_indices[available_start_cnt++]=i-1;
	                    //console.error(i-1);
	                    //available_start_indices.push(i-1);
	                    delete start_duration_map[start_durations[i-1]+'-'+start_durations[i]];
	                    start_durations[i-1] =  start_durations[i] = -1;
	                    ease_groups[g] = false;
	                    //ease_groups[g].length = 0;
	                    i === start_duration_end_index && (cleanup = 1);
	                }
	            }
	        }
	        if (cleanup) {
	            //update end_index
	            for (i=start_duration_end_index-1;i>=-1;i-=2) {
	                if (start_durations[i] !== -1) {
	                    start_duration_end_index = i+1;
	                    break;
	                    //return;
	                }
	            }
	            //console.error(i);
	            if (i<=-1) start_duration_end_index=-1
	        }
	    }
	    //console.error(new Date()-date);

	    if (pending_cnt > 0 || start_duration_end_index > 0) {
	        invalidate.nextCalculate(start_c2_timer);
	    } else {
	        c2_timer_running = false;
	    }
	}




/***/ },
/* 3 */
/***/ function(module, exports) {

	
	var 
	invalid_parents = [],
	invalid_cleanup = [],
	invalid_children = [],
	calculate;

	invalid_children.index = invalid_parents.index = invalid_cleanup.index = 0;

	function c2_invalidate () {
	    if (!c2_invalidate.t2) {
	        c2_invalidate.t2 = true;
	        requestAnimationFrame(c2_do_invalidate);
	    }
	}

	c2_invalidate.nextCalculate = function (fn) {
	        if (c2_invalidate.t2) {
	            calculate = fn;
	        } else {
	            //calculate = fn;
	            //c2_invalidate.t2 = true;
	            setTimeout(fn,4);
	            //requestAnimationFrame(c2_do_invalidate);
	        }
	}

	var waiting_calculate=false;
	function schedule_calculate () {
	    var cl = calculate;
	    waiting_calculate = false;
	    if (cl) {
	        calculate = false;
	        cl();
	    }
	}

	var last;
	function c2_do_invalidate () {
	    c2_invalidate.t2 = false;

	    //console.error('f',new Date()-last);
	    //var start = last= new Date();
	    if (calculate) {
	        waiting_calculate=true;
	        setTimeout(schedule_calculate,4);
	    }
	    //start = new Date();



	    var parents = invalid_parents,
	    cleanup = invalid_cleanup,
	    children = invalid_children,
	    j,jln,c=0,k,i,ln,
	    items,
	    cnt,
	    item;

	    for (i=0,ln=children.length;i<ln;i++) {
	        item = children[i];
	        items = item.children;
	        for (j=k=item._invalid_children_,cnt=0,jln=items.length;k<jln;j++,k++) {
	            item  = items[k];
	            if (!item) {
	                while (!item && k < jln) {
	                    c++;
	                    item = items[++k];
	                }
	            }
	            if (c > -1 && (item)) {
	                items[j] = item;
	                item.parentIndex = j;
	            }
	        }
	        children[i]._invalid_children_ = -1;
	        if (items.length) {
	            items.length-=(k-j);
	        }
	    }
	    children.index=0;



	    for (i=0,ln=parents.index;i<ln;i++) {
	        parents[i].render();
	    }

	    parents.index=0;
	    for (i=0,ln=cleanup.index;i<ln;i++) {
	        item = cleanup[i];
	        item._not_invalid_ = 1;
	    }

	    cleanup.index  = 0;
	}
	c2_invalidate.timeout = false;
	c2_invalidate.parents = invalid_parents;
	c2_invalidate.cleanup = invalid_cleanup;
	c2_invalidate.children = invalid_children;


	module.exports = c2_invalidate;




/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = [];


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
	    'int' : {
	        'defaultValue' : 0,
	        'setValue' : 'v|0'
	    },
	    'float' : {
	        'defaultValue' : 0.0,
	        'setValue' : 'v'
	    },
	    'string' : {
	        'defaultValue' : '',
	        'setValue' : 'v'
	    },
	    'object' : {
	        'defaultValue' : null,
	        'setValue' : 'v'
	    },
	    'array' : {
	        'defaultValue' : null,
	        'setValue' :  'v'
	    },
	    'any' : {
	        'defaultValue' : null,
	        'setValue' : 'v'
	    }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var invalidator = __webpack_require__(3),
	registry = __webpack_require__(4);




	function c2_Base () {
	    this._events = {};
	}

	c2_Base.prototype._not_invalid_ = 1;
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
	c2_Base.prototype._invalidate = c2_pre_checked_invalidate;
	//c2_Base.prototype.invalidate2 = c2_invalidate2;
	c2_Base.prototype._events = undefined;



	function c2_appendChild (drawable) {
	    drawable.parentNode && drawable.parentNode.removeChild(drawable);
	    var children=this.children,result;
	    if (!children) {
	        children = this.children = [];
	        //this.__changed__ = [];
	    }

	    drawable.parentIndex=children.push(drawable)-1;
	    drawable.parentNode = this;

	    if (this._not_invalid_) {
	        this._invalidate();
	    }
	    return drawable;
	}


	function c2_insertBefore (drawable,referenceNode) {
	    if (drawable.parentNode) {
	        drawable.parentNode.removeChild(drawable);
	    }

	    var 
	    children = this.children,
	    index = -1;

	    if (!children) {
	        children = this.children = [];
	        //this.__changed__ = [];
	    }

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

	    if (this._not_invalid_) {
	        this._invalidate();
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

	    if (this._not_invalid_) {
	        this._invalidate();
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
	    this._not_invalid_ && (this._invalidate());
	}
	function c2_getAttribute (name) {
	    return this[name];
	}
	function c2_removeAttribute (name) {
	    this[name] = undefined;
	    this._not_invalid_ && (this._invalidate());
	}

	//TODO invalidate event
	function c2_pre_checked_invalidate () {
	    this._invalid_cleanup[this._invalid_cleanup.index++]=this;
	    this._not_invalid_ = 0;

	    this.parentNode._not_invalid_ && this.parentNode.invalidate();
	}
	c2_pre_checked_invalidate.compiled = c2_pre_checked_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1);
	function c2_invalidate () {
	    if (this._not_invalid_) {
	        this._invalid_cleanup[this._invalid_cleanup.index++]=this;
	        this._not_invalid_ = 0;
	        this.willInvalidate && this.willInvalidate();

	        this.parentNode._not_invalid_ && this.parentNode.invalidate();
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Base = __webpack_require__(6);



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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	

	var 
	createElement = __webpack_require__(9),
	Drawable = __webpack_require__(7),
	types = __webpack_require__(5);




	Context2d = new Drawable(c2_context_render)
	.proto({
	        'invalidate' : c2_context_invalidate,
	        '_invalidate' : c2_context_pre_checked_invalidate,
	        'createElementNS' : c2_context_createElementNS
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
	    children = this.children,
	    i,ln,
	    child;

	    if (tick) {
	        for (i=0,ln=tick.length;i<ln;i++) {
	            tick[i].call(this,context);
	        }
	    }
	    for (i=0,ln=children.length;i<ln;i++) {
	        (child=children[i]).render(context,child.__data__,i);
	    }
	    if (tock) {
	        for (i=0,ln=tock.length;i<ln;i++) {
	            tock[i].call(this,context);
	        }
	    }
	}

	function c2_context_createElementNS (a,b) {
	    return createElement(b);
	}

	function c2_context_pre_checked_invalidate () {
	    if (this._not_invalid_) {
	        this._not_invalid_ = 0;
	        this._invalid_cleanup[this._invalid_cleanup.index++] = this;
	        this._invalid_parents[this._invalid_parents.index++] = this;

	        !this.invalidator.t2 && this.invalidator();
	    }
	}
	function c2_context_invalidate () {
	    if (this._not_invalid_) {
	        this._not_invalid_ = 0;
	        this._invalid_cleanup[this._invalid_cleanup.index++] = this;
	        this._invalid_parents[this._invalid_parents.index++] = this;

	        !this.invalidator.t2 && this.invalidator();
	    }
	}

	c2_context_invalidate.compiled = c2_context_invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1) ; 


	module.exports = function () {
	    if (this._c2Context2d_) {
	        return this._c2Context2d_;
	    }
	    var ref = c2.createElement(Context2d);
	    ref.canvas = this;
	    ref.context = this.getContext('2d');
	    ref.ownerDocument = ref;
	    this._c2Context2d_ = ref;
	    ref._events = {};
	    return ref;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var registry = __webpack_require__(4);

	module.exports = function (tag) {
	    var result;
	    if (typeof tag === 'string') {
	        result = registry[tag|0];
	    } else if (tag._isDrawable === true) {
	        result = tag;
	    }
	    if (!result.c2_renderable) {
	        //moves properties from prototype into the object instance - performance improvement for large iteration
	        result.c2_renderable = result.compile();
	    } 
	    result = new result.c2_renderable();
	    result.ownerDocument = c2;
	    return result;
	};

	function get_c2_renderable (result) {
	    return function c2_renderable () {
	        var r =result,p;
	         for (p in r) {
	             this[p] = r[p];
	         }
	         if (this._constructor !== undefined) {this._constructor();}
	    };
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//TODO Lyaer2d needs a rework due to removal of changed array
	var Drawable = __webpack_require__(7),
	types = __webpack_require__(5);

	module.exports =  new Drawable(function (parentContext,d,ix,changed) {
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
	.proto({
	        'forceUpdate' : function () {
	            this._forced = true;
	        }
	});






/***/ }
/******/ ])});;