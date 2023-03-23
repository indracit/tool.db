const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.route('/').get(userController.getAllUser)
                .patch(userController.updateUser)
                .delete(userController.deletUser)

module.exports = router

