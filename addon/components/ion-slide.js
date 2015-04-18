import Ember from 'ember';
import layout from '../templates/components/ion-slide';
import IonSlideBox from './ion-slide-box';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-slide',
  classNames: ['slider-slide'],
  attributeBindings: ['style'],

  didInsertElement() {
    this.element.addEventListener('transitionend', () => {
      this.set('_translateSpeed', 0);
    });
  },

  style: Ember.computed('width', 'height', 'left', '_translateX', '_translateSpeed', function() {
    let escape = Ember.Handlebars.Utils.escapeExpression;
    return Ember.String.htmlSafe(
            `width: ${escape(this.width)}px;
            height: ${escape(this.height)}px;
            left: ${escape(this.left)}px;
            transition: ${escape(this._translateSpeed)}s transform;
            transform: translate(${escape(this._translateX)}px, 0px) translateZ(0px);`);
  }),
  
  width: 0,
  height: 0,
  left: 0,
  _translateX: 0,
  _translateSpeed: 0,

  init() {
    this._super(...arguments);
    let slideBox = this.nearestOfType(IonSlideBox);
    slideBox._addSlide(this);
  }
});
