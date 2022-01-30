const res = require("express/lib/response")

const error500 = () =>{
    res.status(500).json({
        msg: 'Hubo un error, contactese con el Administrador'
    })
}

module.exports = {
    error500
};
