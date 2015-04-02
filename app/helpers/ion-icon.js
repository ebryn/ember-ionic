import Ember from 'ember';

let escape = Ember.Handlebars.Utils.escapeExpression;

export function ionIcon(params/*, hash*/) {
  let iconName = escape(params[0]);
  return `<i class="icon ion-${iconName}"></i>`.htmlSafe();
}

export default Ember.HTMLBars.makeBoundHelper(ionIcon);
