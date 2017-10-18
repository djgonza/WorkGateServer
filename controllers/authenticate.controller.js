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

	console.log(req.body);

	AuthenticateService.authenticateByEmail(req.body.email, req.body.userId)
		.then((token) => {
			if (token) {
				// authentication successful
				res.status(200).send(token);
			} else {
				// authentication failed
				res.status(401).send('Email or password is incorrect');
			}
		})
		.catch((err) => {
			res.status(400).send(err);
		});
}