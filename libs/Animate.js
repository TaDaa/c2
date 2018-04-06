const d3 = require("d3");
const Types = require('./Types'),
float = Types.float,
int = Types.int;

module.exports = function (selection) {
    return new c2_Animate(selection);
};
module.exports.remove = function (item) {
    const transition = item._c2_transition;
    var p,tweens,tween_group,i,ln;

    for (p in transition) {
        tweens = transition[p];
        tween_group = tweens.tween_group;
        
        //TODO if tweens onEnd/remove - remove tweens from eventGroup
        if (tweens.end_index !== -1) {
            tweens.end_group[tweens.end_index] =0;
        }
        for (i=0,ln=tweens.length;i<ln;i++) {
            tween_group[tweens[i]] = 0;
        }

        if (tween_group.cnt !== 0 && (tween_group.cnt -= ln) <= 0 ) {
            tween_group.cnt=tween_group.length=0;
        }
    }
    item._c2_transition = false;
    return module.exports;
}

//default d3 ease,delay,duration function
const 
invalidate = require('./Invalidate'),
DEFAULT_EASE = function easeCubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
},
DEFAULT_DELAY = 0,
DEFAULT_DURATION = 250,
isChrome =  typeof navigator !== 'undefined' && /Chrome/.test(navigator.userAgent);



//var animateIds=1;
function c2_Animate (name) {

    function animation (selection) {
        var compiled;
        if (animation._to && (compiled = animation._compile(selection))) {
            //animation._id = Object.keys(animation._to).map()
            animation.tween('',compiled);
        }
        //if (animation._to && (compiled = animation._compile(selection))) {
            //animation.tween('',compiled);
        //}
        pending[pending_cnt++] = {
            'selection' : selection,
            'animation' : animation
        };
        !c2_timer_running && (c2_timer_running = true,invalidate.nextCalculate(start_c2_timer));
        //!c2_timer_running && (c2_timer_running = true,setTimeout(start_c2_timer));
        //!c2_timer_running && (c2_timer_running = true,requestAnimationFrame(start_c2_timer));
    }
    //animation._id = animateIds++;
    animation._name = name || '';
    animation._ease = DEFAULT_EASE;
    animation._delay = DEFAULT_DELAY;
    animation._duration = DEFAULT_DURATION;
    animation._tween_map={};
    //animation._to = {};
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

    animation.remove = c2_remove;

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
    //i think we can just hook into event system by passing an additional tween that only does something
    //when t === 1, the only issue i see is that this woudl exist for all nodes -- if we use id like d3.transition,
    //because each node needs a delay and duration - which means every node could be removed at a different time
    if (name === 'end') {
        !this._on_end && (this._on_end = [fn]) || this._on_end.push(fn);
    } else if (name === 'start') {
        !this._on_start && (this._on_start = [fn]) || this._on_start.push(fn);
    }
    return this;
}

