const { request, response } = require("express");
const {Exercises_pros} = require("../models/");

const getExercises_Pro = async( req = request, res = response ) => {
    try {        
        const uid = req.authUser._id.toString()
        console.log(uid);
        const exerPro = await Exercises_pros.find( { user:uid } ) 
                        .populate('user',' -_id name ')
        console.log(exerPro);          
        return  res.status(200).json({
            exerPro
        })
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}

const createExer_Pro = async( req = request, res = response ) => {
    try {
        const { _id: user } = req.authUser
        const { date, exercise, weight, repetitions } = req.body
        const data = {
            user,
            date,
            exercise,
            weight,
            repetitions
        }
        console.log(data);
        const newExer_Pro = await Exercises_pros.create(data)
        return res.status(201).json({
         msg: 'Progreso Creado Exitosamente',
         newExer_Pro
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}

const updateExer_Pro = async( req = request, res = response ) => {
    try {
        const { id } = req.params
        const { user, ...data } = req.body

        const upExer_Pro = await Exercises_pros.findByIdAndUpdate( id, data, { new: true } )
                                .populate('user',' -_id name ')
        res.status(200).json({
            msg: 'Se actualizó el registro Correctamente',
            upExer_Pro
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })   
    }
}

const deleteExer_Pro = async( req = request, res = response ) => {
    try {
        const { id } = req.params
        const delExer_Pro = await Exercises_pros.findByIdAndDelete(id)
        const { exercise } = delExer_Pro
        res.status(200).json({
            msg:`Se eliminó el registro de ${exercise} correctamente`,
            delExer_Pro
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}

module.exports = {
    getExercises_Pro,
    createExer_Pro,
    updateExer_Pro,
    deleteExer_Pro
};
