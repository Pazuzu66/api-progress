const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields} = require('../middlewares')
const { loginUsername  } = require('../helpers')
const { login } = require('../controllers/auth')
const { validToken } = require('../controllers/user_token')

const router = Router()

router.post('/login',[
    check('username','El usuario es Obligatorio').not().isEmpty(),
    check('password','La contraseña es Obligatoria').notEmpty(),
    validateFields,
    loginUsername,
    validateFields,
],login)

router.post('/validate',validToken)

module.exports = router
