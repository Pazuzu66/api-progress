const validateFields = require('../middlewares/validate_fields')
const singUpValidates = require('../middlewares/singUpValidates')

module.exports = {
    ...validateFields,
    ...singUpValidates
};
