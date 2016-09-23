var 
invalid_parents = [],
invalid_cleanup = [],
invalid_children = [];

invalid_children.index = invalid_parents.index = invalid_cleanup.index = 0;

function c2_invalidate () {

    c2_invalidate.timeout = false;

    if (!c2_invalidate.t2) {
        c2_invalidate.t2 = requestAnimationFrame(c2_do_invalidate);
    }

}
function c2_do_cleanup () {}
function c2_do_invalidate () {
    c2_invalidate.t2 = false;

    var parents = invalid_parents,
    cleanup = invalid_cleanup,
    children = invalid_children,
    j,jln,c=0,k,
    items,
    item;

    for (i=0,ln=children.length;i<ln;i++) {
        item = children[i];
        items = item.children;
        for (j=k=item._invalid_children_,cnt=0,jln=items.length;k<jln;j++,k++) {
            item  = items[k]
            if (item === undefined) {
                while (item === undefined && k < jln) {
                    c++;
                    item = items[++k];
                }
                //if (c > 0) {
                    //items[j] = items[k];
                //}
            }
            if (c > 0 && (item)) {
                items[j] = item;//items[k];
                item.parentIndex = j;
            }
        }
        children[i]._invalid_children_ = -1;
        //console.error('removing',items.length,c,k-j);
        if (items.length) {
            items.length-=(k-j);
        }
    }
    children.index=0;



    //var start = new Date();
    for (var i=0,ln=parents.index|0;i<ln;i++) {
        parents[i].render();
    }
    //console.error('d',new Date() - start);

    parents.index=0;
    for (i=0,ln=cleanup.index|0;i<ln;i++) {
        item = cleanup[i];
        item._invalid_ = 0;
        if (item.__changed__ !== undefined) {
            item.__changed__.length = 0;
        }
    }

    cleanup.index  = 0;
}
c2_invalidate.timeout = false;
c2_invalidate.parents = invalid_parents;
c2_invalidate.cleanup = invalid_cleanup;
c2_invalidate.children = invalid_children;


module.exports = c2_invalidate;
