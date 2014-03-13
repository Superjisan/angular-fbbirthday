'use strict';

module.exports = {
    db: 'mongodb://heroku_app22918578:5umji2jstcd9pfobanm3pfebf2@ds033499.mongolab.com:33499',
    app: {
        name: 'Facebook-Birthday Angular App'
    },
    facebook: {
        clientID: '739502299401603',
        clientSecret: '8efe4a94ec9e73705edad1c56e709e11',
        callbackURL: '/auth/facebook/callback'
    }
};
