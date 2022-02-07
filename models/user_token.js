const { Schema, model } = require("mongoose");

const User_TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true
    },
    username: {
        type: String,        
        unique:true,
        required: true
    },
    token: {
        type: String,   
        default: '',        
    }
})

User_TokenSchema.methods.toJSON = function() {
    const {__v, _id, ...user_token} = this.toObject()
    user_token.uid = _id
    return user_token
}

module.exports = model('User_Token',User_TokenSchema)
