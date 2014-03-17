var cronJob = require('cron').CronJob;
var time = require('time');
var async = require('async');
var cronTime = require('./cronTime');
var mongoose = require('mongoose');
var Messages = mongoose.model('ScheduledMessage');

exports.all = function(req, res) {
    Messages.find().populate('user_id').exec(function(err, messages){
        if (err) {
            res.render('error', {status: 500})
        } else {
            res.jsonp(messages)
        }
    })
}

exports.create = function(req, res) {

// var test = '* * * * * *' // second, minute, hour, date, month, weekday
console.log(req.body)

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
    message.crontimeScheduled =  time_converted;
    message.timeScheduled = req.body.date;
    message.sent = false;
    message.to_friend_name = req.body.friend_name;
    message.to_friend_name = req.body.friend_id;
    message.message = req.body.message;
    message.save()

    //set the cronJob
    try {
        var t =  new cronJob(time_converted, function(){
            current_time = new Date();
            console.log('test fired at: ', current_time);

      }, null, true, "America/New_York");}
    catch(ex) {
      console.log("cron pattern not valid")
    }

    callback(null, 'done')
}],

  function(err, results) {
    if (err) { console.log(err)}
    res.render('/#!/schedules')
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
