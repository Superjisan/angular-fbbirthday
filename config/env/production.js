'use strict';

module.exports = {
    db: 'mongodb://heroku_app22998139:gnwS4etz9m5kgO8HLHnkRCZusjzxYkIB@ds033679.mongolab.com:33679',
    app: {
        name: 'Facebook-Birthday Angular App'
    },
    facebook: {
        clientID: '739502299401603',
        clientSecret: '8efe4a94ec9e73705edad1c56e709e11',
        callbackURL: '/auth/facebook/callback'
    }
};
