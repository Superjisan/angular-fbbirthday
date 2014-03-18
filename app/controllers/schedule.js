'use strict';

var cronJob = require('cron').CronJob;
var time = require('time');
var async = require('async');
var cronTime = require('./cronTime');
var mongoose = require('mongoose');
var Messages = mongoose.model('ScheduledMessage');
var Client = require('node-xmpp-client');
var ltx  = require('ltx');

exports.all = function(req, res) {
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
            Messages.find({"user_id" : fb_id},
                function(err, messages){
                    if (err) {
                        res.render('error', {status: 500})
                    } else {
                        callback(null, 'done')
                        res.jsonp(messages)
                    }
                })
            }], function(err, result) {
                if (err) {console.log(err)}
            })
}

exports.create = function(req, res) {

// var test = '* * * * * *' // second, minute, hour, date, month, weekday
console.log(req.body)

//I don't think I need to do this.
async.waterfall([
  function(callback) {

    var received_data = req.body.date
    callback(null, received_data)
}, function( received_data, callback) {

    var time_converted = cronTime.cronTime(received_data)
    console.log(time_converted)

    //put the job in database
    var message = new Messages(req.body);
    message.user_id = req.user.fb_id;
    message.cron_timeScheduled =  time_converted;
    message.time_scheduled = req.body.date;
    message.sent = false;
    message.to_friend_name = req.body.friend_name;
    message.to_friend_id = req.body.friend_id;
    message.message = req.body.message;
    message.save()

    //for facebook chat
    var facebookId = req.user.fb_id;
    var user_name = req.user.name;
    var friend_id = req.body.friend_id;
    var new_message = req.body.message;
    var friend_name = req.body.friend_name

    //set the cronJob
    try {
        var t =  new cronJob(time_converted, function(){
            var current_time = new Date();
            console.log('test fired at: ', current_time);
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
                      .t(new_message)

                  client.send(chat);
                  client.end()

              // nodejs has nothing left to do and will exit
                  console.log (user_name + " sent this text '" + new_message + "' to " + friend_name);

                });



      }, null, true, "America/New_York");}
    catch(ex) {
      console.log("cron pattern not valid")
    }

    callback(null, 'done')
}],

  function(err, results) {
    if (err) { console.log(err)}
    res.redirect('/#!/birthdays/today')
  })

}

exports.show = function(req, res) {
    res.jsonp(messages)
}

exports.update = function(req, res) {
    var message = req.message
    message = _.extend(message, req.body)
    message.save(function(err) {
        res.jsonp(message)
    });
}
