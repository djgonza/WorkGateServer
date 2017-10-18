var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

module.exports = new Schema({

	firstName : {
		type: String,
		default: null
	},
	lastName:{
		type: String,
		default: null
	},
	username: {
		type: String,
		default: null
	},
	email: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true,
		set: (userId) => { return bcrypt.hashSync(userId, 10); }
	},
	role: {
		type: Number,
		default: 0
	},
	createdAt: { 
		type: Date, 
		default: Date.now,
	}

});