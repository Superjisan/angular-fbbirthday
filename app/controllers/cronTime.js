'use strict'

module.exports = {

cronTime: function (timeString){
    var stringArr = timeString.split(' ');

    var weekday = getweekDay(stringArr[0]);
    var month = getMonth(stringArr[1]);
    var date = getNum(stringArr[2])
    var year = getNum(stringArr[3])
    var time = new getDayTime(stringArr[4])
    var hour = time.hour
    var minute = time.minute
    var second = time.second

    return '' + second + ' ' + minute + ' ' + hour + ' ' + date + ' ' + month + ' ' + weekday

    }
}

function getweekDay(dayAbbr){
    var result;
    switch(dayAbbr) {
     case  "Sun":
        result= 0;
        break;
     case  "Mon":
        result= 1;
        break;
     case  "Tue":
        result= 2;
        break;
     case  "Wed":
        result= 3;
        break;
     case  "Thu":
        result= 4;
        break;
     case  "Fri":
        result= 5;
        break;
     case  "Sat":
        result= 6;
        break;
    }
    return result
}

function getMonth(dayAbbr){
    var result;
    switch(dayAbbr) {
     case  "Jan":
        result= 0;
        break;
     case  "Feb":
        result= 1;
        break;
     case  "Mar":
        result= 2;
        break;
     case  "Apr":
        result= 3;
        break;
     case  "May":
        result= 4;
        break;
     case  "Jun":
        result= 5;
        break;
     case  "Jul":
        result= 6;
        break;
    case  "Aug":
        result= 7;
        break;
    case  "Sep":
        result= 8;
        break;
    case  "Oct":
        result= 9;
        break;
    case  "Nov":
        result= 10;
        break;
    case  "Dec":
        result= 11;
        break;
    }
    return result
}

function getNum(dateString){
    var num = Number(dateString)
    return num
}

var timeString = '08:45:00'

function getDayTime(string){
    var stringArr = string.split(":");

    this.hour =  getNum(stringArr[0])

    this.minute = getNum(stringArr[1])

    this.second = getNum(stringArr[2])

     }
