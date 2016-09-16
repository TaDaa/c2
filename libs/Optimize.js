var Drawable = require('./Drawable.js'),
Base=require('./Base');
module.exports = function (selection) {
    var transition;
    if (!selection._c2_optimize) {
        selection._c2_optimize = true;
        selection._c2_attr_hook =selection.attr;
        if (selection.tween) {
            selection.attr = c2_optimize_transition_attr;
            selection.attrTween = c2_optimize_transition_attrTween;
        } else {
            selection.attr = c2_optimize_attr;
        }
        selection._c2_transition_hook = selection.transition;
        selection.transition = c2_optimize_transition;
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
    eval(`
        this.tween("`+'attr.'+name+`",function (d,i,g) {
            var tick = value.call(this,d,i,g),
            node,
            interpolator;
            if (typeof tick !== 'function') {
                return;
            } else {
                node = this;
                interpolator = d3.interpolate(this["`+name+`"],result);
                return function (t) {
                    n["`+name+`"]=tick(t);
                    n._invalid_ === false && node.invalidate();
                };
            }
        });
        `)
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

function c2_optimize_transition_attr (name,value) {
    //if (!this.c2_interpolators) {
        var me=this,
        last_t,
        //last=0,
        interpolators = {
            numbers:[],
            all:[]
        },
        c2_tick = function (t) {
            if (t !== last_t) {
                last_t=t;
                setTimeout(function () {c2_process(t,interpolators)});
            }
        },
        id = this._id,
        c2_process = (0,eval)(`(function c2_process (t,interpolators) {
                //var start = new Date();
                var all = interpolators.all,
                numbers = interpolators.numbers,
                n;
                for (var i=0,ln=numbers.length,item;i<ln;i++) {
                    n = numbers[i++];
                    if (n.__transition && n.__transition[`+id+`]) {
                        //n.setAttribute("`+name+`",+numbers[i++]+numbers[i]*t);
                        n["`+name+`"]=numbers[i++]+numbers[i]*t;
                        `+Base.prototype.invalidate2.compiled+`
                    }
                }
                for (var i=0,ln=all.length,item;i<ln;i++) {
                    item = all[i];
                    n = item.n;
                    if (n.__transition && n.__transition[`+id+`]) {
                        //n.setAttribute("`+name+`",item(t));
                        n["`+name+`"] = item(t);
                        `+Base.prototype.invalidate2.compiled+`
                    }
                }
                //console.error(new Date()-start);
        })`)



    this.tween("attr."+name,function (d,i) {
        var interpolator,
        c=this[name],
        v=value,
        me = this;
        if (typeof v === 'function') {
            v = v.call(this,d,i);
        }
        if (typeof v === 'number' && typeof c === 'number') {
            interpolators.numbers.push(this,c,v-c);
        } else {
            interpolator = d3.interpolate(c,v);
            interpolator.n = this;
            interpolators.all.push(interpolator);
        }
        return c2_tick;
    });
    
    return this;
}
