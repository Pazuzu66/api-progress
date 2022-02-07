const { Schema, model } = require("mongoose");

const Meditions_Prog = new Schema({
    user:{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'El Usuario--> Id es Obligatorio']
    },
    date:{
        type: Date,
        default: Date.now(),
        required: [true,'La fecha es Obligatoria'],
    },
    weight: {
        type: Number,
        default: 0,
        required: [true, 'El Peso es Obligatorio']
    },
    bmi: {
        type:String,
        default: '',
        required: [true, 'El IMC es Obligatorio'],        
    },
    diagnosis: {
        type: String,
        default: '',
        required: [true,'El Diagnostico es Obligatorio']
    },
    fat_percentage: {
        type: Number,
        default: 0,
        required: [true, 'El Porcentaje de Grasa es Obligatorio']
    },
    fat_kg: {
        type: Number,
        default: 0,
        required: [true, 'Los Kg de Grasa son Obligatorio']
    },
    muscular_percentage: {
        type: Number,
        default: 0,
        required: [true, 'El Porcentaje de Masa Muscular es Obligatorio']
    },
    muscular_kg: {
        type: Number,
        default: 0,
        required: [true, 'Los Kg de Musculo son Obligatorio']
    },
    visceral_fat: {
        type: Number,
        default: 0,
        required: [true, 'El número de Grasa Visceral es Obligatorio']
    },
    metabolic_age: {
        type: Number,
        default: 0,
    },
    waist: {
        type: Number,
        default: 0,
    },
    hip: {
        type: Number,
        default: 0,
    },
    abdomen: {
        type: Number,
        default: 0,
    },
    basal_metabolic: {
        type: Number,
        default: 0,
        required: [true, 'Las calorias de metabolismo Basal son Obligatorias']
    },
    
})
Meditions_Prog.methods.toJSON = function(){
    const {_id, __v, ...meditions} = this.toObject()
    meditions.uid = _id
    return meditions
}

module.exports = model('Meditions_prog',Meditions_Prog)
