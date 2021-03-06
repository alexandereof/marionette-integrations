import {Marionette, $} from '../../vendor/vendor';
import template from '../templates/item.jst';

export default Marionette.View.extend({
  template: template,

  initialize: function() {
    this.properties = {name: 'itemView'};
  },
  events: {
    'click @ui.header': 'saveForm'
  },
  ui: {
    header: '[data-region="header"]'
  },

  regions: {
    header: '@ui.header'
  },

  saveForm: function(ev) {
    alert('event click' + this.properties.name);
  }

});
