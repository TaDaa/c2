
module.exports = function (selection) {
    return new c2_Animate(selection);
};

//default d3 ease,delay,duration function
var DEFAULT_EASE = function easeCubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
},
invalidate = require('./Invalidate'),
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


