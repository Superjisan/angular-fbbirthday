'use strict';

module.exports = function(app) {

    //Home route
    var schedule = require('../controllers/schedule');

    app.get('/schedules', schedule.all);
    app.post('/schedules', schedule.create);
    // app.get('/schedules/:messageid', schedule.show)
    // app.put('/schedules/:messageid', schedule.update)
};
