const { Router } = require("express");
const { check } = require("express-validator");

const { getRoles, getRoleById, updateRole, deleteRole, createRole } = require('../controllers/roles');
const {  existRoleByName, existRoleById, notExistRole } = require("../helpers/db_validators");
const { validateFields } = require('../middlewares')


const router = Router()

//Posteriormente agregaré validacion con JWT
router.get('/', getRoles)
router.get('/:id', getRoleById)

router.post('/',[
    check('role','El Nombre del Role es Obligatorio').notEmpty(),
    check('role','El Rol debe ser de tipo String').isString(),
    check('role').custom(existRoleByName),
    validateFields
], createRole)


router.put('/:id',[
    check('id','El id es Obligatorio').notEmpty(),
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existRoleById),
    check('role','El Nombre del Role es Obligatorio').notEmpty(),
    check('role').custom(existRoleByName),
    validateFields
],updateRole)

router.delete('/:id',[
    check('id','El id es Obligatorio').notEmpty(),
    check('id','El id no es válido').isMongoId(),
    check('id').custom(notExistRole),
],deleteRole)

module.exports = router;

