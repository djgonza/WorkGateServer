var express = require('express');
var router = express.Router();
var UserService = require('services/user.service');

// routes
router.post('/create', create);
router.put('/update', update);
router.get('/get', getUserById);

module.exports = router;


/**
* Crea un usuario mediante el user.service
*/
function create(req, res) {

	// Comprueba que tiene lo necesario para crear el usuario
	if(!req.body.userId || !req.body.email) {
		res.status(401).send("Faltan parametros");
		return;
	}

	// LLama al servicio para crear el usuario y lo envia
	UserService.createUser(req.body)
		.then((newUser) => {
			res.status(200).send(newUser);
		})
		.catch((err) => {
			res.status(409).send(err);
		});
}

/**
* Actualiza un usuario mediante el user.service
*/
function update(req, res) {

	res.status(200).send("Pendiente...");

	// Pasamos el id del usuario y los campos a actualizar
	/*UserService.updateUserById(req.user.id, req.body)
		.then((newUser) => {
			res.status(200).send(newUser);
		})
		.catch((err) => {
			res.status(409).send(err);
		});*/
}

/**
* Busca un usuario por su id y lo devulve
*/
function getUserById(req, res) {

	console.log(req.user.id);
	res.status(200).send("Pendiente...");

}

