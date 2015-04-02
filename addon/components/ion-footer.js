import Ember from 'ember';
import layout from '../templates/components/ion-footer';

export default Ember.Component.extend({
  layout: layout,
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
