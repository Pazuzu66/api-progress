const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { error500 } = require("../server/error");
const { User } = require("../models");

const createUser = async( req = request, res = response ) => {    
    try {
        const { name, surname, age, gender, phone = '', username, role } = req.body    
        let { password } = req.body

        //---Encriptamos la password
        const salt = bcryptjs.genSaltSync()             
        password = bcryptjs.hashSync(password, salt)          
        const newUser = User({ name, surname, age, gender, phone, username, password, role })        
        await newUser.save()
        res.status(201).json({
            msg: 'Usuario Creado',
            newUser
        })
    } catch (error) {
        //error500()
        console.log(error);
    }

}

module.exports = {
    createUser
};
