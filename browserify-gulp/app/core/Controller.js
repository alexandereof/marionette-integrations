import {Marionette} from '../../vendor/vendor';
import {_} from '../../vendor/vendor';

var Controller = Marionette.Object.extend({
    parenController: null,
    registerCommands:{},
    constructor: function(instanceArguments){
        var self = this;
        self.registerCommands = this.command;
        Marionette.Object.apply(this,arguments);
    }
});

Controller.prototype.dispatch =  function(commandName){
    if(commandName in thi.registerCommands){
        this.registerCommands[commandName].execute();
    }
}

export default Controller;


