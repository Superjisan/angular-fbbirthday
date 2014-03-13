'use strict';

var mongoose = require('mongoose'),
    Birthday = mongoose.model('Birthday'),
    Client = require('node-xmpp-client'),
    User = mongoose.model('User'),
    ltx  = require('ltx'),
    async = require('async'),
    graph = require('fbgraph'),
    FB = require('fb');


exports.FbMessage = function (req, res) {

  async.waterfall([
    function(callback) {

      var friend_id;
      var friend_name = req.body.friend_name;

      var message = req.body.message;
      console.log(message)

      //get and set the friend's facebook id
      Birthday.findOne({"name" : friend_name}, function(err, data){
        if (err){console.log(err)}
         console.log(data)
         friend_id = data.fb_id
          callback(null, friend_id, friend_name, message)
      })



    },
    function (friend_id, friend_name, message, callback) {
      var facebookId = req.user.fb_id;
      var user_name = req.user.name;

      console.log(friend_name, "friend_id: ", friend_id)

      var client = new Client({
        jid : '-' + facebookId + '@chat.facebook.com',
        api_key : '739502299401603',
        secret_key : '8efe4a94ec9e73705edad1c56e709e11',
        access_token : req.user.fb_accessToken
      });

      console.log(req.user.fb_accessToken)

      client.addListener('online', function(data) {
          console.log('Connected as ' + data.jid.user + '@' + data.jid.domain + '/' + data.jid.resource)

          //send message via facebook
          var chat = new ltx.Element('message', { to: '-' + friend_id + '@chat.facebook.com', type: 'chat' })
              .c('body')
              .t(message)

          client.send(chat);
          client.end()

      // nodejs has nothing left to do and will exit
          console.log (user_name + " sent this text '" + message + "' to " + friend_name);

        });


      callback(null, 'done');
      }
    ], function(err, result) {
       if (err) {console.log(err)}
          res.redirect('/#!/birthdays')
        })
}

exports.postWall = function (req, res) {

  var secretAccess = req.user.fb_accessToken;
  FB.setAccessToken(secretAccess);

  var wallPost = { message : req.body.message },
  friend_id,
  friend_name = req.body.friend_name,
  user_id = req.user.fb_id;

  Birthday.findOne({"name" : friend_name}, function(err, data){
        if (err){console.log(err)}
         console.log(data)
         friend_id = data.fb_id;

         // graph.post( user_id+ "/feed", wallPost, function(err, res) {
         //    // returns the post id
         //    console.log(res); // { id: xxxxx}
         //    });

        FB.api('', 'post', {
                batch: [
                    { method: 'post', relative_url: friend_id + '/feed', body:'message=' + encodeURIComponent(wallPost) }
                ]
            }, function (res) {
                var res0;

                if(!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return ;
                }

                res0 = JSON.parse(res[0].body);

                if(res0.error) {
                    console.log(res0.error);
                } else {
                    console.log('Post Id: ' + res0.id);
                }
            });
      })


  res.redirect('/#!/birthdays')

}

