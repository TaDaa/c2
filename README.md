# C2

C2 is a helper library for creating custom components that render to canvas.  Currently C2 is only compatible with D3 v3, v4, and v5.  

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

//c2.Context2d is a custom tag provided by c2 that selects the 2d context from a canvas element
var context = d3.select('canvas').select(c2.Context2d)
  //tick is an event that triggers before each render frame
  //if you need to use an after render event, use "tock"
  .on('tick',function () {
    this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
  })
var selection = context.selectAll(Rect).data(data,function (d,i) {return i;});
selection.enter()
  .append(Rect)
  .attr('x',0)
  .attr('y',0)
  .attr('width',0)
  .attr('height',0)
.merge(selection)

//c2.animate is uses its own internal scheduler, groups tweens by
//start/duration/easing and is generally faster than d3.transition
//as well as being easier on the garbage collector.
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

2) <a href="https://tadaa.github.io/c2/demos/donut.html" target="_blank">Donut (uses Path2D for canvas with d3.arc)</a>

3) <a href="https://tadaa.github.io/c2/demos/webgl.html" target="_blank">WebGL</a>

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




###API

#####c2.element(function(context,data,i)) - returns a new tag with the provided function for rendering
######functions

* attributes(object) - defines attributes intended to be used for rendering of the declared element.

* constructor(function) - function is invoked when the element is first created

* proto (object) - properties and values from proto are added to the element prototype

* toString() - returns internal c2Id

* compile() - internal use only, but returns the renderable object


#####c2.create(function(context,data,i)) - alias for element




####Classes
#####c2.Context2d - Wrapper class for CanvasRenderingContext2D
######events

* tick(function) - function called before context2d renders

* tock(function) - function called after context2d renders


######attributes

* fillStyle[string]

* globalAlpha[string]

* lineWidth[string]

* strokeStyle[string]

* shadowColor[string]

* shadowBlur[string]

* shadowOffsetX[string]

* shadowOffsetY[string]


#####functions (if using d3 - you should need to call these directly)

* createElementNS (c2Tag|stringC2Id)

* invalidate()

* setAttribute(string,any)

* getAttribute(string,any)

* removeAttribute(string)

* addEventListener(string,function)

* removeEventListener(string,function)

* querySelector(c2Tag)

* querySelectorAll(c2Tag)

* appendChild(c2Drawable)

* insertBefore(c2Drawable)

* removeChild(c2Drawable)




#####c2.animate(transitionName) - callable optimized c2 transition for working with large data.  All of these should accept the same arguments as d3

* delay (number|function) - time to wait before starting transition on c2 node

* duration (number|function) - duration of transition on c2 node

* ease (function) - easing function for transition

* to (name,value)|(object) - compiles optimized tweening function.  Values can be functions and will still compile.

* tween (function) - Uncompiled tweening function for transition.  

* remove () - removes elements after transition is complete

UNFINISHED / WIP:

* on('end'|'start',function) - listen to on/end events

* animate(transitionName) - transition chaining.

#####c2.Layer2d - WIP - intended to be used for clumping complex renderables and only reprocessing changes
######events

* tick(function) - function called before context2d renders

* tock(function) - function called after context2d renders

