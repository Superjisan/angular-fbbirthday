'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Facebook Birthday Schema
var BirthdaySchema = new Schema({
    user_id: {type: String, required: true},
    name: String,
    fb_id: {type: String,
          required: true},
    birthday: String,
    image: {}
});

BirthdaySchema.virtual("isToday").get(function(birthday){

  // console.log('Entering isToday');
  // console.log('requesterid:',requesterid)
  var today = new Date();
  today.setYear(0);
  var temp = new Date(birthday);
  temp.setYear(0);

  // if(requesterid === this.user_id)
  // {
   return today.toDateString() == temp.toDateString();
  // }
  // else {
  //   return false;
  // }
})

BirthdaySchema.statics = {
  load: function (id,cb) {
    this.findOne({_id: id}).exec(cb);
  }
}
BirthdaySchema.set('toJSON', { getters: true, virtuals: true });
BirthdaySchema.set('toObject', { getters: true, virtuals: true });

mongoose.model('Birthday', BirthdaySchema);
