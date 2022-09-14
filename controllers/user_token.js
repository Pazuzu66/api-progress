const { request, response } = require('express');
const { User_Token } = require('../models');
const jwt = require("jsonwebtoken");


const getUser_Token = async (username = '') => {
    try {
        const user_token = await User_Token.findOne({ username: username })
        if (!user_token) {
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
const createUser_Token = async (uid = '', username = '') => {
    try {
        const user_token = User_Token({ user: uid, username })
        await user_token.save()
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }

}

const updateUser_Token = async (uid = '', token = '') => {
    try {
        const data = {
            token: token
        }
        await User_Token.findOneAndUpdate({ user: uid }, data)
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}
const validToken = async (req = request, res = response) => {
    try {
        const header = req.headers;        
        const { jtoken } = req.headers;
        const valid = jwt.verify(jtoken, process.env.SECRETORPRIVATEKEY);
        const { uid } = valid;
        await updateUser_Token(uid, jtoken);
        return res.status(200).json({
            validation: valid,
            error: false
        });

    } catch (error) {
        res.status(200).json({
            msg: error,
            error: true
        })
    }
}

module.exports = {
    createUser_Token,
    getUser_Token,
    updateUser_Token,
    validToken
};
