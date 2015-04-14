import Ember from 'ember';
import layout from '../templates/components/ion-option-button';
import IonItem from './ion-item';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['button'],
  tagName: '',
  kindClass: Ember.computed('kind', function() {
    let kind = this.get('kind');
    if (kind) {
      return `button button-${kind}`;
    }
  }),

  init() {
    this._super(...arguments);

    let ionItemComponent = this.nearestOfType(IonItem);
    ionItemComponent.registerOptionButton(this);
  }
});
