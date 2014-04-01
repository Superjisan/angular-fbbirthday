'use strict';

module.exports = function(app) {

    //Home route
    var birthday = require('../controllers/birthday');

    app.get('/birthdays/data', birthday.exportFbData);
    app.get('/birthdays', birthday.all)
    app.get('/birthdays/week', birthday.week)
    app.get('/birthdays/month', birthday.month)
    app.get('/birthdays/today', birthday.today)
    app.get('/birthdays/friends/:facebookid', birthday.show )
    app.get('/api/birthdays', birthday.apiBirthdays)
};
