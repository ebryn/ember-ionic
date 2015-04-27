import Ember from 'ember';
import layout from '../templates/components/ion-slide-box';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-slide-box',
  classNames: ['slider'],
  attributeBindings: ['style'],
  style: Ember.computed(function() {
    return Ember.String.htmlSafe(`visibility: visible`);
  }),

  _currentSlideIdx: 0,
  _previousX: 0,
  _originalWidth: 0,

  _totalWidth: Ember.computed('_slides.length', '_originalWidth', function() {
    let slides = this._slides;
    let numberOfSlides = slides && slides.length || 0;
    let _originalWidth = this.get('_originalWidth');
    let totalWidth = numberOfSlides * _originalWidth;
    return Ember.String.htmlSafe(`${totalWidth}`);
  }),

  init() {
    this._super(...arguments);
    this._slides = Ember.A([]);
  },

  didInsertElement() {
    let {width, height} = this.element.getBoundingClientRect();
    let slides = this._slides;
    for (var i = 0, l = slides.length; i < l; i++) {
      let left = -width * i;
      slides[i].setProperties({width, height, left});
    }
    this.set('_originalWidth', width);

    this._stackSlides();

    let hammer = new Hammer(this.element);

    hammer.on('pan', event => {
      this._pan(event);
    });

    hammer.on('panend', event => {
      this._panEnd(event);
    });
  },

  _stackSlides() {
    let _currentSlideIdx = this._currentSlideIdx;
    let width = this.get('_originalWidth');
    let slides = this._slides;
    for (var i = 0, l = slides.length; i < l; i++) {
      let slide = slides[i];
      if (i < _currentSlideIdx) {
        slide.set('_translateX', -width);
      } else if (i === _currentSlideIdx) {
        slide.set('_translateX', 0);
      } else {
        slide.set('_translateX', width);
      }
    }
  },

  _addSlide(slide) {
    let slides = this._slides;
    slides.pushObject(slide);
  },

  _pan(event) {
    Ember.run(() => {
      this._translateSlides(event.deltaX);
    });
  },

  _panEnd(event) {
    Ember.run(() => {
      this._previousX = null;
      this._finishTranslation(event.deltaX);
    });
  },

  _finishTranslation(deltaX) {
    const THRESHOLD = 20; // pixels
    const MAX_SLIDE_IDX = this._slides.length - 1;
    let offset, restoreNext, restorePrevious;
    let _currentSlideIdx = this._currentSlideIdx;
    let finish = true;

    if (deltaX > THRESHOLD && _currentSlideIdx > 0) {
      // move index to previous slide
      this.decrementProperty('_currentSlideIdx');
      offset = this._originalWidth - deltaX;
      // these restore variables return the slides to the "deck"
      restoreNext = -deltaX;
    } else if (deltaX < -THRESHOLD && _currentSlideIdx < MAX_SLIDE_IDX) {
      // move index to next slide
      this.incrementProperty('_currentSlideIdx');
      offset = -(this._originalWidth + deltaX);
      restorePrevious = -deltaX;
    } else {
      offset = -deltaX;
    }

    this._translate(offset, _currentSlideIdx, restoreNext, restorePrevious, finish);

  },

  _translateSlides(deltaX) {
    let offset;
    if (!this._previousX) {
      offset = this._previousX = deltaX;
    } else {
      offset = deltaX - this._previousX;
      this._previousX = deltaX;
    }

    this._translate(offset, this._currentSlideIdx);
  },

  _translate(offset, currentIndex, restoreNext, restorePrevious, finish) {
    let slides = this._slides;

    if (!slides.length) { return; }

    let previousSlide = slides[currentIndex - 1];
    let nextSlide = slides[currentIndex + 1];
    let currentSlide = slides[currentIndex];

    if (finish) {
      const TRANSLATE_SPEED = 0.3;
      if (previousSlide) { previousSlide.set('_translateSpeed', TRANSLATE_SPEED); }
      if (nextSlide) { nextSlide.set('_translateSpeed', TRANSLATE_SPEED); }
      currentSlide.set('_translateSpeed', TRANSLATE_SPEED);
    }

    if (restorePrevious && previousSlide && offset < 0) {
      previousSlide.set('_translateX', previousSlide.get('_translateX') + restorePrevious);
    } else if (previousSlide) {
      previousSlide.set('_translateX', previousSlide.get('_translateX') + offset);
    }

    currentSlide.set('_translateX', currentSlide.get('_translateX') + offset);

    if (restoreNext && nextSlide && offset > 0) {
      nextSlide.set('_translateX', nextSlide.get('_translateX') + restoreNext);
    } else if (nextSlide) {
      nextSlide.set('_translateX', nextSlide.get('_translateX') + offset);
    }
  }
});
