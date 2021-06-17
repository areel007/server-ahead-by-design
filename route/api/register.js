const express = require('express');

const router = express.Router();

const registerController = require('../../controller/auth').registerUser;

/**
 * @method - POST
 * @param - /users/register
 * @description - User Registration
 */

router.post('/users/register', registerController);

module.exports = router;