//further optimize by compiling animations per prototype
function c2_compile_proto (item,id,keys,values) {
    if (item.constructor._compiled && item.constructor._compiled[id]) {
        return this._compiled[id];
    }

    var vars=['var me=this'],vars2=[],interpolators=[],tween=[],compiled,key,value,attr,is_num,s,result,
    s_inner;

    if (!(compiled=item.constructor._compiled)) {
        compiled = item.constructor._compiled = {};
    }

    for (var i=0,ln=keys.length;i<ln;i++) {
        key = keys[i];
        value = values[i];
        attr = item.constructor._attributes[key];
        is_num = attr === Types.float || attr === Types.int;
        vars.push(
            `v${i}=${typeof value === 'function' ? attr.animateValue`to["${key}"].call(this,d,i)` : attr.animateValue`${value}`}`,
            //`v${cnt}=typeof to["${key}"] === function ? ${attr.animateValue`to["${key}"].call(this,d,i)`} : ${attr.animateValue`to["${key}"]`}`,
            `s${i}=${attr.animateValue`this["${key}"]`}`
        );
        vars2.push(`v${i}`,`s${i}`);

        interpolators.push(
            is_num ? `s${i}=s${i}||0;v${i}-=s${i};` : `v${i}=${attr.animateValue`d3.interpolate(s${i},v${i});`}`
        );
        tween.push(
            is_num ? `n=(s${i}+v${i}*t);` : `n=v${i}(t);`,
            //is_num ? `me["${key}"]=s${i}+v${i}*t;` : `me["${key}"]=${attr.animateValue`v${i}(t)`}`
            `n!==me["${key}"] && (me["${key}"]=${attr.animateValue`n`},!c && (c=true));`
        );
    }
    s_inner = `var n,c=false;
            ${tween.join('')};
            c && ((me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_)) && me.invalidate();`;
    if (isChrome) {
        //s = new Function('t','me',...vars2,s_inner);
        s = (0,eval)(`(function () {
            return function (t,me,${vars2.join(',')}) {
                ${s_inner};
            }
        })`)();
    }
    //problem we are seeing is the amount of garbage accrued in high volume due to scoped functions
    //result = (0,eval)(`(function (${isChrome && 's,' || '' }d3) {
    //result = (eval)(`(function (s) {
    //result = new Function('s',`
    result = (0,eval)(`(function (s) {
        return function (to,d,i) {
            ${vars.join(',')};
            ${interpolators.join('')}
            return function (t) {
                ${isChrome && `s(t,me,${vars2.join(',')})` || s_inner};
            };
        }
    })`)(s)

    //result.s = s;
    //window.values = values;
    //window.s = s;
    //compiled[id] = result;
    //result = isChrome && result(s,d3) || result(d3);
    //result.values = values;
    //console.error(result);

    return (compiled[id] = result);

}
function c2_compile () {
    const to = this._to,keys = Object.keys(to), values = Object.values(to);
    var id = keys.length ? `${keys[0]}=${typeof values[0] === 'function' && '@' || values[0]}` : '';
    for (var i=1,ln=keys.length;i<ln;i++) {
        id += `&${keys[i]}=${typeof values[i] === 'function' && '@' || values[i]}`
    }
    return function (d,i) {
        var fn;
        if (this.constructor._compiled && this.constructor._compiled[id]) {
            fn = this.constructor._compiled[id];
            return this.constructor._compiled[id].call(this,to,d,i);
        } else {
            return c2_compile_proto(this,id,keys,values).call(this,to,d,i);
        }
        return fn.call(this,to,d,i);
    };
}
//TODO we need to separate the on_end and remove logic from compile and either put it into tween or hook it directly into 
//the scheduler
function c2_compile3 () {
    var p,to=this._to,result='(function (to,s,d3) {return function (d,i) {',
    vars = ['var me=this'],
    vars2 = [],
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
    //right now tween is a function -- we want to try the following
    //[ln,property,v,t,s,instance,] //instance comes from parent -- shoudl be uneeded


    for (p in to) {
        compiled[p] = to[p];
        vars.push(
            'v'+(cnt)+'='+ (typeof to[p] === 'function' && 'to["'+p+'"].call(this,d,i)'||'to["'+p+'"]'),
            't'+(cnt)+'=typeof v'+cnt+' === "number"',
            's'+cnt+'=this["'+p+'"]'
        );
        vars2.push('v'+cnt,'t'+cnt,'s'+cnt);
        interpolators.push(
            'if (t'+cnt+') {s'+cnt+'=s'+cnt+'||0;v'+cnt+'-=s'+cnt+';} else {v'+cnt+'=d3.interpolate(s'+cnt+',v'+cnt+');}'
        );
        //tween.push ('if (t'+cnt+') me["'+p+'"]=s'+cnt+'+v'+cnt+'*t; else me["'+p+'"]=v'+cnt+'(t);');
        tween.push ('if (t'+cnt+') n=s'+cnt+'+v'+cnt+'*t; else n=v'+cnt+'(t); n!==me["'+p+'"] && (me["'+p+'"]=n,!c && (c=true));');
        cnt++;
    }
    var s = (0,eval)(`
        (function (t,me,d3,${vars2.join(',')}) {var n,c=false;
                ${tween.join('')};
            c && ((me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_)) && me.invalidate();
        })
    `);
    /*
     *s2 = (0,eval)(`(function (t) {
     *    s(t,this,${vars2.join(',')});
     *})`)
     */
//shared2 = function (t,);
    result += vars.join(',') + ';';
    result += interpolators.join('');
    result += isChrome ? `return function (t) {s(t,me,d3,${vars2.join(',')})};` : 
     `return function (t) {var n,c=false;
        ${tween.join('')};
        c && ((me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_)) && me.invalidate();
    }`
    //result += 'return function (t) {';
        //vars2.join(',') + ';';

    //result += tween.join('');
    //result += '(me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_) && me._invalidate();'
    //result += 'm._not_invalid_&&m.parentNode &&m._invalidate();';
    //result += 'm._invalidate();';
    //result += '}';
    //result += `return shared.bind(me,t,me,${vars2.join(',')})`
    //result += 'return function () {}'

    result += '}})';
    return this._compiled_fn = (0,eval)(result)(to,s,c2.d3);
}

