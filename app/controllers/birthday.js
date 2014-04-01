'use strict';


var mongoose = require('mongoose'),
    Birthday = mongoose.model('Birthday'),
    graph = require('fbgraph'),
    async = require('async');

exports.exportFbData = function(req, res){
    var secretAccess = req.user.fb_accessToken;
    graph.setAccessToken(secretAccess);
    var ownerId = req.user.fb_id;
    var ownerName = req.user.name;

    //using graph to get all the data of friends
    graph.get(ownerId + '/friends/?fields=id,name,birthday,picture.type(large)', function(err,data){
        var bdFriendData = data.data;//array of friend objects

        if(err){
            console.log(err);
        }
        //this needs to be in a different file
        Birthday.findOne({
            'user_id': ownerId
        }, function(err,user){
            if (err){
                console.log(err);
            }
            else if(!user){
                var num_friends = 0;
                bdFriendData.forEach(function(friend){
                    var friendData = new Birthday({
                        user_id: ownerId,
                        name: friend.name,
                        fb_id: friend.id,
                        image: friend.picture,
                        birthday: friend.birthday
                    });
                    friendData.save(function(err){
                        if (err) console.log(err);
                    });
                    num_friends++;
                });
                console.log("Mongoose uploaded "+ num_friends+ " friends' bday data to " + ownerName+ "'s database.");                           }
            else {
                console.log("Mongoose already have "+ ownerName +"'s friends' birthday data.");
            }
            res.redirect('/birthdays/today');
        });
    });

    // res.redirect('/#!/birthdays');
};

exports.show = function(req, res){

  async.waterfall([
        function(callback) {
            if (req.user) {
            var user = req.user
            // console.log(user)
            var fb_id = user.fb_id
            var friend_id = req.params.facebookid;
            // console.log(fb_id)
            callback(null,fb_id, friend_id)

            }
        },
        function(fb_id, friend_id, callback) {
            Birthday.findOne({"fb_id" : friend_id},
                function(err, friend){
                    if (err) {
                        res.render('error', {status: 500})
                    } else {
                        callback(null, 'done')
                        res.render('birthdays/friend', {friend: friend, user: req.user, noImg : 'img/No-Image.png'})
                    }
                })
            }], function(err, result) {
                if (err) {console.log(err)}
            })
}

exports.friend = function(req,res, next, id){
    var Birthday = mongoose.model('Birthday')
    Birthday.load(id, function (err, birthday){
        if (err) next(err);
        if (!birthday) return next(new Error('Failed to load friend' + id))
        req.birthday = birthday
        next()
    })
}

exports.all = function(req, res) {
    //the req.user.fb_id was having some trouble processing at times so I made it async
    async.waterfall([
        function(callback) {
            if (req.user) {
            var user = req.user
            // console.log(user)
            var fb_id = user.fb_id
            // console.log(fb_id)
            callback(null,fb_id)
            }
        },
        function(fb_id, callback) {
            Birthday.find({"user_id" : fb_id},
                function(err, friends){
                    if (err) {
                        res.render('error', {status: 500})
                    } else {
                        callback(null, 'done')
                        res.render('birthdays/all', {friends: friends, user: req.user ? JSON.stringify(req.user) : 'null'})
                    }
                })
            }], function(err, result) {
                if (err) {console.log(err)}
            })
}

exports.apiBirthdays = function(req, res) {
    //the req.user.fb_id was having some trouble processing at times so I made it async
    async.waterfall([
        function(callback) {
            if (req.user) {
            var user = req.user
            // console.log(user)
            var fb_id = user.fb_id
            // console.log(fb_id)
            callback(null,fb_id)
            }
        },
        function(fb_id, callback) {
            Birthday.find({"user_id" : fb_id},
                function(err, friends){
                    if (err) {
                        res.render('error', {status: 500})
                    } else {
                        callback(null, 'done')
                        res.jsonp(friends)
                    }
                })
            }], function(err, result) {
                if (err) {console.log(err)}
            })
}



exports.today = function(req, res) {
    //the req.user.fb_id was having some trouble processing at times so I made it async
    async.waterfall([
        function(callback) {
            if (req.user) {
            var user = req.user
            // console.log(user)
            var fb_id = user.fb_id
            // console.log(fb_id)
            callback(null,fb_id)
            }
        },
        function(fb_id, callback) {
            Birthday.find({"user_id" : fb_id},
                function(err, friends){
                    if (err) {
                        res.render('error', {status: 500})
                    } else {
                        callback(null, 'done')
                        res.render('birthdays/today', {friends: friends, user: req.user ? JSON.stringify(req.user) : 'null'})
                    }
                })
            }], function(err, result) {
                if (err) {console.log(err)}
            })
}

exports.week = function(req, res) {
    //the req.user.fb_id was having some trouble processing at times so I made it async
    async.waterfall([
        function(callback) {
            if (req.user) {
            var user = req.user
            // console.log(user)
            var fb_id = user.fb_id
            // console.log(fb_id)
            callback(null,fb_id)
            }
        },
        function(fb_id, callback) {
            Birthday.find({"user_id" : fb_id},
                function(err, friends){
                    if (err) {
                        res.render('error', {status: 500})
                    } else {
                        callback(null, 'done')
                        res.render('birthdays/week', {friends: friends, user: req.user ? JSON.stringify(req.user) : 'null'})
                    }
                })
            }], function(err, result) {
                if (err) {console.log(err)}
            })
}

exports.month = function(req, res) {
    //the req.user.fb_id was having some trouble processing at times so I made it async
    async.waterfall([
        function(callback) {
            if (req.user) {
            var user = req.user
            // console.log(user)
            var fb_id = user.fb_id
            // console.log(fb_id)
            callback(null,fb_id)
            }
        },
        function(fb_id, callback) {
            Birthday.find({"user_id" : fb_id},
                function(err, friends){
                    if (err) {
                        res.render('error', {status: 500})
                    } else {
                        callback(null, 'done')
                        res.render('birthdays/month', {friends: friends, user: req.user ? JSON.stringify(req.user) : 'null'})
                    }
                })
            }], function(err, result) {
                if (err) {console.log(err)}
            })
}

