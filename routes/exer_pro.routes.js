const { Router } = require("express");
const { check,buildCheckFunction,header } = require("express-validator");

const { getExercises_Pro, createExer_Pro, deleteExer_Pro, updateExer_Pro } = require('../controllers/exercises_pro');
const { validateFields, validateJWT, } = require("../middlewares");
const { activeUser, existJWTDB } = require('../helpers')
const checkAuthUser = buildCheckFunction(['authUser'])

const router = Router()

router.get('/',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    existJWTDB,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields 
],getExercises_Pro)

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
    check('date','LaF Fecha es Obligatoria').notEmpty(),
    check('date','No es valida la fecha').isDate(),
    check('exercise','El Ejercicio es Obligatorio').notEmpty(),
    check('exercise','El Ejercicio debe ser de Tipo String').isString(),
    check('weight','El peso es Obligatorio').notEmpty(),
    check('weight','El peso debe ser de tipo Numerico').isNumeric(),
    check('repetitions','Las Repeticiones son Obligatorias').notEmpty(),
    check('repetitions','El peso debe ser de tipo Numerico').isNumeric(),
    validateFields
],createExer_Pro)

router.put('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    existJWTDB,
    check('id','El Id es Obligatorio').notEmpty(),
    check('id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields
],updateExer_Pro)

router.delete('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    existJWTDB,
    check('id','El Id es Obligatorio').notEmpty(),
    check('id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields
],deleteExer_Pro)

module.exports = router;
