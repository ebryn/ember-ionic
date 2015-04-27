import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ion-list',
  classNames: ['list'],
  classNameBindings: [
    'inset:list-inset'
  ],

  init() {
    this._super(...arguments);
    this._items = Ember.A([]);
  },

  registerItem(item) {
    let items = this._items;
    items.pushObject(item);
  }
});
