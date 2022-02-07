const { Router } = require("express")
const { check, buildCheckFunction } = require("express-validator")

const { existUsername, activeUser, existJWTDB } = require("../helpers")
const { isValidAge, isValidGender, validateFields, validateJWT, haveRole } = require("../middlewares")
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/user")

const checkAuthUser = buildCheckFunction(['authUser'])
const router = Router()

router.post('/',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    existJWTDB,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
    haveRole('ADMIN_ROLE'),
    check('username','El usuario es Obligatorio').notEmpty(),    
    check('username').custom(existUsername),
    check('password','La contraseña es Obligatoria').notEmpty(),    
    check('name','El Nombre es Obligatorio').notEmpty(),
    check('name','Debe ser un Nombre valido').isString(),
    check('surname','Los apellidos son Obligatorios').notEmpty(),
    check('surname','Los apellidos no son Validos').isString(),
    check('gender','El genero es Obligatorio').notEmpty(),
    check('age', 'La edad es Obligatoria').notEmpty(),    
    validateFields,
    isValidAge,
    isValidGender
],createUser)

router.get('/',getUsers)

router.put('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    existJWTDB,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
    haveRole('ADMIN_ROLE'),
    check('id','El Id es Obligatorio').notEmpty(),
    check('id','No es un Id Valido').isMongoId(),
    validateFields,
],updateUser)

router.delete('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    existJWTDB,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
    haveRole('ADMIN_ROLE'),
    check('id','El Id es Obligatorio').notEmpty(),
    check('id','No es un Id Valido').isMongoId(),
    validateFields,
],deleteUser)

module.exports = router
