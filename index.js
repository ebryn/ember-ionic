/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-ionic',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/ionic/release/css/ionic.css');
    app.import(app.bowerDirectory + '/ionic/release/fonts/ionicons.eot',  {destDir: 'fonts'});
    app.import(app.bowerDirectory + '/ionic/release/fonts/ionicons.svg',  {destDir: 'fonts'});
    app.import(app.bowerDirectory + '/ionic/release/fonts/ionicons.ttf',  {destDir: 'fonts'});
    app.import(app.bowerDirectory + '/ionic/release/fonts/ionicons.woff', {destDir: 'fonts'});
    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
  }
};
