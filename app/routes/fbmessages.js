'use strict';

module.exports = function(app) {

    //Home route
    var fbmessages = require('../controllers/fbmessages');

    app.post('/fbchat', fbmessages.FbMessage);
    app.post('/fbpost', fbmessages.postWall)

};
