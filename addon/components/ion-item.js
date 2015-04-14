import Ember from 'ember';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-item',
  classNames: ['item'],
  classNameBindings: [
    'toggle:item-toggle',
    'checkbox:item-checkbox',
    'radio:item-radio',
    'select:item-select',
    'input:item-input',
    'divider:item-divider',
    'icon-left:item-icon-left',
    'icon-right:item-icon-right',
    'button-left:item-button-left',
    'button-right:item-button-right',
    'avatar:item-avatar',
    'thumbnail-left:item-thumbnail-left',
    'thumbnail-right:item-thumbnail-right'
  ]
});
