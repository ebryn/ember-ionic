import Ember from 'ember';
import layout from '../templates/components/ion-option-button';
import IonItem from './ion-item';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',
  kindClass: Ember.computed('kind', function() {
    let kind = this.get('kind');
    let output = 'button';
    if (kind) {
      output += ` button-${kind}`;
    }
    return output;
  }),

  init() {
    this._super(...arguments);

    let ionItemComponent = this.nearestOfType(IonItem);
    ionItemComponent._registerOptionButton(this);
  }
});
