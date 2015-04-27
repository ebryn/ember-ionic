import Ember from 'ember';
import layout from '../templates/components/ion-radio';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'label',
  classNames: ['item', 'item-radio']
});
