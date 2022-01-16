const { request, response } = require("express");

const usuariosGet = (req = request, res = response)=>{
    res.json({
        msg : 'get usuarios'
    });
}

module.exports = {
    usuariosGet
}