const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El Rol es Obligatorio'],
        unique: true,
    },
    state: {
        type: Boolean,
        default: true
    },
})

RoleSchema.methods.toJSON = function() {
    const { __v, _id, state, ...role } = this.toObject();
    role.uid = _id
    return role
}

module.exports = model('Role', RoleSchema)
