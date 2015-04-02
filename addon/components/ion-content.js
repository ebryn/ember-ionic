import Ember from 'ember';
import layout from '../templates/components/ion-content';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-content',
  classNames: ['scroll-content overflow-scroll'],
  classNameBindings: [
    'header:has-header',
    'footer:has-footer'
  ]
});
