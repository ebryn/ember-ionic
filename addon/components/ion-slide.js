import Ember from 'ember';
import layout from '../templates/components/ion-slide';
import IonSlideBox from './ion-slide-box';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-slide',
  classNames: ['slider-slide'],
  attributeBindings: ['style'],
  style: Ember.computed('width', 'height', 'left', 'translateX', function() {
    return `width: ${this.width}px;
            height: ${this.height}px;
            left: ${this.left}px;
            /*transition-duration: 300ms;
            -webkit-transition-duration: 300ms;
            */
            -webkit-transform: translate(${this.translateX}px, 0px) translateZ(0px);`.htmlSafe();
  }),
  width: null,
  height: null,
  left: null,
  translateX: null,

  init() {
    this._super(...arguments);
    let slideBox = this.nearestOfType(IonSlideBox);
    slideBox.addSlide(this);
  }
});
