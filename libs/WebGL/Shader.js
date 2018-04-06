const Pass =  require('./../Pass');
//maybe parse shaders
//TODO alter _not_invalid_ and cleanup so that invalid elements are always captured

class Shader extends Pass {
    constructor ({vertex,fragment,mode}) {
        super({mode:mode !== undefined ? mode : Pass.RENDER_ONLY_INVALID_CHILDREN});
        this.update({vertex,fragment})
    }
    render () {
        super.render();
    }
    vertex (shader) {
        if (arguments.length) {
            this.update({
                vertex : shader
            });
        } else {
            return this.vertex;
        }
    }
    fragment (shader) {
        if (arguments.length) {
            this.update({
                fragment : shader
            });
        } else {
            return this.fragment;
        }
    }
    update ({vertex,fragment}) {
        if (vertex) {
            if (this._vertex_source) {
                this._vertex_source = vertex;
                this.context.detachShader(this._program,this._vertex_shader);
                this.context.compileShader(vertex)
                this.context.attachShader(this._program,this._vertex_shader);
            }
        }
        if (fragment) {
            if (this._fragment_source) {
                this._fragment_source = fragment;
                this.context.detachShader(this._program,this._fragment_shader);
                this.context.compileShader(fragment)
                this.context.attachShader(this._program,this._fragment_shader);
            }
        }
        if (vertex||fragment) {
            this.context.linkProgram(this._program);
        }
    }
    delete () {
        if (this.context) {
            this.context.deleteShader(this._vertex_shader);
            this.context.deleteShader(this._fragment_shader);
            this.context.deleteProgram(this._program);
        }
    }
}


Rect {
    render (shader,d,i) {
        shader.aVertexPositions[i] = this.position;
    }
}
render() {
    $shader
}

Test extends Shader {
    render () {
        super.render()
        //iterate buffers
        //copy attributes into buffer
        gl.drawElements()
    }
}

new Element
