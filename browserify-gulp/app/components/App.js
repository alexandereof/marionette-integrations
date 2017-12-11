import {Marionette} from '../../vendor/vendor';
import ItemView from './ItemView';
import def from '../module/definition';
export default Marionette.Application.extend({
  region: '#app',
  onStart() {
    const controller = new  def.Controller({params:'alex'});
    const layout = new def.Layout({controller: controller});
     layout.controller = controller;
     controller.layout = layout;
    this.showView(layout);
  }
});
