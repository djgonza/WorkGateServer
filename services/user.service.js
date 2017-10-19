var Q = require('q');
var User = require('models/user.model');

var service = {};

service.getGoogleUserByEmail = getGoogleUserByEmail;
service.createGoogleUser = createGoogleUser;

module.exports = service;

/*
* 
* Busca un usuario de google por su email
*/
function getGoogleUserByEmail (email) {

	var deferred = Q.defer();

	User.findOne({'email': email})
	.then(user => {
		deferred.resolve(user);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

/*
*
* Crea un usuario con google
*/
function createGoogleUser (googleUser) {

	let deferred = Q.defer();

	// Comprovamos si el usuario existe
	getGoogleUserByEmail(googleUser.email)
	.then(user => {
		// Usuario ya registrado, enviamos el error
		if (user){
			deferred.reject("Usuario ya registrado");
		}else{
			// Crea el objecto usuario con los parametros pasados y lo devuelve
			new User (googleUser) 
			.save()
			.then(createdUser => {
				deferred.resolve(createdUser);
			})
			.catch(err => {
				deferred.reject(err);
			});
		}
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise;

}