function c2_compile2 () {
    var p,v, to = this._to,tod=[Object.keys(to).length*4,'this'];
    for (p in to) {
        v = to[p];
        tod.push(
            //t
            '(v=' + (typeof v === 'function' && `to["${p}"].call(this,d,i)` || `to["${p}"]`) + `,t=(typeof v === 'number'))`,
            //s
            `s = this["${p}"]`,
            //v
            `t?(v-=s):d3.interpolate(s,v)`,
            //t
            `"${p}"`
        );
    }
    return this._compiled_fn = eval(`(function (d,i) {
        var s,v,t;
        return [${tod.join(',\n')}];
    })`)
}

function c2_to (name,value) {
    if (!this._to) {
        this._to = {};
    }
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
//TODO animation chaining
function c2_animate_Animate () {
    //var animate = c2_Animate();
    //this.on('end',function () {
        //add ended nodes
    //})
}


//probably do some variation of to2 in each statement (groups of 1ish)
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
    var index;
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


var start_durations=[],
available_start_indices=[],
available_invalid = true,
ordered_available = [],
ordered_available_cnt=0,
ordered_available_start=0,
start_duration_end_index=-1,
start_duration_start_index=0,
ease_groups = [],
pending=[],
pending_cnt = 0,
start_duration_map = {},
c2_timer_running = false;


function add_pending (date) {
    var i,ln,j,jln,k,kln,m,mln,groups,group,item,tween_group,tweens,
    delay,duration,ease,_delay,_duration,delay_is_fn,duration_is_fn,
    _ease_groups = ease_groups,
    _pending = pending,
    _tweens,_name,
    _remove,
    _end,
    ease_group,
    names,
    endGroup,
    start_duration_key,
    index,
    stamp = date,
    animation,
    bundle,
    selection;

    if (start_duration_end_index === -1) {
        if (available_invalid) {
            available_invalid = false;
            ordered_available_start=ordered_available_cnt=0;
        }
    } else if (available_invalid) {
        available_invalid = false;
        if (start_duration_end_index===-1) {
            ordered_available_start=ordered_available_cnt=0;
        } else {
            ordered_available_start=ordered_available_cnt=0;
            for (i=start_duration_start_index/2,ln=(start_duration_end_index+1)/2;i<ln;i++) {
                if (available_start_indices[i]) {
                    ordered_available[ordered_available_cnt++]=i*2;
                }
            }
        }
    }
    for (i=0,ln=pending_cnt;i<ln;i++) {
        bundle = _pending[i];
        animation = bundle.animation;
        selection = bundle.selection;
        selection._started = true;
        groups = selection._groups;
        _delay = animation._delay;
        _duration = animation._duration;
        _tweens = animation._tweens;
        _name = animation._name;
        _remove = animation._remove;
        _end = animation._on_end;

        ease = animation._ease;

        delay_is_fn = typeof _delay === 'function';
        duration_is_fn = typeof _duration === 'function';

        for (j=0,jln=groups.length;j<jln;j++) {
            group = groups[j];
            for (k=0,kln=group.length;k<kln;k++) {
                if (item = group[k]) {
                    if (names = item._c2_transition) {
                        if (tweens = names[_name]) {
                            tween_group = tweens.tween_group;

                            //TODO if tweens onEnd/remove - remove tweens from eventGroup
                            if (tweens.end_index !== -1) {
                                tweens.end_group[tweens.end_index]=0;
                            }

                            for (m=0,mln=tweens.length;m<mln;m++) {
                                tween_group[tweens[m]] = 0;
                            }

                            if (tween_group.cnt !== 0 && (tween_group.cnt -= mln) <= 0 ) {
                                tween_group.cnt=tween_group.length=0;
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
                        if (ordered_available_cnt) {
                            index = ordered_available[ordered_available_start++];
                            ordered_available_cnt--;
                            available_start_indices[index/2]=0;
                        } else if (start_duration_start_index > 0) {
                            index = start_duration_start_index-=2;
                            available_start_indices[index/2]=0;
                        } else {
                            index = (start_duration_end_index+=2)-1;
                            available_start_indices[index/2]=0;
                        }

                        //undefined is for the event group, which may or may not exist
                        ease_group = _ease_groups[index/2] = start_duration_map[start_duration_key] = [undefined,ease,tween_group=[]]; 
                        tween_group.cnt =0;

                        start_durations[index] =  delay;
                        start_durations[++index] = duration;
                        //if (index > start_duration_end_index) {
                            //start_duration_end_index = index;
                        //}

                    } else {
                        index = ease_group.indexOf(ease);
                        if (index !== -1) {
                            tween_group = ease_group[index+1];
                        } else {
                            ease_group.push(ease,tween_group=[]);
                            tween_group.cnt=0;
                        }
                    }
                    names = item._c2_transition;
                    if (!names) {
                        names = item._c2_transition = {};
                    }
                    tweens = names[_name] = new Array(_tweens.length);
                    tweens.tween_group = tween_group;
                    tweens.node = item;
                    if (_remove || _end) {
                        tweens.remove = _remove;
                        tweens.end = _end;
                        tweens.index = k;
                        if (!(endGroup = ease_group[0])) {
                            tweens.end_group = ease_group[0] = [tweens];
                            tweens.end_index = 0;
                        } else {
                            tweens.end_index = endGroup.push(tweens)-1;
                            tweens.end_group = endGroup;
                        }
                    } else {
                        tweens.end_index=-1;
                    }

                    //TODO --

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
    var i,ln,j,jln,group,g,
    k,kln,end,
    item,
    date = Date.now(),
    start = 0,
    t=0,e=0,
    ease_value,
    duration,tween,
    tweens,
    cleanup = 0,
    cleanup_start,cleanup_end,
    n=0;
    //sd=Date.now()

    //first check pending
    if ( pending_cnt) {
        //console.error('add');
        add_pending(date);
    }

    //console.error(start_duration_start_index,start_duration_end_index);
    if (start_duration_end_index > 0) {
        for (i=start_duration_start_index,j=0,g=i/2,ln=start_duration_end_index;i<ln;g++,i=g<<1) {
            n=i+1;
            //,n=i+1
            start = start_durations[i];
            if (start !== -1 && date > start) {
                duration = start_durations[n];
                if (duration > 0) {
                    t = (date-start) / duration; 
                    (t >= 1) && (e = t = 1);
                    if (group = ease_groups[g]) {
                        for (j=1,jln=group.length;j<jln;j+=2) {
                            tweens = group[j+1]
                            if (kln=tweens.length) {
                               ease_value = group[j](t);
                               for (k=0,kln=tweens.length;k<kln;k++) {
                                   if (tween = tweens[k]) {
                                       tween(ease_value)
                                   }
                                   //(tween = tweens[k]) && tween(ease_value);
                               }
                            }
                        }
                    }
                } else {
                    e=1;
                }
                if (e) {
                    e=0;
                    !available_invalid && (available_invalid = true);
                    available_start_indices[g]=1;
                    if (group=group[0]) {
                        for (j=0,jln=group.length;j<jln;j++) {
                            if (tweens=group[j]) {
                                item = tweens.node;
                                item._c2_transition = null;
                                if (end=tweens.end) {
                                    for (k=0,kln=end.length;k<kln;k++) {
                                        end[k].call(item,item.__data__,tweens.index);
                                    }
                                }
                                if (tweens.remove) {
                                    item.parentNode && item.parentNode.removeChild(item);
                                }
                            }
                        }
                    }
                    delete start_duration_map[start_durations[i]+'-'+start_durations[n]];
                    start_durations[i] =  start_durations[n] = -1;
                    ease_groups[g] = null;
                    if (n === start_duration_end_index) {
                        cleanup = cleanup_end = true;
                    } 
                    if (i === start_duration_start_index) {
                        cleanup = cleanup_start = true;
                    }
                }
            }
        }
        if (cleanup) {
            if (cleanup_end) {
                for (i=start_duration_end_index-1;i>=start_duration_start_index;i-=2) {
                    if (start_durations[i] !== -1) {
                        start_duration_end_index = i+1;
                        break;
                    }
                }
                if (i<start_duration_start_index) { start_duration_end_index=-1;console.error('done')};
            }
            //update start index
            if (cleanup_start) {
                for (i=start_duration_start_index;i<=start_duration_end_index;i+=2) {
                    if (start_durations[i] !== -1) {
                        //console.error('updated?',i);
                        start_duration_start_index = i;
                        break;
                    }
                }
                if (i>start_duration_end_index || start_duration_start_index < 0) start_duration_start_index =0;
            } 
        }
    }
    //console.error(new Date() - date);

    if (pending_cnt > 0 || start_duration_end_index > 0) {
        //requestAnimationFrame(start_c2_timer);
        invalidate.nextCalculate(start_c2_timer);
    } else {
        c2_timer_running = false;
    }
}


