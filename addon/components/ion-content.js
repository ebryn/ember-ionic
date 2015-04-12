import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ion-content',
  classNames: ['scroll-content overflow-scroll'],
  classNameBindings: [
    'header:has-header',
    'footer:has-footer'
  ]
});
