var 
invalid_parents = [],
invalid_cleanup = [];

invalid_parents.index = invalid_cleanup.index = 0;

function c2_invalidate () {

    c2_invalidate.timeout = false;

    if (!c2_invalidate.t2) {
        c2_invalidate.t2 = requestAnimationFrame(c2_do_invalidate);
    }

}
function c2_do_invalidate () {
    var parents = invalid_parents,
    cleanup = invalid_cleanup,
    item;

    c2_invalidate.t2 = false;
    for (var i=0,ln=parents.index|0;i<ln;i++) {
        parents[i].render();
    }
    parents.index=0;
    for (i=0,ln=cleanup.index|0;i<ln;i++) {
        item = cleanup[i];
        item._invalid_ = false;
        if (item.__changed__ !== undefined) {
            item.__changed__.length = 0;
        }
    }

    cleanup.index  = 0;
}
c2_invalidate.timeout = false;
c2_invalidate.parents = invalid_parents;
c2_invalidate.cleanup = invalid_cleanup;


module.exports = c2_invalidate;
