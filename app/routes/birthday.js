'use strict';

module.exports = function(app) {

    //Home route
    var birthday = require('../controllers/birthday');

    app.get('/birthdays/data', birthday.exportFbData);
    app.get('/birthdays', birthday.all)
    // app.get('/birthdays/:friend_id', birthday.show)
    app.get('/birthdays/today', birthday.all)
};
