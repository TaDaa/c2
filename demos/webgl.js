window.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('body');
    content.innerHTML = ([ 
        '<canvas style="z-index:0;left:420px;position:relative;background:white;transform:translateZ(0);backface-visibility:hidden;"></canvas>',
        '<div class="button-group">',
        '<button style="width:100px;z-index:1;position:relative;" class="add">Double</button>',
        '<button style="width:100px;z-index:1" class="remove">Half</button>',
        '</div>',
        '<pre><code class="javascript"></code></pre>'
    ].join(''));

    var node = document.querySelector('.javascript'),
    str = load.toString();
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    node.innerHTML = str;
    hljs.highlightBlock(node.parentNode);
    load();


    function load () {
        var mvMatrixUniform,
        barWidth = 2,
        xSpacing = 0.1,
        pMatrixUniform,
        numItems,
        pMatrix = mat4.perspective(mat4.create(), 90, (window.innerWidth - 420) / window.innerHeight, 0.1, 10),
        ptMatrix = mat4.create();

        //setup gl
        const mvMatrix = mat4.create();
        canvas = d3.select('canvas')
        .attr('width', window.innerWidth - 420)
        .attr('height', window.innerHeight)
        .style('width', `${window.innerWidth - 420}px`)
        .style('height', `${window.innerHeight}px`),
        context = canvas.select(c2.ContextWebGL)
        .on('tick', function () {
            //tick even occurs before each render pass
            const context = this.context,
            matrix = mat4.create();
            mat4.mul(matrix, pMatrix, ptMatrix);

            gl.uniformMatrix4fv(pMatrixUniform, false, matrix);
            context.clearColor(0, 0, 0, 1.0);
            context.clearDepth(1.0);
            context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
        }),
        gl = context.node().context;



        mat4.translate(ptMatrix, ptMatrix, [0, 0, -3.5])

        const data = [];
        for (var i=0, ln = 4; i < ln; i++) {
            data.push({
                id : i,
                name : `cat${i}`,
                value : Math.random() * 30
            });
        }


        yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([0, 1]);

        //bar can either extend c2.Element and implement the render function or call c2.element(render) to create
        //the new Element prototype
        class Bar extends c2.Element {
            render (context,d,i) {
                mvMatrix[0] = +this.w; 
                mvMatrix[5] = +this.v;

                mvMatrix[12] = +this.x;
                mvMatrix[13] = this.v / 2.0 - .5;
                mvMatrix[14] = 0;

                gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix);
                gl.drawArrays(gl.LINE_LOOP, 0, numItems);
            }
        }
        Bar.attributes({
                x : c2.types.float,
                v : c2.types.float,
                w : c2.types.float
        });

        var space, barWidth, xSpacing;
        function draw () {
            space = window.innerWidth - 420;
            barWidth = space / data.length / 70;
            xSpacing = barWidth * 0.2;
            barWidth = barWidth * 0.8;

            var selection = context.selectAll(Bar).data(data, (d, i) => i);

            selection.enter().append(Bar)
            .attr('t', 0)
            .attr('v', 0)
            .attr('x', (d,i) => barWidth * data.length + data.length * xSpacing - barWidth * data.length / 2 - data.length * xSpacing / 2)
            .attr('w', 0)
            .merge(selection)
            .call(
                c2.animate()
                .ease(d3.easeElastic)
                .duration(2000)
                .to('x', (d,i) => barWidth * i + i * xSpacing - barWidth * data.length / 2 - data.length * xSpacing / 2)
                .to('w', d => barWidth)
                .to('v', d => yScale(d.value) * 1)
            )

            var cnt = 0;
            selection.exit().call(
                c2.animate()
                .delay((d,i) => cnt++ / data.length * 2)
                .duration(200)
                .to("v", 0)
                .to("w", 0)
                .to('x', (d,i) => barWidth * data.length + data.length * xSpacing - barWidth * data.length / 2 - data.length * xSpacing / 2)
                .remove()
            );
        }
        draw();

        !function setupEvents() {
            var pressed = false,
            lastMovementX,
            lastMovementY;

            d3.select(window)
                .on("resize", (e = d3.event) => {
                    canvas
                    .attr('width', window.innerWidth - 420)
                    .attr('height', window.innerHeight)
                    .style('width', `${window.innerWidth - 420}px`)
                    .style('height', `${window.innerHeight}px`)
                    pMatrix = mat4.perspective(mat4.create(), 90, (context.node().context.drawingBufferWidth ) / context.node().context.drawingBufferHeight, 0.1, 10);

                    gl.viewport(0, 0, window.innerWidth - 420, window.innerHeight)
                    draw();
                })
            canvas
                .on('mousedown', (e = d3.event) => {
                    if (e.button === 0) {
                        pressed = true;
                        lastMovementX = lastMovementY = 0;
                    }
                })
                .on('mouseup', (e = d3.event) => {
                    if (e.button === 0) {
                        pressed = false;
                    }
                })
                .on('mousemove', (e = d3.event) => {
                    if (pressed) {
                        mat4.rotate(ptMatrix, ptMatrix, e.movementX * Math.PI / 360, [0, 1, 0]);
                        mat4.rotate(ptMatrix, ptMatrix, e.movementY * Math.PI / 360, [1, 0, 0]);
                        lastMovementY = e.movementY;
                        lastMovementX = e.movementX;
                        context.node().invalidate();
                    }
                })
                .on('wheel', (e = d3.event) => {
                    const delta = e.deltaY > 0 ? 1.1 : 0.9;
                    if (e.deltaY) {
                        mat4.scale(ptMatrix, ptMatrix, [delta, delta, delta]);
                    }
                    context.node().invalidate();
                });

            d3.select(".add")
                .on("click", (e = d3.event) => {
                    for (var i = 0 , ln = data.length;i < ln ;i ++) {
                        data.push({
                                id : i,
                                name : `cat${i}`,
                                value : Math.random() * 30
                        });
                    }
                    console.error(data.length);
                    draw();
                });

            d3.select(".remove")
                .on("click", (e = d3.event) => {
                    for (var i = 0 , ln = Math.floor(data.length / 2);i < ln ;i ++) {
                        data.pop();
                    }
                    console.error(data.length);
                    draw();
                });
        }();


        !function setupWebGL() {
            // model is a cube that we scale
            const model = new Float32Array([
                    //front
                    -0.5,  0.5, 0.0,
                    0.5, -0.5, 0.0,
                    -0.5, -0.5, 0.0,
                    0.5,  0.5, 0.0,
                    -0.5,  0.5, 0.0,
                    0.5, -0.5, 0.0,

                    //right side
                    0.5, -0.5,  0.0,
                    0.5,  0.5,  0.0,
                    0.5,  0.5, -0.0525,
                    0.5, -0.5,  0,
                    0.5, -0.5, -0.0525,
                    0.5,  0.5, -0.0525,

                    //top
                    0.5, 0.5, -0.0525,
                    -0.5, 0.5,  0,
                    -0.5, 0.5, -0.0525,
                    0.5, 0.5, -0.0525,
                    0.5, 0.5,  0,
                    -0.5, 0.5,  0,

                    //left side
                    -0.5, -0.5,  0.0,
                    -0.5,  0.5,  0.0,
                    -0.5,  0.5, -0.0525,
                    -0.5, -0.5,  0,
                    -0.5, -0.5, -0.0525,
                    -0.5,  0.5, -0.0525

            ]),
            itemSize = 3,
            program = gl.createProgram(),
            vertex_shader = gl.createShader(gl.VERTEX_SHADER),
            fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

            numItems = model.length / itemSize;

            var xUniform,
            valueUniform,
            Triangle,
            selection,
            xScale,
            yScale;

            gl.shaderSource(vertex_shader,`
                attribute vec3 aVertexPosition;
                uniform float value;
                uniform float x;
                uniform mat4 uPMatrix;
                uniform mat4 uMVMatrix;
                varying float t;
                void main () {
                    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
                    t = value * aVertexPosition.z;
                }
                `);
            gl.shaderSource(fragment_shader,`
                #ifdef GL_ES
                precision highp float;
                #endif

                varying float t;
                void main () {
                    gl_FragColor = vec4(0, 0, 1.0 - t, 0.3);
                }
                `);

            gl.compileShader(vertex_shader);
            gl.compileShader(fragment_shader);

            gl.attachShader(program,vertex_shader);
            gl.attachShader(program,fragment_shader);
            gl.linkProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER,model,gl.STATIC_DRAW);

            gl.useProgram(program);

            pMatrixUniform = gl.getUniformLocation(program, 'uPMatrix'),
            mvMatrixUniform = gl.getUniformLocation(program, 'uMVMatrix');
            valueUniform = gl.getUniformLocation(program, 'value');
            xUniform = gl.getUniformLocation(program, 'x');

            gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix);

            gl.uniform1f(valueUniform, 0);
            gl.uniform1f(xUniform, 0);
            program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
            gl.enableVertexAttribArray(program.aVertexPosition);
            gl.vertexAttribPointer(program.aVertexPosition, itemSize, gl.FLOAT, false, 0,0);
            gl.enable(gl.BLEND);
            gl.enable(gl.DEPTH_TEST);
            gl.viewport(0, 0, window.innerWidth - 420, window.innerHeight)
            gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        }();
    }
});
