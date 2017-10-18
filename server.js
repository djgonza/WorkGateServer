require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var revokedToken = require('middleware/revokedToken');
var dbConnection = require('middleware/dbConnection');
var router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(expressJwt({ 
	secret: config.secret,
	resultProperty: 'user',
	getToken: (req) => {
		if (req.headers.authorization) {
			return req.headers.authorization;
		} else if (req.query && req.query.oauth_token) {
			return req.query.oauth_token;
		}
		return null;
	}
}).unless({ 
	//Rutas excluidas de la autentificacion
	path: ['/user/create', '/authenticate/bygoogle', '/ping'] 
}));
app.use(revokedToken);

/**
* Define todas las rutas de la aplicacion
*/
app.use('/user', require('./controllers/users.controller'));
app.use('/authenticate', require('./controllers/authenticate.controller'));

//Para pruebas
app.use('/ping', router.get('/', (req, res) => {
	res.status(200).send("ping");
}));


// start server
console.log(process.env.NODE_ENV);
var port = 4000;
if (process.env.NODE_ENV == "PROD"){
	port = process.env.PORT;
}

var server = app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
