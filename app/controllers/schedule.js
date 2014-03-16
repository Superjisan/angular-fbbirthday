var cronJob = require('cron').CronJob;
var time = require('time');
var async = require('async')

exports.test = function(req, res) {

var test = '* * * * * *' // second, minute, hour, date, month day
console.log(req.body.date)

async.waterfall([
  function(callback) {

    var received_data = req.body.date
    callback(null, received_data)
}, function( received_data, callback) {
// var cronJobs = []
    var Second = 0;
    var Minute = received_data.getMinutes();
    var Hour = received_data.getHours();
    var date = received_data.getDate();
    var Month = received_data.getMonth();
    var Year = received_data.getFullYear();

    var cron_time= '' + Second + ' ' + Minute +  ' ' + Hour + ' ' + date + ' ' + Month + ' ' + Day;
    console.log(cron_time)

    callback(null, 'done')
}],

  function(err, results) {
    if (err) { console.log(err)}
    res.redirect('/#!/birthdays/today')
  })

// try {
// var t =  new cronJob(test, function(){
//     current_time = new Date();
//     console.log('test fired at: ', current_time);
//     var stacklength = cronJobs.length
//     cronJobs.push({stacklength : t})
//   }, null, true, "America/New_York");}
// catch(ex) {
//   console.log("cron pattern not valid")
// }

// console.log(cronJobs)
// t.stop()

}
