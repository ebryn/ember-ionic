import Ember from 'ember';
import layout from '../templates/components/ion-item';
import IonList from './ion-list';

Ember.LinkView.reopen({
  attributeBindings: ["style"]
});

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-item',
  classNames: ['item'],
  classNameBindings: [
    'right-editable:item-right-editable',
    'complex:item-complex',
    'remove-animate:item-remove-animate',
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

  init() {
    this._super(...arguments);
    this._optionButtons = Ember.A([]);
    let ionList = this.nearestOfType(IonList);
    ionList.registerItem(this);
  },

  _previousX: 0,
  _translateX: 0,
  _screenWidth: 0,
  _translateSpeed: 0,
  _open: false,
  _optionVisibilityClass: 'invisible',

  _registerOptionButton(button) {
    this.get('_optionButtons').pushObject(button);
  },

  _transformOutput: Ember.computed('_translateX', '_translateSpeed', function() {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    return Ember.String.htmlSafe(`transform: translate(${escape(this.get('_translateX'))}px, 0px);
            transition: ${escape(this.get('_translateSpeed'))}s transform`);
  }),

  didInsertElement() {
    let {width} = this.element.getBoundingClientRect();
    let hammer = new Hammer(this.element);
    let slidingLink = this.element.querySelector(".item-content");

    this._screenWidth = width;

    hammer.on('pan panend', event => {
      if (event.type === 'pan') {
        this._pan(event);
      } else if (event.type === 'panend') {
        this._panEnd(event);
      }
    });

    slidingLink.addEventListener("transitionend", () => {
      if (!this._open) {
        this.set('_optionVisiblity', 'invisible');
      }
      this.set('_translateSpeed', 0);
    });
  },

  _pan(event) {
    Ember.run(() => {
      this._slideItem(event);
    });
  },

  _panEnd(event) {
    Ember.run(() => {
      this._finishSlidingItem(event);
    });
  },

  _slideItem(event) {
    let offset;
    if (!this._previousX) {
      this.set('_optionVisibilityClass', '');
      offset = this._previousX = event.deltaX;
    } else {
      offset = event.deltaX - this._previousX;
      this._previousX = event.deltaX;
    }
    this._applyTranslate(offset);
  },

  _applyTranslate(offset) {
    const MAX_SLIDE_LEFT_SCREEN_RATIO = 0.7;
    let withinRightMax = (this._translateX + offset) <= 0;
    let withinLeftMax = (this._translateX + offset) >= (this._screenWidth * -MAX_SLIDE_LEFT_SCREEN_RATIO);
    if (withinRightMax && withinLeftMax) {
      this.set('_translateX', this._translateX + offset);
    }
  },

  _finishSlidingItem() {
    const ITEM_TRANSLATE_SPEED = 0.4;
    let optionsWidth = this.element.querySelector(".item-options").offsetWidth;
    this.set('_translateSpeed', ITEM_TRANSLATE_SPEED);
    if (this._translateX < -optionsWidth) {
      this._open = true;
      this.set('_translateX', -optionsWidth);
    } else {
      this._open = false;
      this.set('_translateX', 0);
    }

    this._previousX = 0;
  }
});
