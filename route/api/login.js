const express = require('express');
const router = express.Router();

const loginController = require('../../controller/auth').loginUsers;

/**
 * @method - POST
 * @param - /users/login
 * @description - User Login
 */

router.post('/users/login', loginController)

module.exports = router;
