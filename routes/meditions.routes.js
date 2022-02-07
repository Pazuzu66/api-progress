const { Router } = require("express");
const { check,buildCheckFunction } = require("express-validator");

const { getMeditions_Pro, getMeditions_Date, deleteMedition_Pro, updateMedition_Pro, createMedition_Pro } = require('../controllers/meditions');
const { activeUser, existJWTDB } = require("../helpers/db_validators");
const { validateFields, validateJWT } = require('../middlewares')

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
],getMeditions_Pro)

router.get('/date',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    validateFields,
    validateJWT,
    existJWTDB,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    check('date','La Fecha es Obligatoria').notEmpty(),
    checkAuthUser('_id').custom(activeUser),
    validateFields 
],getMeditions_Date)

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
    check('date','La Fecha es Obligatoria').notEmpty(),
    check('date','La Fecha debe terner el formato yyyy-mm-dd').isDate(),
    check('weight','El Peso es Obligatori').notEmpty(),
    check('weight','El Peso debe ser Numerico').isNumeric(),
    check('bmi','El IMC es Obligatorio').notEmpty(),
    check('bmi','El IMC debe ser String').isString(),
    check('diagnosis','El Diagnostico es Obligatorio').notEmpty(),
    check('diagnosis','El Diagnostico debe ser String').isString(),
    check('fat_percentage','El Porcentaje de grasa es Obligatorio').notEmpty(),
    check('fat_percentage','El Porcentaje de grasa debe ser Numerico ').isNumeric(),
    check('fat_kg','los Kg de Musculo esqueletico es Obligatorio').notEmpty(),
    check('fat_kg','los Kg de Musculo esqueletico debe ser Numerico').isNumeric(),
    check('visceral_fat','La Grasa Visceral es Obligatoria').notEmpty(),
    check('visceral_fat','La Grasa Visceral debe ser Numerico').isNumeric(),    
    check('basal_metabolic','El metabolismo Basal es Obligatorio ').notEmpty(),
    check('basal_metabolic','El metabolismo Basal debe ser Numerico').isNumeric(),
    validateFields    
],createMedition_Pro)

router.put('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    check('id','El Id es Obligatorio').notEmpty(),
    check('id','No es un Id Valido').isMongoId(),
    validateFields,
    validateJWT,
    existJWTDB,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
],updateMedition_Pro)

router.delete('/:id',[
    check('jtoken','El token es requerido para realizar la acción').notEmpty(),
    check('jtoken','No es un token valido').isJWT(),
    check('id','El Id es Obligatorio').notEmpty(),
    check('id','No es un Id Valido').isMongoId(),
    validateFields,
    validateJWT,
    existJWTDB,
    checkAuthUser('id','El Id es Obligatorio').notEmpty(),
    checkAuthUser('_id','No es un Id Válido').isMongoId(),
    checkAuthUser('_id').custom(activeUser),
    validateFields,
],deleteMedition_Pro)

module.exports = router

