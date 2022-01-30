const { Router } = require("express")
const { check } = require("express-validator")

const { existUsername } = require("../helpers")
const { isValidAge, isValidGender, validateFields } = require("../middlewares")
const { createUser } = require("../controllers/user")

const router = Router()

router.post('/',[
    check('username','El usuario es Obligatorio').notEmpty(),    
    check('username').custom(existUsername),
    check('password','La contraseña es Obligatoria').notEmpty(),    
    check('name','El Nombre es Obligatorio').notEmpty(),
    check('name','Debe ser un Nombre valido').isString(),
    check('surname','Los apellidos son Obligatorios').notEmpty(),
    check('surname','Los apellidos no son Validos').isString(),
    check('age', 'La edad es Obligatoria').notEmpty(),    
    isValidAge,
    check('gender','El genero es Obligatorio').notEmpty(),
    isValidGender,
    validateFields
],createUser)

module.exports = router
