const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const Usuario = require('../models/usuario');

const validarUsuario = async (req = request, res = response, next) =>{
    
    //Guardar token de la peticion
    const token = req.header('x-token');

    //Validar que el token se ecnuentre en el header
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        //Extraer el id del usuario
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        //Buscar usuario x id
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(201).json({
                msg: 'Token no valido'
            });
        }

        if(!usuario.estado){
            return res.status(201).json({
                msg: 'Token no valido'
            });
        }
        
        req.usuario = usuario;

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

const validarAdmin = async(req = request, res = response, next) => {
    
    //Guardar token de la peticion
    const token = req.header('x-token');

    //Validar que el token se ecnuentre en el header
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        //Extraer el id del usuario
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);
        //Buscar usuario x id
        const usuario = await Usuario.findById(uid);
    
        if(!usuario) {
            return res.status(201).json({
                msg: 'Token no valido'
            });
        }
    
        if(!usuario.estado){
            return res.status(201).json({
                msg: 'Token no valido'
            });
        }

        if(usuario.rol != 'ADMIN'){
            return res.status(201).json({
                msg: 'Token no valido'
            });
        }
            
        req.usuario = usuario;
    
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarUsuario,
    validarAdmin
}