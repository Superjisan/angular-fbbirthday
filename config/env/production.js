'use strict';

module.exports = {
    db: process.env.MONGOLAB_URI,
    app: {
        name: 'Facebook-Birthday Angular App'
    },
    facebook: {
        clientID: '739502299401603',
        clientSecret: '8efe4a94ec9e73705edad1c56e709e11',
        callbackURL: '/auth/facebook/callback'
    }
};
