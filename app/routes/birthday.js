'use strict';

module.exports = function(app) {

    //Home route
    var birthday = require('../controllers/birthday');

    app.get('/birthdays/data', birthday.exportFbData);
    app.get('/birthdays', birthday.all)

    app.get('/birthdays/today', birthday.all)
    app.get('/birthdays/friends/:facebookid', birthday.show )
};
