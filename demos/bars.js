window.addEventListener('DOMContentLoaded',function () {
    var content = document.querySelector('.content');
    content.innerHTML = ([ 
            '<canvas style="z-index:0;position:relative;background:white;transform:translateZ(0);backface-visibility:hidden;"></canvas>',
        '<div class="button-group">',
        '<button style="width:100px;z-index:1;position:relative;" class="add">Double</button>',
        '<button style="width:100px;z-index:1" class="remove">Half</button>',
        '</div>',
        '<pre><code class="javascript"></code></pre>'
    ].join(''))
    var str = load.toString();
    //str = str.slice(str.indexOf('\n'),-1);
    //str = str.replace(/\n/g)
    //str = str.replace(/\s/g,'<div style="margin-left:5px;position;relative;display:inline-block;"></div>')
    //console.error(str);
    var node = document.querySelector('.javascript');
    str = str.replace(/\</g,'&lt;')
    str = str.replace(/\>/g,'&gt;')
    node.innerHTML = str;
    hljs.highlightBlock(node.parentNode);
    load();
})




function load () {

    //generate mock data
    var data = [],
    ids=0,
    i,ln,
    start_number=1;
    for (i=0,ln=start_number;i<ln;i++) {
        data.push({
            'id' : ids++,
            'value' : Math.random() * 1000
        });
    }


    //define our custom canvas element tag
    //attributes allow c2 to perform eval 
    //optimizations so that generic 
    //setters can be avoided
    var Rect = c2.element(function (context,d,i) {
        context.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
        );
    }).attributes({
        'x' : c2.types.float,
        'y' : c2.types.float,
        'w' : c2.types.float,
        'h' : c2.types.float
    });

    var direction = 1,
    width = window.innerWidth-421,
    height = window.innerHeight,
    canvas = d3.select('canvas')
        .attr('height',height)
        .attr('width',width),
    last_size= data.length;



    //bind event listeners for add/remove buttons
    d3.select('.add').on('click',function () {
        //add button doubles data
        direction = 1;
        for (var i=0,ln=data.length;i<ln;i++) {
            data.push({
                'id' : ids++,
                'value' : Math.random() * 1000
            });
        }
        render();
    })
    d3.select('.remove').on('click',function () {
        //remove button halves data
        direction = -1;
        data.splice(data.length/2,data.length/2);
        render();
    });

    function render () {
        //log amount of data being rendered
        console.error(data.length);

        var lastSize = last_size,
        xScale = d3.scaleLinear()
            .range([0,width])
            .domain([0,data.length]),
        yScale = d3.scaleLinear()
            .range([0,height])
            .domain([0,d3.max(data,function (d) {
            return d.value;
        })]),



        //we select the context from the canvas
        //c2.Context2d is a predefined element tag 
        //webgl may be supported later
        context = canvas.select(c2.Context2d)
            //tick is a custom event that is fired before the context is rendered
            //you can hook into an after-render event, using "tock"
            .on('tick',function () {
                this.context.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                )
            }),

        //we bind the generated data
        //to the custom Rect tag 
        selection = context.selectAll(Rect)
            .data(data,function (d,i) {
                return d.id;
            });


        //this works the same as d3!
        //we append Rect elements 
        //and merge them into the selection
        selection.enter().append(Rect)
        .attr('x',function (d,i) {
            return width;
        })
        .attr('y',function (d) {
            return (height-yScale(d.value)/2);
        })
        .attr('w',0)
        .attr('h',0)
        .merge(selection)

        //PAUSE! you dont have to to use c2.animate(),
        //but the performance is significantly
        //better over d3-transitions.
        //
        //This is mainly because c2 will dynamically
        //compile custom optimized tweening
        //functions based on the attributes being
        //interpolated.
        //
        //C2 also groups tweening functions by 
        //start/duration/easing.
        //
        //C2 animate is also easier on garbage
        //collection.   recommend using c2.animate
        //if you are binding large sets of data,
        //but its up to you!!!
        //selection.transition() will work too.
        .call(
            c2.animate()
            .duration(2000)
            .ease(d3.easeElastic)
            .delay(function (d,i) {
                if (direction === -1) {
                    return Math.max(
                        (lastSize-i)/50,1
                    );
                }
                return Math.max(i/50,1);
            })
            .to({
                'x' : function (d,i) {
                    return xScale(i);
                },
                'y' : function (d,i) {
                    this._y = yScale(d.value);
                    return height-this._y;
                },
                'w' : Math.max(
                    width/data.length-0.5,0.1
                ),
                'h' : function (d,i) {
                    return this._y;
                }
            })
        );



        //nothing new here!
        //we animate removed data items 
        //and remove associated elements
        selection.exit()
            .call(
                c2.animate()
                .duration(2000)
                .delay(function (d,i) {
                    return Math.max(
                        (last_size-1)/50,1
                    )
                })
                .ease(d3.easeElastic)
                .to({
                    'x' : width +100,
                    'w' : 0,
                    'h' : 0
                })
                .remove()
            )

        last_size = data.length;
    }

    render();

}
