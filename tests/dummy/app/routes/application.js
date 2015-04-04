import Ember from 'ember';

let w = Ember.String.w;

export default Ember.Route.extend({
  model() {
    return {
      items: Ember.A(w("1 2 3 4 5 6 7 9 10 11 12 13 14 15 16 17 18 19 20"))
    };
  }
});
