var Drawable = require('./Drawable.js'),
Base=require('./Base'),
invalidate = require('./Invalidate');

module.exports = function (selection) {
    var transition;
    if (!selection._c2_optimize) {
        selection._c2_optimize = true;
        //selection._c2_attr_hook =selection.attr;
        if (selection.tween) {
            //selection.transition = c2_transition;
            //selection.ease = c2_ease;
            //selection.duration = c2_duration;
            //selection.delay = c2_delay;
            //selection.attr = c2_optimize_transition_attr;
            //selection.attrTween = c2_optimize_transition_attrTween;
        } else {
            selection.attr = c2_optimize_attr;
            selection.transition = c2_transition;
        }
        selection._c2_transition_hook = selection.transition;
        //selection.transition = c2_optimize_transition;
    }
}

function c2_optimize_transition () {
    return this._c2_transition_hook.apply(this,arguments)
}

function c2_optimize_attr (name,value) {
    var start = new Date();
    this._c2_attr_hook(name,value);
    console.error(new Date() - start);
    return this;
    var result = "(function (value,name) {\n"+
        'var group,i,n,node,v;'
        //"var groups=this._groups,j,m,group,i,n,node;;\n"+

    if (typeof value === 'function') {
        result += "for (var groups=this._groups,j = 0, m = groups.length; j < m; j++) {\n"+
            "for (group = groups[j], i = 0, n = group.length,node,v; i < n; i++) {\n"+
                "if (node = group[i]) {\n"+
                    //"v=value.call(node,node.__data__,i);"+
                    //"set.call(node,i)"+
                    //"v=value.call(node,node.__data__,i);"+
                    'node["'+name+'"]=value.call(node,node.__data__,i);'+
                        'if (node._invalid_ === false) node.invalidate();'+
                        //"node._invalid_ === false && node.invalidate();\n"+
                        //"node.setAttribute(name,value.call(node,node.__data__,i));"+
                    //"node._c = value;node['"+name+"']=node._c(node.__data__,i,group);"+
                    //"node['"+name+"'] = value.call(node,node.__data__,i,group);\n"+
                    //"node._invalid_ === false && node.invalidate();\n"+
                "}\n"+
            "}\n"+
        "}\n"
    } else {
        if (typeof value === 'string') {
            value = '"'+value+'"';
            result += "for (var groups = this._groups, j = 0, m = groups.length; j < m; j++) {\n"+
                    "for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {\n"+
                        "if (node = group[i]) {\n"+
                            "node."+name+" = "+value+";\n"+
                            "node._invalid_ === false && node.invalidate();\n"+
                        "}\n"+
                    "}\n"+
                "}\n"
        }
    }
    //result += "console.error(new Date() - start);\n"+
        result+="})";


    (0,eval)(result).call(this,value,name);
    console.error(new Date() - start);
    return this;
}

function c2_optimize_transition_attrTween (name,value) {
    /*
     *eval(`
     *    this.tween("`+'attr.'+name+`",function (d,i,g) {
     *        var tick = value.call(this,d,i,g),
     *        node,
     *        interpolator;
     *        if (typeof tick !== 'function') {
     *            return;
     *        } else {
     *            node = this;
     *            interpolator = d3.interpolate(this["`+name+`"],result);
     *            return function (t) {
     *                n["`+name+`"]=tick(t);
     *                n._invalid_ === false && node.invalidate();
     *            };
     *        }
     *    });
     *    `)
     */
}


var group_invalidate = [],
last_t;
//group_invalidate.


function c2_tick (t) {
    if (t !== last_t) {
        last_t = t;
        process(t)
    }

}


//var transitions=[];
//function c2_optimize_transition () {
    //if (this._c2_transition) {
        //this._c2_transition.stopped = true;
    //}
    //this._c2_transition = {
        //id : this._id,
        //stopped : false,
    //}
    //!timeout && timeout = setTimeout(timer);
//}

//var timeout;
//function timer () {
    //setTimeout(timer,15);
//}

