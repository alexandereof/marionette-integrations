import View from '../core/View';
import template from '../templates/item.jst';

export default View.extend({
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
  },

  moduleEvents:{
    'personal:event': 'saveForm'
  }

});
