import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'label',
  classNames: ['item', 'item-checkbox'],
  
  checked: null
});