var cnt=0;
function c2_optimize_transition_attr (name,value) {
    //if (!this.c2_interpolators) {
        var me=this,
        last_t,
        interpolators = {
            numbers:[],
            number_nodes:[],
            all:[]
        },
        first=new Date(),
        c2_tick = function (t) {
            if (t !== last_t) {
                //console.error('between',new Date() - first);
                //first = new Date();
                last_t=t;
                c2_process(t,interpolators);
                //setTimeout(function () {c2_process(t,interpolators)});
            }
        },
        id = this._id,
        c2_process = (function c2_process (t,interpolators) {
                var all = interpolators.all,
                numbers = interpolators.numbers,
                number_nodes = interpolators.number_nodes,
                t = last_t,
                j=0,
                n,
                i,ln,
                item,
                start = new Date();
                //console.error(number_nodes[0].__transition,number_nodes[1].__transition);
                for (i=0,j=0,ln=numbers.length,item;i<ln;i++) {
                    n = number_nodes[j++];
                    if (n.__transition && n.__transition[id]) {
                        n[name]=numbers[i++]+numbers[i]*t;
                        n._invalid_ === false && n.invalidate();
                        //`+Base.prototype.invalidate2.compiled+`
                    } else {
                        i++;
                    }
                }
                for (i=0,ln=all.length,item;i<ln;i++) {
                    item = all[i];
                    n = item.n;
                    if (n.__transition && n.__transition[id]) {
                        n[name] = item(t);
                        n._invalid_ === false && n.invalidate();
                        //`+Base.prototype.invalidate2.compiled+`
                    }
                }
                //console.error(new Date()-start);
                //invalidate.doInvalidate();
                //console.error(new Date()-start,all.length,name);
        });


        cnt++;
    this.tween("attr."+name,function (d,i) {
        var interpolator,
        c=this[name],
        v=value,
        me = this;
        if (typeof v === 'function') {
            v = v.call(this,d,i);
        }
        if (typeof v === 'number' && typeof c === 'number') {
            interpolators.numbers.push(c,v-c);
            interpolators.number_nodes.push(me);
        } else {
            interpolator = d3.interpolate(c,v);
            interpolator.n = this;
            interpolators.all.push(interpolator);
        }
        return c2_tick;
    });
    
    return this;
}

//var ease_groups=[],
var tweens=[],
easeId = 1,
index=0;
function c2_tween (name,fn) {
    var groups = this._groups,
    g,i,ln,j,jln,item,
    duration = this.duration(),
    delay = this.delay(),
    ease = this.ease(),
    duration_is_fn = typeof duration === 'function',
    delay_is_fn = typeof delay === 'function',
    transition,
    stamp = new Date(),
    start_index,
    start_group,
    duration_index,
    duration_group,
    duration,
    start;

    if (ease._c2_ease_id === undefined) {
        ease._c2_ease_id = easeId++;
    }
    var ease_group_index = ease_groups.indexOf(ease._c2_ease_id),
    ease_group;

    if (ease_group_index === -1) {
        ease_groups.push(ease._c2_ease_id,ease_group={'transitions':[]});
    } else {
        ease_group = ease_groups[ease_group_index+1];
    }


    //first we get an ease_group so that we can perform easeing iterations with easeFn in innerloop
    //
    //
    //get a transitionGroup -- except our transition groups are grouped by delay/start, duration

    //iterate groups
    for (i=0,ln=groups.length;i<ln;i++) {
        group = groups[i];
        for (j=0,jln=group.length;j<jln;j++) {
            item = group[j];
                transition = item.__transition || (item.__transition = [fn]);
                //if the item already has a transition, we need to check if the transition is the current transition already used
                if (transition.id !== id) {
                    transition.id = id;
                    transition.delay =delay_is_fn && (delay.call(item,item.__data__,j,group)||0) || delay;
                    start = stamp+transition.delay;
                    if (start !== transition.start) {
                        //remove old
                        if (transition.start_index !== undefined) {
                            start_index = transition.start_index;
                            start_group = ease_group[start_index];
                            duration_index = transition.duration_index;
                            duration_group = start_group[duration_index];
                            duration_group[transition.index]=undefined;
                        }
                        //add new
                        start_index = ease_group.indexOf(start)+1;
                        if (start_index === -1) {
                            ease_group.push(start,start_group=[]);
                            start_index=1;
                        } else {
                            start_group = ease_group[start_index];
                        }
                        duration_index = start_group.indexOf(duration);
                        if (duration_index === -1) {
                            start_group.push(duration,duration_group=[]);
                            duration_index=1;
                        } else {
                            duration_group = start_group[duration_index];
                        }

                    }
                    transition.start = stamp+transition.delay;
                    transition.duration = duration_is_fn && (duration.call(item,item.__data__,j,group)||0) || duration;
                } else {
                    transition.push(fn);
                }
                start_index = ease_group.indexOf(transition.start);
                if (start_index === -1) {
                    ease_group.push(start,start_group=[]);
                } else {
                    start_group = ease_group[start_index+1];
                }
                duration_index = start_group.indexOf(duration);
                if (duration_index === -1) {
                    start_group.push(transition.duration,duration_group=[]);
                } else {
                    duration_group = start_group[duration_index+1];
                }
                duration_group.push(transition);
        }
    }
    //transitions.push(this);
}

