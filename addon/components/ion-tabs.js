import Ember from 'ember';
import layout from '../templates/components/ion-tabs';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ion-tabs',
  classNames: ['tabs-icon-top', 'tabs-positive', 'pane', 'tabs-bottom', 'tabs-standard'],

  currentTab: null,

  tabs: Ember.computed(function() {
    return [];
  }),

  registerTab(tab) {
    this.get('tabs').pushObject(tab);
  },

  setActive(tab) {
    if (this.currentTab) {
      this.currentTab.set('isActive', false);
    }
    this.set('currentTab', tab);
    tab.set('isActive', true);
  }
});
