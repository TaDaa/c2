# C2

C2 is a helper library for creating custom components that render to canvas.  Currently c2 is only compatible with D3 v4.  

C2 works by allowing you to define custom element tags that are intended to render to canvas.

For example:
```
//define custom component tag

var Rect = c2.element(function (context) {
  context.fillRect(this.x,this.y,this.width,this.height);
}).attributes({
  x : c2.types.float,
  y : c2.types.float,
  width: c2.types.float,
  height : c2.types.float
});

//the attributes method above is used to compile optimized setAttribute 
//and getAttribute functions.  Attributes are also used by c2.animate to
//generate optimized tweening functions.  

//c2.animate is uses its own internal scheduler, groups tweens by
//start/duration/easing and is generally faster than d3.transition
//as well as being easier on the garbage collector.





//c2.Context2d is a custom tag provided by c2 that selects the 2d context from a canvas element

var context = d3.select('canvas').select(c2.Context2d);
var selection = context.selectAll(Rect).data(data,function (d,i) {return i;});
selection.enter()
  .append(Rect)
  .attr('x',0)
  .attr('y',0)
  .attr('width',0)
  .attr('height',0)
.merge(selection)
.call(c2.animate()
  .to({
    x : function (d,i) {return Math.random()*1000},
    y: function (d,i) {return Math.random()*500},
    height : 1,
    width : 1
  });
  
selection.exit()
  .call(
    c2.animate()
      .to({
        width : 0,
        height: 0
      })
      .remove()
  );
```


### TODO
WebGL support
api/docs

### Demos (with code)
1) <a href="https://tadaa.github.io/c2/demos/bars.html" target="_blank">Bars</a>



### Quickstart
1) Download script through npm or download/include the appropriate script.  Pre-minified scripts are available.

`<script src="/path/to/dist/c2.js">`

or

`npm install --save-dev c2`

All scripts:

* dist/c2.js

* dist/c2.min.js

* dist/c2.amd.js

* dist/c2.amd.min.js

* dist/c2.node.js

* dist/c2.node.min.js

* dist/c2.umd.js

* dist/c2.umd.min.js


2) Make sure you install d3.js.  c2.js can be loaded before or after d3.

3) Review demos and code away!
