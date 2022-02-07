const { request, response } = require("express");

const { Meditions_Prog } = require('../models');

const getMeditions_Pro = async( req = request, res = response ) =>{
    try {
        const { _id: uid } = req.authUser
        const meditions = await Meditions_Prog.find( { _id: uid } )
        res.status(200).json({
            meditions
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }   
}

const getMeditions_Date = async( req = request, res = response ) => {
    try {
        const { date } = req.params
        const meditions = await Meditions_Prog.findOne({date: date})
        res.status(200).json({
            meditions
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}

const createMedition_Pro = async(req = request, res = response) => {
    try {
        const { _id: uid } = req.authUser
        const { date, weight, bmi, 
            diagnosis, fat_percentage,fat_kg,
            muscular_percentage, muscular_kg, visceral_fat,
            metabolic_age, waist, hip, abdomen, 
            basal_metabolic} = req.body

        const newMeditions = Meditions_Prog({ user:uid,
            date, weight, bmi,diagnosis, fat_percentage,fat_kg,
            muscular_percentage, muscular_kg, visceral_fat,
            metabolic_age, waist, hip, abdomen, 
            basal_metabolic})
        await newMeditions.save()
        res.status(201).json({
            newMeditions
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}

const updateMedition_Pro = async(req = request, res = response) => {
    try {
        const { id } = req.params
        const { user, ...medition} = req.body
        const upMeditions = await Meditions_Prog.findByIdAndUpdate( id, medition, { new:true } )
        res.status(200).json({
            msg:'Medicion Actualizada',
            upMeditions
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}
const deleteMedition_Pro = async(req = request, res = response) => {
    try {
        const { id } = req.params
        const delMedition = await Meditions_Prog.findByIdAndDelete(id)
        res.status(200).json({
            msg: 'Medicion Eliminada',
            delMedition
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}
module.exports = {
    getMeditions_Date,
    getMeditions_Pro,
    createMedition_Pro,
    deleteMedition_Pro,
    updateMedition_Pro
};
