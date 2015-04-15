import Ember from 'ember';
import layout from '../templates/components/ion-list';
import IonItem from './ion-item';

export default Ember.Component.extend({
  tagName: 'ion-list',
  classNames: ['list'],
  classNameBindings: [
    'inset:list-inset'
  ]
});
