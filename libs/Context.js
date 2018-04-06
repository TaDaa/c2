const createElement = require('./createElement'),
Document = require('./Document');

class Context extends Document {
    constructor () {
        super()
    }
    invalidate () {
        if (this._not_invalid_) {
            this._not_invalid_ = 0;
            this._invalid_cleanup[this._invalid_cleanup.index++] = this;
            this._invalid_parents[this._invalid_parents.index++] = this;

            if (!this.invalidator.scheduled_next) {
                this.invalidator();
            }
        }
    }
/*
 *    _invalidate () {
 *        if (this._not_invalid_) {
 *            this._not_invalid_ = 0;
 *            this._invalid_cleanup[this._invalid_cleanup.index++] = this;
 *            this._invalid_parents[this._invalid_parents.index++] = this;
 *
 *            !this.invalidator.t2 && this.invalidator();
 *        }
 *    }
 */
    createElementNS () {
        this.createElement.apply(this,arguments);
    }
}

Context.prototype.invalidate.compiled = Context.prototype.invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1); 
//Context.prototype._invalidate.compiled = Context.prototype._invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1); 


module.exports = function (contextName,optionalClass=Context) {
    var config;
    return function ContextSelector (cfg) {
        if (arguments.length === 1) {
            config = cfg;
            return ContextSelector;
        }
        if (this._c2Context_) {
            return this._c2Context_;
        } 
        const ref = createElement.call(c2,optionalClass);
        ref.canvas = this;
        ref.context = config ? this.getContext(contextName,config) : this.getContext(contextName);
        ref.ownerDocument = ref;
        ref._c2Context_ = this._c2Context_ =  ref;
        return ref;
    };
};
module.exports.class = Context;
