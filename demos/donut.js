window.addEventListener('load',function () {
    var content = document.querySelector('.content');
    content.innerHTML = ([ 
        '<canvas style="background:white"></canvas>',
        '<div class="button-group">',
            '<button style="width:100px" class="add">Double</button>',
            '<button style="width:100px" class="remove">Half</button>',
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
    start_number=4;
    for (i=0,ln=start_number;i<ln;i++) {
        data.push({
            'id' : ids++,
            'value' : 0.25
        });
    }


    //define our custom canvas element tag
    //attributes allow c2 to perform eval 
    //optimizations so that generic 
    //setters can be avoided
    var Path = c2.element(function (context,d,i) {
        //Path2D converts svg path string into something we can draw on canvas
        context.fill(
            new Path2D(this.d)
        );
    }).attributes({
        'd' : c2.types.string
    });

    var width = window.innerWidth-421,
    height = window.innerHeight,
    canvas = d3.select('canvas')
        .attr('height',height)
        .attr('width',width),
    last_size= data.length,
    direction = 1;



    //bind event listeners for add/remove buttons
    d3.select('.add').on('click',function () {
        direction=1;
        //add button doubles data
        for (var i=0,ln=data.length;i<ln;i++) {
            data.push({
                'id' : ids++,
                'value' :0.25
            });
        }
        render();
    })
    d3.select('.remove').on('click',function () {
        direction=-1;
        //remove button halves data
        data.splice(data.length/2,data.length/2);
        render();
    });

    function render () {
        //log amount of data being rendered
        console.error(data.length);
        var lastSize = last_size,
        arc = d3.arc()
            .innerRadius(height/8)
            .outerRadius(height/4),
        total = d3.sum(data,function (d) {
            return d.value;
        }),



        //we select the context from the canvas
        //c2.Context2d is a predefined element tag 
        //webgl may be supported later
        context = canvas.select(c2.Context2d)
            //tick is a custom event that is fired before the context is rendered
           .on('tick',function () {
                this.context.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                );
                this.context.translate(
                    width/2,
                    height/2
                );
            })
            //tock is called after the render is complete
            .on('tock',function () {
                this.context.translate(
                    -width/2,
                    -height/2
                );
            }),

        //we bind the generated data
        //to the custom Path tag 
        selection = context.selectAll(Path)
            .data(data,function (d,i) {
                return d.id;
            }),
        nodes = selection.nodes(),
        last_entered,
        lastTargetEndAngle=0;


        //this works the same as d3!
        //we append Rect elements 
        //and merge them into the selection
        selection.enter().append(Path)
            .attr('d',function (d,i) {
                var last = nodes && nodes[i-1] || last_entered;
                if (last) {
                    this.startAngle = this.endAngle = last.endAngle;
                } else {
                    this.startAngle = this.endAngle = 0;
                }
                last_entered = this;
                return null;
            })
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
            .duration(5000)
            .ease(d3.easeElastic)
            .delay(function (d,i) {
                if (direction === -1) {
                    return Math.max(
                        (lastSize-i)/50,1
                    );
                }
                return Math.max(i/50,1);
            })
            //tween allows us to use a non-generated
            //tweening function - you could do
            //this same code by using the "to"
            //method to inerpolate the start and end angles
            //and then computing the arc in the render fn
            .tween(
                'd',
                function (d,i) {
                    var me = this,
                    targetStartAngle = lastTargetEndAngle+0.1,
                    targetEndAngle = lastTargetEndAngle+d.value/total*Math.PI*2,
                    interpolateStart = d3.interpolateNumber(
                        this.startAngle,
                        targetStartAngle
                    ),
                    interpolateEnd = d3.interpolateNumber(
                        this.endAngle,
                        Math.max(
                            targetEndAngle,
                            targetStartAngle+0.01
                        )
                    );
                    lastTargetEndAngle = targetEndAngle;
                    return function (t) {
                        //use setAttribute to trigger canvas invalidation
                        me.setAttribute('d',arc.startAngle(me.startAngle=interpolateStart(t)).endAngle(me.endAngle=interpolateEnd(t))());
                    };
                })
        );


        //nothing new here!
        //we animate removed data items 
        //and remove associated elements
        selection.exit()
            .call(
                c2.animate()
                .duration(5000)
                .delay(function (d,i) {
                    return Math.max(
                        (last_size-1)/50,1
                    );
                })
                .ease(d3.easeElastic)
                .tween(
                    'd',
                    function (d,i) {
                        var me = this,
                        interpolateStart=d3.interpolateNumber(
                            this.startAngle,
                            Math.PI*2
                        ),
                        interpolateEnd = d3.interpolateNumber(
                            this.endAngle,
                            Math.PI*2
                        );
                        return function (t) {
                            //setAttribute again to trigger canvas invalidation
                             me.setAttribute('d',arc
                                .startAngle(
                                    me.startAngle=interpolateStart(t)
                                )
                                .endAngle(
                                    me.endAngle=interpolateEnd(t)
                             )());
                        };
                    }
                )
                .remove()
            );

        last_size = data.length;
    }

    render();

}
