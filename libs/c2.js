const c2 = function c2 () {
};
c2.animate = require ('./Animate');

function install (d3) {
    c2.d3 = d3;
    const select = d3.selection.prototype.select,
    selectAll = d3.selection.prototype.selectAll;
    d3.selection.prototype.select = function () {
        c2._$selection = true;
        const result = select.apply(this,arguments);
        c2._$selection = false;
        return result;
    };
    d3.selection.prototype.selectAll = function () {
        c2._$selectionAll = true;
        const result = selectAll.apply(this,arguments);
        c2._$selectionAll = false;
        return result;
    };
}

c2.install = install;
install(d3);


//exposed instances
c2.types = require('./Types');
c2.registry = require('./Registry');
c2.invalidator = require('./Invalidate');
c2.types = require('./Types');
c2.animate = require ('./Animate');

//exposed classes
 c2.Base = require('./Base');
c2.createElement = require('./createElement');
c2.Element = require('./Element');
c2.element = c2.create = function c2_create (render) {
    return (class Temp extends c2.Element {
        constructor () {
            super();
        }
    }).render(render)
};
//deprecated aliasing
c2.Context2d = require('./2d/Context');
c2.ContextWebGL = require('./WebGL/Context');

//exposed packages
c2['2d'] = require('./2d');
c2.WebGL = require('./WebGL');
 
module.exports = c2;
