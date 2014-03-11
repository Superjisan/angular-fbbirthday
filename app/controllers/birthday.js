'use strict';


var mongoose = require('mongoose'),
    Birthday = mongoose.model('Birthday'),
    graph = require('fbgraph');

exports.exportFbData = function(req, res){
    var secretAccess = req.user.fb_accessToken;
    graph.setAccessToken(secretAccess);
    var ownerId = req.user.fb_id;
    var ownerName = req.user.name;

    graph.get(ownerId + '/friends/?fields=id,name,birthday,picture', function(err,data){
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
                console.log("You've uploaded "+ num_friends+ " friends' bday data to " + ownerName+ "'s database.");
                           }
            else {
                console.log("You already have "+ ownerName +"'s friends' birthday data.");
            }

            res.redirect('/#!/birthdays');
        });
    });

    // res.redirect('/#!/birthdays');
};

exports.show = function(req, res){
  res.jsonp(req.user.fb_id);
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

exports.all = function(req,res) {
    Birthday.find({"user_id" : req.user.fb_id}, function(err, friends){
        if (err) {
         res.render('error', {status: 500})
        } else {
            res.jsonp(friends)
        }
    })
}



