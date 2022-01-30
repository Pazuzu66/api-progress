const { request,response } = require("express");
const { generateJWT } = require("../helpers/generateJWT");
const { error500 } = require("../server/error");

const login = async( req = request, res = response ) => {
    try {        
        const uid =  req.uid
        //---Generar el JWT
        const token = await generateJWT(uid)
        res.status(200).json({          
            msg:'Login Ok',
            token,            
        })
    } catch (error) {
        error500()
    }
}


module.exports = {
    login
};
