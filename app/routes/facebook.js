'use strict';

module.exports = function(app) {

    //Home route
    var facebook = require('../controllers/facebook');
    app.get('/facebook', facebook.showFriend);

};
