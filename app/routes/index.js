'use strict';

module.exports = function(app) {

    // Home route
    var users = require('../controllers/users');
    var index = require('../controllers/index');
    app.get('/', users.signin);

};
