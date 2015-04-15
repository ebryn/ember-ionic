import Ember from 'ember';
import layout from '../templates/components/ion-item';

Ember.LinkView.reopen({
  attributeBindings: ["style"]
});

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

  translateX: 0,
  originalWidth: 0,
  translateSpeed: 0,
  open: null,

  transformOutput: Ember.computed('translateX', 'translateSpeed', function() {
    return `transform: translate(${this.get('translateX')}px, 0px);
            transition: ${this.get('translateSpeed')}s transform`.htmlSafe();
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
    let slidingLink = this.element.getElementsByClassName("item-content")[0];

    this.originalWidth = width;

    hammer.on('pan panend', event => {
      if (event.type === 'pan') {
        this.pan(event);
      } else if (event.type === 'panend') {
        this.panEnd(event);
      }
    });

    slidingLink.addEventListener("transitionend", () => {
      if (!this.open) {
        this.element.getElementsByClassName("item-options")[0].classList.add("invisible");
      }
      this.set('translateSpeed', 0);
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
    });
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
    let withinLeftMax = (this.translateX + offset) >= (this.originalWidth * -0.70);
    if (withinRightMax && withinLeftMax) {
      this.set('translateX', this.translateX + offset);
    }
  },

  finishSlidingItem() {
    let optionsWidth = this.element.getElementsByClassName("item-options")[0].offsetWidth;
    this.set('translateSpeed', 0.4);
    if (this.translateX < -optionsWidth) {
      this.open = true;
      this.set('translateX', -optionsWidth);
    } else {
      this.open = false;
      this.set('translateX', 0);
    }

    this.originX = null;
  }
});
