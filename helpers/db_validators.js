const bcryptjs = require('bcryptjs')
const { request } = require('express')
const {User, Role} = require('../models')


const existValidator = ( search, exist ) => {
    if( exist ) {
        throw new Error(`${search} ya existe`)
    }
}
const notExistValidator = ( search, exist ) => {
    if( !exist ) {
        throw new Error(`${search} no existe`)
    }
}
const isActive = ( search, active ) => {
    if( !active ) {
        throw new Error(`${search} no está Inactivo. Consulte al Administrador`)
    }
}
const loginValidator = ( valid ) => {
    if( !valid ) {
        throw new Error(`Usuario o Contraseña Incorrectos`)
    }
}
///------> ROLES Validators <-----///
const existRoleByName = async( role = '' ) => {    
    role = role.toUpperCase();    
    const exist = await Role.findOne({role})        
    existValidator(role,exist)
}
const existRoleById = async( id = '' ) => {
    const exist = await Role.findById(id)
    notExistValidator(id,exist)
}
const notExistRole = async( id = '') => {
    const exist = await Role.findById(id)
    notExistValidator(id,exist)
}

///------> USER Validators <-----///
const existUsername = async( username = '' ) => {
    const exist = await User.findOne({username})
    existValidator(username,exist)
}
const loginUsername = async(username = '', req = request, next) => {
    const exist = await User.findOne({username})
    loginValidator(exist)
    //Existe el usuario, entonces vemos si coinciden las contraceñas
    const passSended = req.body.password    //--> password enviada por el usuario
    const { password } = exist              //--> password almacenada en la BD

    const validPassword = bcryptjs.compareSync(passSended, password)
    loginValidator(validPassword)

    //---Agregamos el id en la request para hacer el token en el controlador
    req.uid = exist._id
    //next()
}
const activeUser = async( username = '' ) => {
    const {name, state} = User.findOne({username})
    isActive(name,state)
}

module.exports = {
    //ROLE
    existRoleByName,
    existRoleById,
    notExistRole,
    //USER
    activeUser,
    existUsername,
    loginUsername,
};
