'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Facebook Birthday Schema
var BirthdaySchema = new Schema({
    user_id: {type: String, required: true, ref:'User'},
    name: String,
    fb_id: {type: String,
          required: true},
    birthday: String,
    image: {}
});

BirthdaySchema.virtual("isToday").get(function(birthday){

  var today = new Date();
  today.setYear(0);
  var temp = new Date(birthday);
  temp.setYear(0);


  return today.toDateString() == temp.toDateString();

})

BirthdaySchema.statics = {
  load: function (id,cb) {
    this.findOne({_id: id}).exec(cb);
  }
}

BirthdaySchema.set('toJSON', { getters: true, virtuals: true });
BirthdaySchema.set('toObject', { getters: true, virtuals: true });

mongoose.model('Birthday', BirthdaySchema);
