const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { User } = require("../models");
const { createUser_Token } = require("./user_token");

const createUser = async( req = request, res = response ) => {    
    try {
        const { name, surname, age, gender, phone = '', username, role } = req.body    
        let { password } = req.body

        
        //---Encriptamos la password
        const salt = bcryptjs.genSaltSync()             
        password = bcryptjs.hashSync(password, salt)          
        const newUser = User({ name, surname, age, gender, phone, username, password, role })        
        await newUser.save()      
        const uid = newUser._id.toString()        
        await createUser_Token(uid,username)
        res.status(201).json({
            msg: 'Usuario Creado',
            newUser
        })
    } catch (error) {        
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
        
    }

}

const getUsers = async( req = request, res = response ) => {
    try {
        const users = await User.find({state: true})
                .populate('role','role')
        if( !users) {
            return res.status(200).json({
                msg: 'No Existen Usuarios aun'
            })
        }
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
    
}

const updateUser = async( req = request, res = response) => {
    try {
        const { id } = req.params
        let {password} = req.body
        const { gender, username,  ...user }   = req.body        
        const genders = ['Mujer','mujer','Femenino','femenino','Hombre','hombre','Masculino','masculino']
        if( password ) {
            const salt = bcryptjs.genSaltSync()
            password = bcryptjs.hashSync(password, salt)
            user.password = password
        }
        if( username ) {
            const existUsername = await User.find({username: username})
            console.log(username);
            console.log(existUsername);
            if( existUsername.length !=0  ) {
                return res.status(400).json({
                    msg: `El usuario ${username} ya está en uso, intente otro`
                })
            }
            user.username = username
        }
        if(gender) {
            if( !genders.includes( gender )) {
                return res.status(400).json({
                    msg: `El genero ${gender} no es Válido`
                })
            }
            user.gender = gender
        }     
        
        
        const newUser = await User.findByIdAndUpdate( id, user, { new: true } )        
        return res.status(200).json({
            msg:'Usuario Actualizado',
            newUser
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        }) 
    }
}

const deleteUser = async( req = request, res = response ) => {
    try {
        const { id } = req.params
        const userDeleted = await User.findByIdAndUpdate(id, { state: false })            
        return res.status(200).json({
            msg:'Usuario Eliminado',
            userDeleted
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
    
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};