//var Transition = d3.transition.prototype;


//starts are just ints
var starts = [],

//durations is an array of an array of ints
durations=[],
easings=[];
function c2_group_duration_delay_ease (selection,duration,delay,ease) {
    var i,ln,group,groups=selection._groups,item,j,jln,
    delay_is_fn = typeof delay === 'function',
    duration_is_fn = typeof duration === 'function',
    stamp = Date.now(),
    _stamp,
    _start,
    _duration,
    id = selection._id,
    transition;

    for (i=0,ln=groups.length;i<ln;i++) {
        group = groups[i];
        for (j=0,jln=group.length;j<jln;j++) {
            item = group[j];
            if (!item._c2_transition) {
                item._c2_transition = transition = {is_transition:true,id:id}
                transition.stamp = stamp;

                //_start = stamp + delay;
            } else if (item._c2_transition && item._c2_transition.id !== id) {
                stop_c2_transition(item);
                transition.stopped = false;
                transition.start = stamp + _delay;
                transition.id = id;
            } 

            if (delay_is_fn) {
                _delay = delay.call(item,item.__data__,j,group);
            } else {
                _delay = delay;
            }
            if (duration_is_fn) {
                _duration = duration.call(item,item.__data__,j,group);
            } else {
                _duration = duration;
            }

            //_stamp = undefined;
            _start =  item._c2_transition.stamp + _delay;
            _duration = _duration;
            _ease = ease;

            assign(item._c2_transition,_start,_duration,ease);

            //update_c2_transition(item,id,_delay,_duration,ease,_stamp);
        }
    }
    console.error('otime',new Date()-stamp);
    setTimeout(function () {
        console.error('h',transitions);
    });
}


function stop_c2_transition (transition) {
    if (transition.stopped) {
        return;
    }
    //console.error('stopping');
    var ease_group = transition.ease_group,ease_group_index=transition.ease_group_index,
    transition_group_index = transition.transition_group_index,
    duration_group = transition.duration_group,
    duration_group_index = transition.duration_group_index,
    start_group = transition.start_group,
    start_group_index = transition.start_group_index;

    //remove transition from transition_group
    //console.error(12,ease_group);
    if (ease_group) {
        if (ease_group.is_transition === true && ease_group === transition) {
            duration_group.cnt--;
            duration_group[ease_group_index-1]=undefined;
            ease_group = duration_group[ease_group_index]=undefined;
        } else {
            ease_group[transition_group_index] = undefined;
            ease_group.cnt--;
            if (ease_group.cnt === 0) {
                ease_group = duration_group[ease_group_index-1] = undefined;
                ease_group = duration_group[ease_group_index] = undefined;
                duration_group.cnt--;
            }
        }

        //check to see if the duration group can be removed
        if (duration_group.cnt === 0) {
            start_group[duration_group_index-1] = undefined;
            start_group[duration_group_index] = undefined;
            start_group.cnt--;
        }
        //check to see if the start group can be removed
        if (start_group.cnt === 0) {
            transitions[start_group_index-1] = undefined;
            transitions[start_group_index] = undefined;
        }
    }


    transition.stopped = true;
}

function find (value,array) {
    var i,ln;
    for (i=0,ln=array.length;i<ln;i+=2) {
        if (value === array[i]) {
            return i;
        }
    }
    return -1;
}

