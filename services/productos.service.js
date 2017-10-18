var Q = require('q');
var service = {};

service.getProductos = getProductos;

module.exports = service;

function getProductos () {

	var deferred = Q.defer();

	var productos = new Array();

	productos.push({"nombre": "Producto 1 desde el server", "fechaCaducidad": new Date()});
	productos.push({"nombre": "Producto 2 desde el server", "fechaCaducidad": new Date()});
	productos.push({"nombre": "Producto 3 desde el server", "fechaCaducidad": new Date()});
	productos.push({"nombre": "Producto 4 desde el server", "fechaCaducidad": new Date()});
	productos.push({"nombre": "Producto 5 desde el server", "fechaCaducidad": new Date()});

	//Enviamos los productos
	deferred.resolve(productos);
	//Error en la promesa
	//deferred.reject("Objeto error");

	return deferred.promise;

}