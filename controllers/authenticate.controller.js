var express = require('express');
var router = express.Router();
var AuthenticateService = require('services/authenticate.service');

// routes
router.post('/bygoogle', authenticateByGoogle);

module.exports = router;


/**
* Acemos login, creamos un token y lo enviamos
*/
function authenticateByGoogle(req, res) {

	AuthenticateService.authenticateByGoogle(req.body)
	.then(token => {

		res.status(200).send(token);

	})
	.catch((err) => {
		res.status(400).send(err);
	});

}