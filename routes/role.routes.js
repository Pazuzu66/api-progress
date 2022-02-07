const { Router } = require("express");
const { check, buildCheckFunction } = require("express-validator");

const { getRoles, getRoleById, updateRole, deleteRole, createRole } = require('../controllers/roles');
const {  existRoleByName, existRoleById, notExistRole, activeUser } = require("../helpers/db_validators");
const { validateFields, validateJWT, haveRole } = require('../middlewares');

const checkAuthUser =buildCheckFunction(['authUser'])
const router = Router()

//Posteriormente agregaré validacion con JWT
router.get('/', getRoles)
router.get('/:id', getRoleById)

router.post('/',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
    haveRole('ADMIN_ROLE'),
    check('role','El Nombre del Role es Obligatorio').notEmpty(),
    check('role','El Rol debe ser de tipo String').isString(),
    check('role').custom(existRoleByName),
    validateFields
], createRole)


router.put('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
    haveRole('ADMIN_ROLE'),
    check('id','El id es Obligatorio').notEmpty(),
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existRoleById),
    check('role','El Nombre del Role es Obligatorio').notEmpty(),
    check('role').custom(existRoleByName),
    validateFields
],updateRole)

router.delete('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
    haveRole('ADMIN_ROLE'),
    check('id','El id es Obligatorio').notEmpty(),
    check('id','El id no es válido').isMongoId(),
    check('id').custom(notExistRole),
],deleteRole)

module.exports = router;

