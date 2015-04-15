import Ember from 'ember';
import layout from '../templates/components/ion-item';

Ember.LinkView.reopen({
  attributeBindings: ["style"]
})

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-item',
  classNames: ['item', 'item-remove-animate', 'item-avatar', 'item-icon-right', 'item-complex', 'item-right-editable'],
  classNameBindings: [
    'toggle:item-toggle',
    'checkbox:item-checkbox',
    'radio:item-radio',
    'select:item-select',
    'input:item-input',
    'divider:item-divider',
    'icon-left:item-icon-left',
    'icon-right:item-icon-right',
    'button-left:item-button-left',
    'button-right:item-button-right',
    'avatar:item-avatar',
    'thumbnail-left:item-thumbnail-left',
    'thumbnail-right:item-thumbnail-right'
  ],

  translateX: null,
  originalWidth: null,

  transformOutput: Ember.computed('translateX', function() {
    return `transform: translate(${this.get('translateX')}px, 0px); transition: translate 0s`.htmlSafe();
  }),

  optionButtons: Ember.computed(function() {
    return [];
  }),

  registerOptionButton(button) {
    this.get('optionButtons').pushObject(button);
  },

  didInsertElement() {
    let {width} = this.element.getBoundingClientRect();
    let hammer = new Hammer(this.element);

    this.originalWidth = width;

    hammer.on('pan panend', event => {
      if (event.type === 'pan') {
        this.pan(event);
      } else if (event.type === 'panend') {
        this.panEnd(event);
      }
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
    let offset;
    if (!this.originX) {
      this.element.getElementsByClassName("item-options")[0].classList.remove("invisible");
      offset = this.originX = event.deltaX;
    } else {
      offset = event.deltaX - this.originX;
      this.originX = event.deltaX;
    }
    this.moveAtIndex(offset);
  },

  moveAtIndex(offset) {
    let withinRightMax = (this.translateX + offset) <= 0;
    let withinLeftMax = (this.translateX + offset) >= (this.originalWidth * -.70);
    if (withinRightMax && withinLeftMax) {
      this.set('translateX', this.translateX + offset);
    }
  },

  finishSlidingItem(event) {
    let optionsWidth = this.element.getElementsByClassName("item-options")[0].offsetWidth
    if (this.translateX < -optionsWidth) {
      this.set('translateX', -optionsWidth);
    } else {
      this.element.getElementsByClassName("item-options")[0].classList.add("invisible");
      this.set('translateX', 0);
    }

    this.originX = null;
  }
});
