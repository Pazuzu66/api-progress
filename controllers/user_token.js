const { request } = require('express');
const { response } = require('express');
const { User_Token } = require('../models');


const getUser_Token = async( username = '' ) => {
    try {
        const user_token = await User_Token.findOne({ username: username })        
        if(!user_token){            
            return response.status(400).json({
                msg: 'No existe el usuario'
            });
        }
        const { token } = user_token
        return token
    } catch (error) {
        response.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
    
}
const createUser_Token = async(uid = '', username = '' ) => {
    try {                
        const user_token =  User_Token({user: uid, username})
        await user_token.save()        
    } catch (error) {
        console.log(error);
        // res.status(500).json({
        //     msg: 'Hubo un error, probablemente del Servidor'
        // })
    }
    
}

const updateUser_Token =  async( uid = '', token = '') => {
    try {
        const data = {
            token: token
        }
        const user_token = await User_Token.findOneAndUpdate({user: uid},data)        
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}


module.exports = {
    createUser_Token,
    getUser_Token,
    updateUser_Token
};
