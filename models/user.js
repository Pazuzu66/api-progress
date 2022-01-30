const { Schema, model } = require("mongoose");

// Declare the Schema of the Mongo model
var UserSchema = new Schema({
    name:{
        type:String,
        required:[true, 'El Nombre es Obligatorio'],
    },
    surname:{
        type:String,
        required:[true, 'Los Apellidos son Obligatorios'],
    },
    age:{
        type:Number,
        required:[true, 'La Edad es Obligatoria'],
    },
    gender:{
        type:String,
        required:[true, 'El Genero es Obligatorio'],
    },    
    phone:{
        type:String,                
    },
    username:{
        type:String,
        required:[true,'El Usuario es Obligatorio'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'La Contraseña es Obligatoria'],
    },
    state:{
        type: Boolean,
        default:true
    },
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default: '61f5e9a2b1dcb81229f73c8c'
        
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, _id, state, ...user } = this.toObject()
    user.uid = _id
    return user
}

//Export the model
module.exports = model('User', UserSchema);