var transitions=[];
function assign (transition,start,duration,ease) {
    var s = new Date();
    start = start|0;
    var _transitions=transitions,i,ln,start_group,duration_group,ease_group,empty,value;

    //TODO this could be improved performance wise
    if (start !== transition.start || duration !== transition.duration || ease !== transition.ease) {
        //console.error('stop');
        stop_c2_transition(transition);
        transition.stopped = false;
    } else {
        return;
    }


    //first try and find the start in the root array
    empty = -1;
    for (i=0,ln=_transitions.length;i<ln;i+=2) {
        value = _transitions[i];
        if (value === start) {
            //console.error('found');
            start_group = _transitions[i+1];
            break;
        } else if (value === undefined) {
            empty = i;
        }
    }
    if (empty === -1) {
        empty = ln;
    }
    //console.error(i,empty,ln);
    if (i >= ln) {
        transition.start_group_index = empty+1;
        transitions[empty] = start;
        transitions[empty+1] = (transition.start_group=start_group = []);
        start_group.cnt=0;
    } else {
        transition.start_group = start_group;
        transition.start_group_index = i+1;
        //start_group.cnt++;
    }

    //next try and find the duration in the start group
    empty = -1;
    for (i=0,ln=start_group.length;i<ln;i+=2) {
        value = start_group[i];
        if (value === duration) {
            duration_group = start_group[i+1];
            break;
        } else if (value === undefined) {
            empty = i;
        }
    }
    if (empty === -1) {
        empty = ln;
    }
    if (i >= ln) {
        transition.duration_group_index = empty+1;
        start_group[empty] = duration;
        start_group[empty+1] = (transition.duration_group = duration_group = []);
        duration_group.cnt=0;
        start_group.cnt++;
    } else {
        transition.duration_group = duration_group;
        //duration_group.cnt++;
        transition.duration_group_index = i+1;
    }

    //next try and find the ease in the duration group
    if (empty === -1) {
        empty = ln;
    }
    //console.error(duration_group);
    for (i=0,ln=duration_group.length;i<ln;i+=2) {
        value = duration_group[i];
        //console.error(value);
        if (value === ease) {
            ease_group = duration_group[i+1];
            break;
        } else if (value === undefined) {
            empty = i;
        }
    }
    if (empty === -1) {
        empty = ln;
    }
    if (i >= ln) {
        //console.error(1);
        transition.ease_group_index = empty+1;
        duration_group[empty] = ease;
        duration_group[empty+1] = (transition.ease_group = ease_group = transition);
        transition.transition_group_index = 0;
        duration_group.cnt++;
    } else {
        //console.error('w',ease_group);

        if (ease_group.is_transition === true) {
            ease_group =  ease_group.ease_group = duration_group[i+1] =  [ease_group];
            ease_group.cnt=1;
        }
        transition.ease_group = ease_group;
        transition.ease_group_index = i+1;

        ease_group.cnt++;
        transition.transition_group_index = ease_group.push(transition)-1;
    }

    console.error('time',new Date() -s);
}


function update_c2_transition (item,id,delay,duration,ease,optionalStamp) {
/*
 *    var transition = item._c2_transition;;
 *
 *    var transition = item._c2_transition || (item._c2_transition = {}),
 *    start,start_group_index,start_group,duration_group;
 *    if ((optionalStamp !== undefined && transition.stamp !== optionalStamp) || delay !== transition.delay) {
 *        start = optionalStamp !== undefined && optionalStamp || transition.stamp - (-delay);
 *        start_group_index = transitions.indexOf(start);
 *        if (start_group_index === -1) {
 *            start_group_index = starts.push(start)-1;
 *            durations[start_group_index] = [];
 *        }
 *
 *        if (transition.start_group_index) {
 *            stop_c2_transition(transition);
 *        }
 *
 *        transition.start_group_index = start_group_index;
 *    }
 *
 *    duration_group = durations[start_group_index];
 *    if (duration !== undefined && duration !== transition.duration) {
 *        duration_group_index = durations.indexOf(duration);
 *        if (duration_group_index === -1) {
 *            duration_group_index = durations.push(duration)-1;
 *
 *        }
 *    }
 *
 *    transition.stopped = false;
 *
 *
 *    transition.id = id;
 *    transition.delay = delay;
 *    transition.duration = duration;
 *    transition.ease = ease;
 *    if (optionalStamp !== undefined) {
 *        transition.stamp = optionalStamp
 *    }
 */
}

