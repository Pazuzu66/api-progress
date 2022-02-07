const { Schema, model } = require("mongoose");

const Exercises_Prog = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        default: Date.now(),
        required: [true,'La fecha es Obligatoria'],
        
    },
    exercise: {
        type: String,
        default: '',
        required: [true, 'El Nombre del ejercicio es Obligatorio']
    },
    weight: {
        type: Number,
        default: 0,
        required: [true, 'El peso es Obligatorio']
    },
    repetitions: {
        type: Number,
        default: 0,
        required: [true, 'El número de repeticiones es Obligatorio'],
    },        
})
Exercises_Prog.methods.toJSON = function() {
    const {_id, __v, ...exercises_prog } = this.toObject();
    exercises_prog.uid = _id
    return exercises_prog
}

module.exports = model('Exercises_Prog',Exercises_Prog)
