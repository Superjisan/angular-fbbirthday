'use strict';

module.exports = function(app) {

    //Home route
    var fbchat = require('../controllers/fbchat');

    app.post('/fbchat', fbchat.FbMessage);

};
