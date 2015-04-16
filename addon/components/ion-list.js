import Ember from 'ember';
import layout from '../templates/components/ion-list';
import IonItem from './ion-item';

export default Ember.Component.extend({
  tagName: 'ion-list',
  classNames: ['list'],
  classNameBindings: [
    'inset:list-inset'
  ],

  init() {
    this._super(...arguments);
    this._items = [];
  },

  registerItem(item) {
    let items = this._items;
    items.pushObject(item); 
  }
});
