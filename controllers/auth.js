const { request,response } = require("express");
const { generateJWT } = require("../helpers/generateJWT");
const { updateUser_Token } = require("./user_token");


const login = async( req = request, res = response ) => {
    try {           
        const uid =  req.uid
        //---Generar el JWT
        const token = await generateJWT(uid)
        //Actualizamos la tabla de user_token
        await updateUser_Token(uid,token)
        res.status(200).json({          
            msg:'Login Ok',
            token,            
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error, probablemente del Servidor'
        })
    }
}
module.exports = {
    login
};
