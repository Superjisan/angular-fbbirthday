'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    graph = require('fbgraph');

exports.showFriend = function(req, res){
    var secretAccess = req.user.fb_accessToken;
    graph.setAccessToken(secretAccess)
    var ownerId = req.user.fb_id
    var friendsData = [];
    graph.get(ownerId + '/friends/?fields=id,name,birthday', function(err,data){
      console.log(data)
    })
    console.log(friendsData)

    res.redirect('/');
};
