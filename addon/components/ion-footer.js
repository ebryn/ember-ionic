import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ion-footer',
  classNames: ['bar', 'bar-footer'],
  classNameBindings: ['kindClass'],

  kindClass: Ember.computed('kind', function() {
    let kind = this.get('kind');
    if (kind) {
      return `bar-${this.get('kind')}`;
    }
  })
});
