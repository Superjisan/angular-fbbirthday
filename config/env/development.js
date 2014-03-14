'use strict';

module.exports = {
    db: 'mongodb://localhost/Facebook-Birthday',
    app: {
        name: 'Facebook-Birthday App'
    },
    facebook: {
        clientID: '739502299401603',
        clientSecret: '8efe4a94ec9e73705edad1c56e709e11',
        callbackURL: '/auth/facebook/callback'
    }
};
