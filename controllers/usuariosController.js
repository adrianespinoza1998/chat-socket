const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response)=>{

    //Buscar usuario por estado
    const usuarios = await Usuario.find({estado: true});

    res.status(200).json({
        usuarios
    });
}

const usuariosPost = async(req = request, res = response)=>{

    const {nombre, apellido, correo, password, rol} = req.body;

    //Crear usuario en mongo
    const usuario = new Usuario({nombre: nombre.toUpperCase(), apellido: apellido.toUpperCase(), 
        correo: correo.toUpperCase(), password, rol: rol.toUpperCase()});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar cambios del usuario
    await usuario.save();

    res.status(201).json({
        usuario
    });

}

module.exports = {
    usuariosGet,
    usuariosPost
}