import Ember from 'ember';
import layout from '../templates/components/ion-list';
import IonItem from './ion-item';

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

    hammer.on('pan panend', event => {
      // debugger;
      let slidingContent, slidingItem;
      if (event.target.classList.contains("item-content")) {
        slidingContent = event.target
      } else if (event.target.parentElement.classList.contains("item-content")) {
        slidingContent = event.target.parentElement
      }

      // how do I grab the ion item component that I want?

      // slidingItem = slidingContent.parentElement

      if (event.type === 'pan') {
        this.pan(event, slidingItem);
      } else if (event.type === 'panend') {
        this.panEnd(event, slidingItem);
      }
    });
  },

  pan(event, slidingItem) {
    Ember.run(() => {
      this.slideItem(event, slidingItem);
    });
  },

  panEnd(event, slidingItem) {
    Ember.run(() => {
      this.finishSlidingItem(event, slidingItem);
    })
  },

  slideItem(event, slidingItem) {
    // debugger;
    let offset;
    if (!this.originX) {
      offset = this.originX = event.deltaX;
    } else {
      offset = event.deltaX - this.originX;
      this.originX = event.deltaX;
    }

    this.moveAtIndex(offset, slidingItem);
  },

  moveAtIndex(offset, slidingItem) {
    debugger;
    slidingItem.set('translateX', slidingItem.get('translateX') + offset);
  },

  finishSlidingItem(event, slidingItem) {
    this.originX = null;
    // debugger;
  }
});
