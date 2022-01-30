const { request, response } = require("express")

const isValidAge = ( req = request ,res =  response, next) => {
    const {age} = req.body    
    if( isNaN(age) ) {        
        res.status(400).json({
            msg:'La edad debe ser de tipo númerico'
        })       
    }
    if( age<5 ) {
        res.status(400).json({
            msg:` La edad de ${age} no es Válida`
        })       
    } 
    if( age>80 ) {
        res.status(400).json({
            msg:` La edad de ${age} no es Válida`
        })       
    }       
    next()     
}

const isValidGender = (req = request ,res =  response, next) => {
    const genders = ['Mujer','mujer','Femenino','femenino','Hombre','hombre','Masculino','masculino']
    const { gender } = req.body
    if( !genders.includes(gender) ) {
        return res.status(400).json({
            msg: `${gender} No es un Genero Válido`
        })
    }
    next()
}

module.exports = {
    isValidAge,
    isValidGender
};
