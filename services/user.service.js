var Q = require('q');
var User = require('models/user.model');

var service = {};

service.createUser = createUser;
service.getUserByEmail = getUserByEmail;
service.getUserById = getUserById;
service.updateUserById = updateUserById;

module.exports = service;

/**
* Crea el usuario y lo retorna
* Parametro: Objeto User 
*/
function createUser (userParam) {

	let deferred = Q.defer();

	// Comprovamos si el usuario existe
	getUserByEmail(userParam.email)
	.then(user => {
		// Usuario ya registrado, enviamos el error
		if (user){
			deferred.reject("Usuario ya registrado");
		}else{
			// Crea el objecto usuario con los parametros pasados y lo devuelve
			new User (userParam) 
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

/**
* Busca un usuario por su email
* Devuelve el usuario sin password, o null si no lo encuentra
*/
function getUserByEmail (email) {

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

/**
* Busca un usuario por su id
* Devuelve el usuario sin password, o null si no lo encuentra
*/
function getUserById (id) {

	var deferred = Q.defer();

	User.findOne({_id: id}, {password:0})
	.then(user => {
		deferred.resolve(user);
	})
	.catch(err => {
		deferred.reject(err);
	});

	return deferred.promise
}

/**
* Busca un usuario por su id y lo actualiza con los datos recividos
*/
function updateUserById (_id, userParam){

	var deferred = Q.defer();

	getUserById(_id)
	.then (user => {
		/** TODO:  recivimos los parametros y actualizamos **/
		deferred.resolve ();
	})
	.catch (err => {
		deferred.reject (err);
	})

	return deferred.promise;

}

