import Ember from 'ember';
import layout from '../templates/components/ion-slide-box';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-slide-box',
  classNames: ['slider'],
  attributeBindings: ['style'],
  style: Ember.computed(function() {
    return `visibility: visible`.htmlSafe();
  }),
  originalWidth: null,
  totalWidth: Ember.computed('_slides.length', 'originalWidth', function() {
    let slides = this._slides;
    let numberOfSlides = slides && slides.length || 0;
    let originalWidth = this.get('originalWidth')
    let totalWidth = numberOfSlides * originalWidth;
    return `${totalWidth}`.htmlSafe();
  }),
  currentSlideIdx: 0,

  init() {
    this._super(...arguments);
    this._slides = [];
  },

  didInsertElement() {
    let {width, height} = this.element.getBoundingClientRect();
    let slides = this._slides;
    for (var i = 0, l = slides.length; i < l; i++) {
      let left = -width * i;
      slides[i].setProperties({width, height, left});
    }
    this.set('originalWidth', width);

    this.setupSlides();

    let hammer = new Hammer(this.element);

    hammer.on('pan', event => {
      this.pan(event)
    });

    hammer.on('panend', event => {
      this.panEnd(event);
    });
  },

  pan(event) {
    Ember.run(() => {
      this.translateSlides(event);
    });
  },

  panEnd(event) {
    Ember.run(() => {
      this.originX = null;
      this.finishTranslation(event.deltaX);
    });
  },

  finishTranslation(deltaX) {
    let threshold = this.originalWidth/2;
    let offset;
    let currentSlideIdx = this.currentSlideIdx;

    if (deltaX > threshold) {
      // move to previous slide
      this.decrementProperty('currentSlideIdx');
      offset = this.originalWidth - deltaX;
    } else if (deltaX < -threshold) {
      // move to next slide
      this.incrementProperty('currentSlideIdx');
      offset = -(this.originalWidth + deltaX);
    } else {
      offset = -deltaX
    }

    this.moveAtIndex(offset, currentSlideIdx);

  },

  translateSlides(event) {
    console.log(event);
    let offset;
    if (!this.originX) {
      offset = this.originX = event.deltaX;
    } else {
      offset = event.deltaX - this.originX;
      this.originX = event.deltaX;
    }
    // debugger;
    this.moveAtIndex(offset, this.currentSlideIdx);
  },

  moveAtIndex(offset, index) {
    let slides = this._slides;
    if (!slides.length) { return; }
    let previousSlide = slides[index - 1];
    let currentSlide = slides[index];
    let nextSlide = slides[index + 1];

    if (previousSlide) {
      previousSlide.set('translateX', previousSlide.get('translateX') + offset);
    }

    currentSlide.set('translateX', currentSlide.get('translateX') + offset);

    if (nextSlide) {
      nextSlide.set('translateX', nextSlide.get('translateX') + offset);
    }
  },

  setupSlides() {
    let currentSlideIdx = this.currentSlideIdx;
    let width = this.get('originalWidth');
    let slides = this._slides;
    for (var i = 0, l = slides.length; i < l; i++) {
      let slide = slides[i];
      if (i < currentSlideIdx) {
        slide.set('translateX', -width);
      } else if (i === currentSlideIdx) {
        slide.set('translateX', 0);
      } else {
        slide.set('translateX', width);
      }
    }
  },

  // panLeft() {
  //   let { currentSlideIdx, _slides, originalWidth } = this;
  //   let totalSlides = this._slides.length;
  //   let currentSlide = _slides[currentSlideIdx];
  //   if (currentSlideIdx < totalSlides) {
  //     currentSlideIdx++;
  //     let nextSlide = _slides[currentSlideIdx];
  //     currentSlide.decrementProperty('left', originalWidth);
  //     nextSlide.decrementProperty('left', originalWidth);
  //     this.currentSlideIdx = currentSlideIdx;
  //   }
  // },

  // panRight() {

  // },

  addSlide(slide) {
    let slides = this._slides;
    slides.pushObject(slide);
  }
});
