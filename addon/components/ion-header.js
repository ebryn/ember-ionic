import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ion-header',
  classNames: ['bar', 'bar-header'],
  classNameBindings: ['kindClass'],

  kindClass: Ember.computed('kind', function() {
    let kind = this.get('kind');
    if (kind) {
      return `bar-${this.get('kind')}`;
    }
  })
});
