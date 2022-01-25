const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/generarJWT');

const Usuario = require('../models/usuario');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response)=>{
    //Guardar datos de login
    const {correo, password} = req.body;

    //Buscar usuario x correo
    const usuario = await Usuario.findOne({correo:correo.toUpperCase()});

    //Usuario no existe
    if(!usuario) {
        return res.status(400).json({
            msg: 'Usuario y/o contraseña incorrectos'
        });
    }

    //Usuario bloqueado
    if(!usuario.estado){
        return res.status(400).json({
            msg: 'Usuario y/o contraseña incorrectos, estado false'
        });
    }

    //Comparar password con su hash
    const validarPassword = bcryptjs.compareSync(password, usuario.password);

    //Contraseña incorrecta
    if(!validarPassword){
        return res.status(400).json({
            msg: 'Usuario y/o contraseña incorrectos, validar password'
        });
    }

    //Generar token de autentificación
    const token = await generarJWT(usuario.id);

    res.status(200).json({
        usuario,
        token
    });
}

const googleLogin = async(req = request, res = response) => {
    try{
        //Guardar token de autentificación
        const {id_token} = req.body;

        const {correo, img, nombre} = await googleVerify(id_token);

        const arrayNombre = nombre.split(' ');

        //Buscar usuario
        let usuario = await Usuario.findOne({correo});

        //Crear usuario en caso de no existir en BD
        if(!usuario) {
            console.log(typeof process.env.USER_ROL);

            const data = {
                nombre: arrayNombre[0].toUpperCase(),
                apellido: arrayNombre[1].toUpperCase(),
                correo,
                password: 'google',
                //rol: process.env.USER_ROL,
                rol: 'USER',
                google: true,
                img
            }

            usuario = new Usuario(data);

            await usuario.save();
        }

        //Usuario bloqueado
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario esta bloqueado, hable con el administrador'
            });
        }

        //Generar token de autentificación
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no valido'
        });
    }
}

module.exports = {
    login,
    googleLogin
}