import Ember from 'ember';
import layout from '../templates/components/ion-list-item';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-list-item',
  classNames: ['item']
});
