import Ember from 'ember';
import layout from '../templates/components/ion-checkbox';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'label',
  classNames: ['checkbox'],

  checked: null
});
