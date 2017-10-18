var config = require('config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var UserService = require('./user.service');

var service = {};

service.authenticateByEmail = authenticateByEmail;

module.exports = service;

/**
* Inicia sesion con el email y la contraseña
* Devuelve el token creado
*/
function authenticateByEmail(email, userId) {

	var deferred = Q.defer();

	UserService.getUserByEmail(email).then(user => {
		if (user && bcrypt.compareSync(userId, user.userId)) {
			// authentication successful
			deferred.resolve({
				token: jwt.sign({ id: user._id }, config.secret)
			});
		} else {
			// authentication failed
			deferred.resolve();
		}

	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;
}