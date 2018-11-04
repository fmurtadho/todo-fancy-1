const router = require('express').Router()
const controller = require('../controllers/userController')
const middleware = require('../middlewares/index')

router.post('/register',middleware.emailUnique,controller.register)
router.post('/login',controller.login)

module.exports = router