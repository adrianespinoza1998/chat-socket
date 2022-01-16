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

const usuariosPut = async(req = request, res = response)=>{
    //Guardar ID del usuario
    const {id} = req.params;

    //Guardar datos del body
    const {nombre, apellido, correo, password, rol} = req.body;
    
    //Crear objeto con los datos del body
    const user = {
        nombre: nombre.toUpperCase(),
        apellido: apellido.toUpperCase(),
        correo: correo.toUpperCase(),
        password: password.toUpperCase(),
        rol: rol.toUpperCase()
    }

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Actualizar usuario
    const usuario = await Usuario.findByIdAndUpdate(id, user,{new: true});

    res.status(201).json({
        usuario
    });
}

const usuariosDelete = async(req = request, res = response)=>{
    //Guardar el id del usuario
    const {id} = req.params;

    await Usuario.findByIdAndUpdate(id, {estado: false});

    res.status(201).json({
        msg: `Usuario con el id ${id} borrado`
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}