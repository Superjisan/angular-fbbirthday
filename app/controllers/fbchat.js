'use strict';

var mongoose = require('mongoose'),
    Birthday = mongoose.model('Birthday'),
    Client = require('node-xmpp-client'),
    User = mongoose.model('User'),
    ltx  = require('ltx');


exports.FbMessage = function (req, res) {

  var facebookId = req.user.fb_id;
  var user_name = req.user.name;
   // Eric
  var friend_name = req.body.friend_name.text();
  console.log(friend_name)
  var friend_id;
  var message = req.body.message;
  console.log(message)

  //get and set the friend's facebook id
  Birthday.findOne({"name" : friend_name}, function(err, data){
    if (err){console.log(err)}
    console.log(data)
  })


  var client = new Client({
    jid : '-' + facebookId + '@chat.facebook.com',
    api_key : '739502299401603',
    secret_key : '8efe4a94ec9e73705edad1c56e709e11',
    access_token : req.user.fb_accessToken
  });


    client.addListener('online', function(data) {
        console.log('Connected as ' + data.jid.user + '@' + data.jid.domain + '/' + data.jid.resource)

        //send message via facebook
        // var chat = new ltx.Element('message', { to: '-' + friend_id + '@chat.facebook.com', type: 'chat' })
        //     .c('body')
        //     .t(message)
        // client.send(chat)
    // nodejs has nothing left to do and will exit
        console.log (user_name + "sent this text '" + message + "' to " + friend_name);
        client.end()
    })

    client.on('stanza', function(stanza) {

        console.log('Received:', stanza.toString())
    })

    client.on('connect', function () {
        console.log('Client is connected')
    })

    client.on('reconnect', function () {
        console.log('Client reconnects …')
    })

    client.on('disconnect', function (e) {
    console.log('Client is disconnected', client.connection.reconnect, e)
    })

    client.addListener('error', function(e) {
        console.error(e)
        process.exit(1)
    })

      console.log("I am on fbchat page")

    process.on('exit', function () {
      client.end()
    })

    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null',
        friend: {id : friend_id, name: friend_name}
    })

}

