var config = require('config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var UserService = require('./user.service');

var service = {};

service.authenticateByGoogle = authenticateByGoogle;

module.exports = service;

/*
* 
* Intenta el login con un usuario de google
* Si lo consigue devuelve un token
* Si no lo consigue crea el usuario y vuelve a realizar el login devolviendo el token
*/

function authenticateByGoogle (googleUser) {

	var deferred = Q.defer();

	// Busca el usuario por el email
	UserService.getGoogleUserByEmail(googleUser.email)
	.then(user => {

		// Crea el token
		let token = getTokenGoogleUser (googleUser, user);

		// Si no puede crear el token crea el usuario
		if (!token) {

			UserService.createGoogleUser(googleUser)
			.then(user => {

				// Crea el token
				let token = getTokenGoogleUser (googleUser, user);
				// Devuelve el token
				deferred.resolve(token);

			})
			.catch(err => {
				deferred.reject(err);
			});

		} else {

			// Devuelve el token
			deferred.resolve(token);
		}

	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}



/*
*
* Crea y retorna el token o null
*/

function getTokenGoogleUser (googleUser, dbUser) {

	if (!googleUser || !dbUser || !bcrypt.compareSync(googleUser.userId, dbUser.userId)) {
		return null;
	}

	let token = {
		token: jwt.sign({ id: dbUser._id }, config.secret)
	};

	return token;

}











