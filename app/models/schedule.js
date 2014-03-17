'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ScheduledMessageSchema = new Schema({
  user_id : {type: String, required: true, ref: 'User'},
  message : String,
  sent : Boolean,
  time_scheduled : String,
  cron_timeScheduled : String,
  to_friend_name : {type: String, ref:'Birthday'},
  to_friend_id : {type: String, ref:'Birthday'}
})

ScheduledMessageSchema.statics = {
  load: function(id,cb) {
    this.findOne({_id: id}).populate('user_id', 'fb_id').populate('to_friend_id', 'fb_id').populate('to_friend_name', 'name').exec(cb)
  }
}

mongoose.model('ScheduledMessage', ScheduledMessageSchema);
