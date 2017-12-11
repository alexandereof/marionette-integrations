import {Marionette} from '../../vendor/vendor';
import {_} from '../../vendor/vendor';

var View = Marionette.View.extend({
    controller: null,
    constructor: function(newArguments){
        let self = this;
        let controller =  newArguments.controller;
        if(this.moduleEvents){
            _.each(this.moduleEvents, function(nameOfFn, eventname) {
                if(_.has(Object.getPrototypeOf(self), nameOfFn) && typeof self[nameOfFn] === 'function'){
                    controller.listenTo(controller, eventname, _.bind(self[nameOfFn], self));
                }
            });
        }
        self.controller = controller;
        Marionette.View.apply(this,arguments);
    },
    getInstanceView : function(V, params){
        return new V(_.extend({controller: this.controller}, params));
    }
});


export default View;