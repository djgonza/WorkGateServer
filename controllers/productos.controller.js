var express = require('express');
var router = express.Router();
var productosService = require('services/productos.service');

// routes
router.get('/', getProductos);

module.exports = router;

function getProductos (req, res) {

	console.log("Pidiendo productos...");

	productosService.getProductos()
	.then(productos => {
		res.status(200).send(productos);
		console.log("Enviando productos...");
	})
	.catch(err => {
		res.status(400).send(err);
		console.log("error: " + err);
	});

}