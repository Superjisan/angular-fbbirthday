var cronJob = require('cron').CronJob;
var time = require('time');
var async = require('async');
var cronTime = require('./cronTime')

exports.test = function(req, res) {

var test = '* * * * * *' // second, minute, hour, date, month, weekday
console.log(req.body.date)

async.waterfall([
  function(callback) {

    var received_data = req.body.date
    callback(null, received_data)
}, function( received_data, callback) {

    var time_converted = cronTime.cronTime(received_data)
    console.log(time_converted)
    try {
        var t =  new cronJob(time_converted, function(){
            current_time = new Date();
            console.log('test fired at: ', current_time);
            // var stacklength = cronJobs.length
            // cronJobs.push({stacklength : t})
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
