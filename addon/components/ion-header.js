import Ember from 'ember';
import layout from '../templates/components/ion-header';

export default Ember.Component.extend({
  layout: layout,
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
