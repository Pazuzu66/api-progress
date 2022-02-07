const validateFields = require('./validate_fields')
const singUpValidates = require('./singUpValidates')
const validateJWT = require('./validateJWT')
const haveRole =require('./validateRole')

module.exports = {
    ...validateFields,
    ...singUpValidates,
    ...validateJWT,
    ...haveRole,
};