window.transitionIds=1,
window.pending=[],
window.pending_cnt = 0,
//cleanup=[],
//cleanup_cnt = 0,
window.c2_timer_running = false;

d3.selection.prototype.transition;// = d3.transition.prototype.transition = c2_transition;

function c2_transition (name) {
    return new c2_Transition(this._groups,this._parents,name||'');
}
function c2_Transition (groups,parents,name) {
    //var i,ln,groups=this._groups,group,j,jln,item;
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = transitionIds++;
    this._pending = true;
    this._tweens  = [];
    this._tween_map = {};

    pending[pending_cnt++] = this;

    !c2_timer_running && (c2_timer_running = true,requestAnimationFrame(start_c2_timer));
}
c2_Transition.prototype = d3.transition()
c2_Transition.prototype.duration = function c2_duration (duration) {
    if (arguments.length) {
        if (this._started) {
            throw "Unsupported - transition already started";
        }
        this._duration = duration;
        return this;
    }
    return this._duration;
};
c2_Transition.prototype.delay = function c2_delay (delay) {
    if (arguments.length) {
        if (this._started) {
            throw "Unsupported - transition already started";
        }
        this._delay = delay;
        return this;
    } 
    return this._delay;
};
c2_Transition.prototype.ease = function c2_ease (ease) {
    //console.error('wtf');
    if (arguments.length) {
        if (this._started) {
            throw "Unsupported - transition already started";
        }
        this._ease = ease;
        return this;
    } 
    return this._ease;
};
c2_Transition.prototype.attr = function c2_tween (name,value) {
    if (arguments.length > 1) {
        return this.attrTween(name,value);
    } else {
        return this[name];
    }
};
c2_Transition.prototype.attrTween = function (name,value) {
    if (arguments.length > 1) {
        if (typeof value === 'function') {
            return this.tween('attr.'+name,function (d,i,g) {
                var me = this,
                v = value.call(this,d,i,g),
                s = this[name];

                if (typeof v === 'number' && typeof s === 'number') {
                    s = s || 0;
                    v -= s;
                    return function (t) {
                        me[name] = s+v*t;
                        me._invalid_ === false && me.invalidate();
                    };
                } else {
                    v = d3.interpolate(s,v);
                    return function (t) {
                        var m = me;
                        m[name] = v(t);
                        m._invalid_ === false && m.invalidate();
                        //me.setAttribute(name,interpolator(t));
                    };
                }
            });
        } 
        return this.tween('attr.'+name,function () {
            var me =this,
            interpolator = d3.interpolate(this[name],value);
            return function (t) {
                me[name] = interpolator(t);
                me._invalid_ === false && me.invalidate();
            };
        });
    } else {
        return this.tween(name);
    }
}
c2_Transition.prototype.attr2 = function c2_tween (name,value) {
    if (arguments.length > 1) {
        if (typeof value === 'function') {
            return this.tween('attr.'+name,(0,eval)(`(function (value) {return function (d,i,g) {
                var me = this,
                interpolator = d3.interpolate(this["`+name+`"],value.call(this,d,i,g));
                return function (t) {
                    me["`+name+`"] = interpolator(t);
                    me._invalid_ === false && me.invalidate();
                    //me.setAttribute(name,interpolator(t));
                };
            }})`)(value));
        } 
        return this.tween('attr.'+name,function () {
            var me =this,
            interpolator = d3.interpolate(this[name],value);
            return function (t) {
                me[name] = interpolator(t);
                me._invalid_ === false && me.invalidate();
            };
        });
    } else {
        return this[name];
    }
}
c2_Transition.prototype.tween = function c2_tween (name,tween) {
    //console.error('what');
    //console.error(name,tween);
    if (this._started) {
        throw "Unsupported - transition already started";
    }
    if (arguments.length > 1) {
        if (index=this._tween_map[name]) {
            this._tweens[index] = tween;
        } else {
            this._tween_map[name] = this._tweens.push(tween)-1;
        }
    } else {
        return this._tweens[this._tween_map[name]] || null;
    }
    return this;
}
c2_Transition.prototype._duration = 250;
c2_Transition.prototype._delay = 0;
c2_Transition.prototype._ease = d3.easeCubicInOut;


