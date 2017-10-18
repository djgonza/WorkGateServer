var config = require('config.json');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.Promise = require('q').Promise;


db.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
    //mongoose.disconnect();
});

db.once('open', function () {
	console.log("Opened mongoose");
    //mongoose.disconnect();
});

db.once('close', function () {
	console.log("Closed mongoose");
});

//Connect to the database
//Check the ENV to node
if(process.env.NODE_ENV == "production"){
	mongoose.connect(config.connectionString, {
		useMongoClient: true
	});
}else{
	mongoose.connect(config.connectionStringLocal, {
		useMongoClient: true
	});
}


