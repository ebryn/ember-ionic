import Ember from 'ember';
import layout from '../templates/components/ion-tab';
import TabsComponent from './ion-tabs';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'a',
  classNames: ['tab-item'],
  classNameBindings: ['isActive:tab-item-active'],
  attributeBindings: ['icon'],

  iconName: null,
  icon: Ember.computed('iconName', function() {
    if (this.isSelected) {
      return `ion-${this['icon-on']}`;
    } else {
      return `ion-${this['icon-off']}`;
    }
  }),

  click() {
    this.tabs.setActive(this);
  },

  init() {
    this._super(...arguments);

    let tabsComponent = this.tabs = this.nearestOfType(TabsComponent);
    tabsComponent.registerTab(this);
  }
});