//tgs_cnt=0
function add_pending (date) {
    var i,ln,j,jln,k,kln,m,mln,groups,group,item,tween_group,tweens,
    delay,duration,ease,_delay,_duration,delay_is_fn,duration_is_fn,
    _ease_groups = ease_groups,
    _pending = pending,
    _tweens,_name,twln,
    ease_group,
    names,
    start_duration_key,
    available_start_cnt = available_start_indices.length,
    index,
    stamp = date,
    selection;

    //return;
    for (i=0,ln=pending_cnt;i<ln;i++) {
        selection = _pending[i];
        selection._started = true;
        groups = selection._groups;
        _delay = selection._delay;
        _duration = selection._duration;
        _tweens = selection._tweens;
        _name = selection._name;
        //console.error(selection);

        ease = selection._ease;

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
                                tween_group[tweens[m]] = false;
                            }

                            if (tween_group.cnt !== 0 && (tween_group.cnt -= mln) <= 0 ) {
                                console.error('stopping');

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
                    if (delay_is_fn === true) {
                        delay = stamp+_delay.call(item,item.__data__,k,group);
                    } else {
                        delay = stamp+_delay;
                    }
                    if (duration_is_fn === true) {
                        duration = _duration.call(item,item.__data__,k,group);
                    } else {
                        duration = _duration;
                    }
                    start_duration_key = delay + '-' + duration;
                    if ( !(ease_group = start_duration_map[start_duration_key])) {
                        if (available_start_cnt > 0) {
                            available_start_cnt--;
                            index = available_start_indices.shift();
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
                    if (names === undefined) {
                        names = item._c2_transition = {};
                    }
                    //if ((tweens = names[_name]) === undefined) {
                        tweens = names[_name] = [];
                        tweens.tween_group = tween_group;
                    //}
                    for (m=0,mln=_tweens.length;m<mln;m++) {
                        tweens[m] = tween_group.push(_tweens[m].call(item,item.__data__,m,group))-1;
                    }
                    tween_group.cnt += mln;
                }
            }
        }
        _pending[i] = undefined;
    }
    pending_cnt=0;
    console.error(new Date()-stamp);
}

function start_c2_timer () {
    var i,ln,j,jln,group,groups,g,
    k,kln,m,mln,
    item,
    date = Date.now(),
    start = 0,
    t=0,
    ease_value,
    duration,tween,
    tweens,tween_group,
    cleanup = false;
    //first check pending
    if (ln = pending_cnt) {
        add_pending(date);
    }

    //return;
    //return;
    if (start_duration_end_index > 0) {
        for (i=0,j=0,g=0,ln=start_duration_end_index;i<ln;i++,g++) {
            start = start_durations[i++];
            if (start !== -1 && date > start) {
                duration = start_durations[i];
                if (duration > 0) {
                    t = (date-start) / duration; 
                    t >= 1 && (t = 1);
                    if (group = ease_groups[g]) {
                        for (j=0,jln=group.length;j<jln;j++,j++) {
                            //console.error(group);
                            //console.error(group[j]);
                            //console.error(group[j-1],ease_value);
                            //console.error('h',ease_value);
                            tweens = group[j+1];
                            //console.error(tweens);
                            if ( kln=tweens.length) {
                                ease_value = group[j](t);
                                //console.error(tweens[3]);
                                for (k=0;k<kln;k++) {
                                    (tween = tweens[k]) && tween(ease_value);
                                    //console.error(tween);
                                }
                            }
                        }
                    }
                } else {
                    t = 1;
                }
                if (t === 1) {
                    available_start_indices.push(i-1);
                    delete start_duration_map[start_durations[i-1]+'-'+start_durations[i]];
                    start_durations[i-1] =  start_durations[i] = -1;
                    ease_groups[g] = false;
                    //ease_groups[g].length = 0;
                    i === start_duration_end_index && (cleanup = true);
                }
            }
        }
        if (cleanup === true) {
            //update end_index
            for (i=start_duration_end_index;i>=-1;i--) {
                if (start_durations[i] !== -1) {
                    start_duration_end_index = i;
                    break;
                    //return;
                }
            }
        }
    }

    console.error(new Date()-date);
    if (pending_cnt > 0 || start_duration_end_index > 0) {
        requestAnimationFrame(start_c2_timer);
    } else {
        c2_timer_running = false;
    }
}


