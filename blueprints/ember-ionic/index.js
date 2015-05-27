var RSVP = require('rsvp');

module.exports = {
  description: '',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return RSVP.all([
      this.addBowerPackageToProject('ionic'),
      this.addBowerPackageToProject('hammerjs')
    ]);
  }
};
