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
