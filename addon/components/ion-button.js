import Ember from 'ember';

export default Ember.Component.extend({
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
      return `button-${kind}`;
    }
  })
});
