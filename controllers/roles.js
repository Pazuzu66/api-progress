const { request, response } = require("express");
const { Role } = require('../models')

const createRole = async( req = request, res = response ) => {
    let { role } = req.body
    role = role.toUpperCase()
    const newRole = Role( {role} )
    await newRole.save()

    res.status(201).json({
        msg: 'Rol Creado Exitosamente',
        newRole
    })
}

const getRoles = async( req = request, res = response ) => {    
    const state = { state: true }
    const roles = await Role.find(state)    
    res.status(200).json( roles )
}

const getRoleById = async( req = request, res = response ) => {
    const { id } = req.params
    const role = await Role.findById(id)

    res.status(200).json(role)
}

const updateRole = async( req = request, res = response ) => {
    const { id } = req.params
    let { role } = req.body
    role = role.toUpperCase()        
    const updateRole = await Role.findByIdAndUpdate(id,{role}, {new: true})    
    res.status(200).json({
        msg: `${ role } Modificado Correctamente`,
        updateRole
    })
}

const deleteRole = async( req = request, res = response ) => {
    const { id } = req.params

    const role = await Role.findByIdAndUpdate(id,{ state: false }, { new: true })
    res.status(200).json({
        msg: `${role.name} Eliminado Correctamente`,
        role
    })
}

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole
};

