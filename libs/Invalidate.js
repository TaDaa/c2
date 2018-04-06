
const invalid_parents = [],
invalid_cleanup = [],
invalid_children = [],
frame = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout;

var calculate,
in_frame = false,
waiting_calculate = false,
scheduled_next,
recheck;

invalid_children.index = invalid_parents.index = invalid_cleanup.index = 0;

function c2_invalidate () {
    if (!c2_invalidate.scheduled_next) {
        c2_invalidate.scheduled_next = true;
        //scheduled_next = true;
        //c2_invalidate.t2 = true;
        //scheduled_next = true;
        //c2_do_invalidate();
        frame(c2_frame_invalidator);
    }
}
c2_invalidate.scheduled_next=false;

function c2_frame_invalidator () {
    c2_invalidate.scheduled_next = false;
    in_frame = true;
    recheck = false;
    if (calculate) {
        const fn = calculate;
        calculate = false;
        fn();
    }
    c2_do_invalidate();
    in_frame = false;
}

c2_invalidate.nextCalculate = function (fn) {
    if (calculate) {
        return;
    }
    calculate = fn;
    c2_invalidate();
}


var last=0;
function c2_do_invalidate () {
    var start = new Date();
    //console.error('f',new Date()-last);

    var parents = invalid_parents,
    cleanup = invalid_cleanup,
    children = invalid_children,
    j,jln,c=0,k,i,ln,
    items,
    cnt,
    item;

    for (i=0,ln=children.index;i<ln;i++) {
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
    //last = new Date();
}
c2_invalidate.timeout = false;
c2_invalidate.parents = invalid_parents;
c2_invalidate.cleanup = invalid_cleanup;
c2_invalidate.children = invalid_children;


module.exports = c2_invalidate;
