const express = require('express')

const router = express.Router()

const getUsersController = require('../../controller/getUsers').getUsers

/**
 * @method - GET
 * @param - /users
 * @description - Get Users
 */

router.get('/users', getUsersController)

module.exports = router
