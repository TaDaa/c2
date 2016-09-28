# c2

c2 is a helper library for creating components that render to canvas.  Currently c2 is only compatible with D3 v4.

### TODO
WebGL support
api/docs

### Demos (with code)
1) <a href="demos/bars.html">Bars</a>



### Quickstart/Tutorial:
1)  Create a new html page


```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            padding:0;
            margin:0;
        }
        canvas {
            width:100%;
            height:100%;
            position:absolute;
            z-index:1;
            top:0;
            left:0;
        }
    </style>


    <script src="demo.js"></script>
</head>
<body>
    <canvas></canvas>
</body>
</html>

```
2)  Create demo.js
```javascript
var d3 = window.d3 = require('d3'),
c2 = window.c2 =  require('c2');

window.addEventListener('resize',resize);
window.addEventListener('DOMContentLoaded',resize);


//create our data set
var h,w,
x,y,
data = [];
for (var i=0,ln=10000;i<ln;i++) {
    w = h = Math.random() * 7 ;
    x = Math.random() * (100-w);
    y = Math.random() * (100-h);
    data.push({
        'x' : x/100,
        'y' : y/100,
        'width' : w/100,
        'height' : h/100
    });
}

//create our c2 renderable
var Rect = window.Rect =  c2.create(function (context,data,i) {
    context.fillRect(this.x,this.y,this.width,this.height);
})
//declare the attributes for set/get optimizations
.attributes({
    'x' : c2.types.float,
    'y' : c2.types.float,
    'width' : c2.types.float,
    'height' : c2.types.float
});

function resize () {
    d3.select('canvas')
    .attr('width',window.innerWidth)
    .attr('height',window.innerHeight);
    render();
}
function render () {

    //grab the context2d selection
    //you could also use selectAll if you intend to render to multiple canvas elements
    var 
    canvas = d3.select('canvas')
    context = canvas.select(c2.Context2d)
        .attr('fillStyle',function (d,i) {
            return this.fillStyle || 'black';
        })
        .attr('foreground',function (d,i) {
            return this.foreground || 'blue';
        })
        .on('tick',function (d,i) {
            this.context.fillStyle = this.fillStyle;
            this.context.globalAlpha = 1;
            this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
            this.context.globalAlpha = 0.15;
            this.context.fillStyle = this.foreground;
        });

    context.transition()
        .duration(5000)
        .attr('fillStyle','#ccf')
        .attr('foreground','white');
    
    //bind the data
    var selection = context.selectAll(Rect)
        .data(data,function (d,i) {
            return i;
        });


    //scale and transition rects
    var width = canvas.attr('width'),
    height = canvas.attr('height');

    selection.enter().append(Rect)
        .attr('x',width/2)
        .attr('y',height/2)
        .attr('width',0)
        .attr('height',0)
        .merge(selection)
        .transition()
        .duration(20000)
        .delay(function (d,i) {
            return i%20 * 40;
        })
        .ease(d3.easeElastic)
        .attr('x',function (d) {
            return d.x*width;
        })
        .attr('y',function (d) {
            return d.y*height;
        })
        .attr('width',function (d) {
            return d.width*height;
        })
        .attr('height',function (d) {
            return d.height*height;
        })

    selection.exit().remove();

}

```
