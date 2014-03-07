'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');
var swig = require('swig');


module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	db: process.env.MONGOHQ_URL,
	templateEngine: 'swig',
  swig: {cache: false},

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions'
};
