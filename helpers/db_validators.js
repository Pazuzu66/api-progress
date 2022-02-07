const bcryptjs = require('bcryptjs')
const { request, response } = require('express')
const {User, Role} = require('../models')
const {getUser_Token} = require('../controllers/user_token')


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
       return false
    }
    return true
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
const loginUsername = async(req = request, res = response, next) => {
    const { username, password } = req.body
    const exist = await User.findOne({username})
    if( !loginValidator(exist)) {
        return res.status(400).json({
            msg: 'Usuario o Contraseña Incorrectos'
        })
    }
    //Existe el usuario, entonces vemos si coinciden las contraceñas
    
    const passSended = password                 //--> password enviada por el usuario
    const passSaved = exist.password            //--> password almacenada en la BD
    
    const validPassword = bcryptjs.compareSync(passSended, passSaved)          
    if(!loginValidator(validPassword)){
        return res.status(400).json({
            msg: 'Usuario o Contraseña Incorrectos'
        })
    }
    activeUser(exist._id)    

    //---Agregamos el id en la request para hacer el token en el controlador
    req.uid = exist._id
    next()
}
const activeUser = async( _id = '' ) => {
    const user = await User.findById(_id)
    const {name, state} = user
    isActive(name,state)
}

const existJWTDB = async(req = request, res = response, next) => {
    const tokenSended = req.token
    const username = req.authUser.username    
    const tokenSaved = await getUser_Token(username)
    if(tokenSaved !== tokenSended) {
        return res.status(400).json({
            msg: 'Este token no le pertenece al usuario o está desactualizado'
        })
    }
    next()
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
    //USER_TOKEN
    existJWTDB
};
