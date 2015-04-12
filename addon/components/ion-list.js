import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ion-list',
  classNames: ['list'],
  classNameBindings: [
    'inset:list-inset'
  ]
});
