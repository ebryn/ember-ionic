import Ember from 'ember';
import layout from '../templates/components/ion-button';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'button',
  classNames: ['button'],
  classNameBindings: [
    'kindClass',
    'block:button-block',
    'full:button-full',
    'small:button-small',
    'large:button-large',
    'outline:button-outline',
    'clear:button-clear'
  ],

  kindClass: Ember.computed('kind', function() {
    let kind = this.get('kind');
    if (kind) {
      return `button-${this.get('kind')}`;
    }
  })
});
