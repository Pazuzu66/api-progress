const { request, response } = require("express");
const { Role } = require("../models");

const haveRole = ( ...roles) => {
    return async(req = request, res = response, next) => {
        const { authUser } = req

        if( !authUser ) {
           return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }
    
        const { role, username } = authUser
        const user = await Role.findById(role)

        const userRole = user.role
        
        if( !roles.includes(userRole) ) {
            return res.status(401).json({
                msg:`Esta acción requiere de uno de estos roles ${roles}`
            })
        }
        next()
    }   
}

module.exports = {
    haveRole
};
