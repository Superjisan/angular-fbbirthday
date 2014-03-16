'use strict';

module.exports = function(app) {

    //Home route
    var schedule = require('../controllers/schedule');

    app.get('/schedules', schedule.test);
    app.post('/schedules', schedule.test)

};
