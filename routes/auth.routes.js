const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields} = require('../middlewares')
const { loginUsername  } = require('../helpers')
const { login } = require('../controllers/auth')

const router = Router()

router.post('/login',[
    check('username','El usuario es Obligatorio').notEmpty(),
    check('password','La contraseña es Obligatoria').notEmpty(),
    check('username').custom(loginUsername),
    validateFields
],login)

module.exports = router
