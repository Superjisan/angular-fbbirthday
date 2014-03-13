'use strict';

// User routes use users controller
var users = require('../controllers/users');
module.exports = function(app, passport) {

    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    // Setting up the users api
    app.post('/users', users.create);

    // Setting up the userId param
    app.param('userId', users.user);

    // Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    // Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me', 'friends_birthday', 'xmpp_login', 'publish_stream'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/birthdays/data',
        failureRedirect: '/signin'
    }), function(req, res, next) {
        // res.redirect('/birthdays/data');
        next();
    });

    // Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);


};
