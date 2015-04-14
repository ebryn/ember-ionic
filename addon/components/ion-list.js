import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ion-list',
  classNames: ['list'],
  classNameBindings: [
    'inset:list-inset'
  ],


  // SlideDrag options in ionic
  dragThresholdX: 10,
  el: null,
  item: null,
  canSwipe: null,


  didInsertElement() {
    let hammer = new Hammer(this.element);

    hammer.on('pan', event => {
      this.pan(event);
    });

    hammer.on('panend', event => {
      this.panEnd(event);
    });
  },

  pan(event) {
    Ember.run(() => {
      this.slideItem(event);
    });
  },

  panEnd(event) {
    Ember.run(() => {
      this.finishSlidingItem(event);
    })
  },

  slideItem(event) {
    // debugger;
  }
});
