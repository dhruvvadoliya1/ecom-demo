const router = require('express').Router()
const AuthController = require('../controllers/authController')
const { validateUser } = require('../middlewares/auth') 

router.post('/login', AuthController.login);
router.post('/logout', validateUser , AuthController.logout)

module.exports = router;