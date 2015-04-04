import Ember from 'ember';

let escape   = Ember.Handlebars.Utils.escapeExpression;
let htmlSafe = Ember.String.htmlSafe;

export function ionIcon(params/*, hash*/) {
  let iconName = escape(params[0]);
  return htmlSafe(`<i class="icon ion-${iconName}"></i>`);
}

export default Ember.HTMLBars.makeBoundHelper(ionIcon);