window.start_durations=[],
window.available_start_indices=[],
window.start_duration_end_index=-1,
window.ease_groups = [],
window.start_duration_map = {};


function update_c2_transition (selection,delay,duration,ease,tween) {
    var groups = selection._groups,
    i,ln,j,jln,
    id = selection._id,
    start_indices_cnt = available_start_indices.length,
    start_durations_cnt = start_durations.length,
    group,
    node,
    stamp = this._stamp || (this._stamp = new Date()),
    delay_is_fn = typeof delay === 'function',
    duration_is_fn = typeof duration === 'function',
    ease_group,
    transition,
    map_id,
    _tween,
    _delay,_duration;

    for (j=0,jln=groups.length;j<jln;j++) {
        group = groups[j];
        for (i=0,ln=group.length;i<ln;i++) {
            node = group[i];
            if (delay_is_fn === true) {
                _delay = delay.call(node,node.__data__,i,group);
            }
            if (duration_is_fn === true) {
                _duration = duration.call(node,node.__data__,i,group);
            }
            map_id = ""+_delay + '-' + _duration;
            if ((ease_group = start_duration_map[map_id]) === undefined) {
                start_duration_map[map_id] = (ease_group=[]);
                if (start_indices_cnt > 0) {
                    start_indices_cnt--;
                    index = available_start_indices.pop();
                } else {
                    index = start_durations_cnt;
                }
                start_durations[index]=_delay;
                start_durations[index+1]=_duration;
                ease_groups[index/2]=ease_group;
                //ease_groups[index+1]=[];
                //fill first available
            }
            index = ease_group.indexOf(ease);
            //_tween = tween.call(node,node.__data__,i,group);

            if (node._c2_transition_id !== id) {
                node._c2_transition.stopped = true;
                node._c2_transition=[];
            } else {

            }

            /*
             *transition = [tween];
             *transition
             *    tween : tween,
             *    id : id,
             *    stopped : false
             *]
             */

            if (index === -1) {
                ease_group.push(ease,[]);
            } else {
                ease_group
            }
            //add to ease_group with easeFn and transition
        }
    }

}

/*
 *function c2_duration (duration) {
 *    if (arguments.length) {
 *        this._duration = duration
 *    }
 *    var duration,delay,ease;
 *    if (this._duration !== undefined) {
 *        duration = this._duration;
 *    } else {
 *        duration = 250;
 *    }
 *    if (this._delay !== undefined) {
 *        delay = this._delay;
 *    } else {
 *        delay = 0;
 *    }
 *    if (this._ease !== undefined) {
 *        ease = this._ease;
 *    } else {
 *        ease = d3.easeCubicInOut;
 *    }
 *    Transition.duration.apply(this,arguments);
 *    c2_group_duration_delay_ease(this,duration,delay,ease);
 *    return this;
 *}
 *function c2_ease (ease) {
 *    if (arguments.length) {
 *        this._ease = ease;
 *    }
 *    var duration,delay,ease;
 *    if (this._duration !== undefined) {
 *        duration = this._duration;
 *    } else {
 *        duration = 250;
 *    }
 *    if (this._delay !== undefined) {
 *        delay = this._delay;
 *    } else {
 *        delay = 0;
 *    }
 *    if (this._ease !== undefined) {
 *        ease = this._ease;
 *    } else {
 *        ease = d3.easeCubicInOut;
 *    }
 *    Transition.ease.apply(this,arguments);
 *    c2_group_duration_delay_ease(this,duration,delay,ease);
 *    return this;
 *}
 *function c2_delay (delay) {
 *    if (arguments.length) {
 *        this._delay = delay;
 *    }
 *    var duration,delay,ease;
 *    if (this._duration !== undefined) {
 *        duration = this._duration;
 *    } else {
 *        duration = 250;
 *    }
 *    if (this._delay !== undefined) {
 *        delay = this._delay;
 *    } else {
 *        delay = 0;
 *    }
 *    if (this._ease !== undefined) {
 *        ease = this._ease;
 *    } else {
 *        ease = d3.easeCubicInOut;
 *    }
 *    Transition.delay.apply(this,arguments);
 *    c2_group_duration_delay_ease(this,duration,delay,ease);
 *    return this;
 *}
 */


