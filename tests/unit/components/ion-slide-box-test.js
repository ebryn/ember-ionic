import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

function panLeft(deltaX) {
  return {
    deltaX: -deltaX
  };
}

function panRight(deltaX) {
  return panLeft(-deltaX);
}

function setupBox() {
  let box = this.subject({
    template: Ember.HTMLBars.compile(`
      <ion-slide></ion-slide>
      <ion-slide></ion-slide>
      <ion-slide></ion-slide>
    `)
  });
  let content = Ember.Component.create({
    container: box.container,
    layout: Ember.HTMLBars.compile(`<div style="position: relative; width: 200px; height: 200px"><ion-content>{{view box}}</ion-content></div>`),
    box
  });
  Ember.run(function() {
    content.appendTo('#qunit-fixture');
  });
  return box;
}

function translateXOfSlide(slideIdx) {
  let slideEl = document.querySelector(`ion-slide:nth-child(${slideIdx})`);
  if (!slideEl) { return; }
  let transform = slideEl.style['-webkit-transform'];
  let xMatch = transform.match(/translate\(([^,]*),/);
  return xMatch && xMatch[1];
}

moduleForComponent('ion-slide-box', {
  // specify the other units that are required for this test
  needs: ['component:ion-slide', 'component:ion-content']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('panning', function(assert) {
  let box = setupBox.call(this);

  assert.equal(box.get('currentSlideIdx'), 0);

  // pan to the left
  box.pan(panLeft(50));
  box.panEnd(panLeft(50));

  assert.equal(box.get('currentSlideIdx'), 0);
  assert.equal(translateXOfSlide(1), "0px");
  assert.equal(translateXOfSlide(2), "200px");
  assert.equal(translateXOfSlide(3), "200px");


  box.pan(panLeft(10));
  box.panEnd(panLeft(10));

  assert.equal(box.get('currentSlideIdx'), 0);
  assert.equal(translateXOfSlide(1), "0px");
  assert.equal(translateXOfSlide(2), "200px");
  assert.equal(translateXOfSlide(3), "200px");
});

test('panning past the threshold', function(assert) {
  let box = setupBox.call(this);
  assert.equal(box.get('currentSlideIdx'), 0);

  // pan to the left more than 50%
  box.pan(panLeft(101));
  box.panEnd(panLeft(101));

  assert.equal(box.get('currentSlideIdx'), 1);
  assert.equal(translateXOfSlide(1), "-200px");
  assert.equal(translateXOfSlide(2), "0px");
  assert.equal(translateXOfSlide(3), "200px");

  // pan to the right more than 50%
  box.pan(panRight(101));
  box.panEnd(panRight(101));

  assert.equal(box.get('currentSlideIdx'), 0);
  assert.equal(translateXOfSlide(1), "0px");
  assert.equal(translateXOfSlide(2), "200px");
  assert.equal(translateXOfSlide(3), "200px");

  // pan back to the left more than 50%
  box.pan(panLeft(101));
  box.panEnd(panLeft(101));

  assert.equal(box.get('currentSlideIdx'), 1);
  assert.equal(translateXOfSlide(1), "-200px");
  assert.equal(translateXOfSlide(2), "0px");
  assert.equal(translateXOfSlide(3), "200px");
});
