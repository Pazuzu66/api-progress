const { request, response } = require("express");
const jwt = require('jsonwebtoken')
const {User} = require("../models");


const validateJWT = async( req = request, res = response, next ) => {
    
    const { jtoken } = req.headers    
    if( !jtoken ) {
        res.status(401).json({
            msg: 'Se requiere de un token para la peticion'
        })
    }
    try {
        //---Sacamos el uid del jwt
        const { uid } = jwt.verify(jtoken, process.env.SECRETORPRIVATEKEY)

        const authUser = await User.findById( uid )

        if( !authUser ) {
            return res.status(401).json({
                msg: 'Token no Valido - token de usuario no existe'
            })
        }
        if( !authUser.state ) {
            return res.status(401).json({
                msg: 'Token no Valido - usuario con estado false'
            })
        }
        req.token = jtoken
        req.authUser = authUser         
               
        next()

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no Valido'
        })
    }
    
}

module.exports = {
    validateJWT
};

