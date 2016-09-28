
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


