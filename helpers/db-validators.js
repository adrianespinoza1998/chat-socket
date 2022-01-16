const Usuario = require('../models/usuario');
const Rol = require('../models/rol');

const validarRol = async(rol='')=>{
    //Buscar rol por nombre
    const existeRol = await Rol.findOne({rol});

    if(!existeRol){
        //Enviar un error personalizado
        throw new Error(`El rol ${rol} no existe en la BD`);
    }
}

const emailExiste = async(correo)=>{
    //Buscar correo por email
    const verificarCorreo = await Usuario.findOne({correo});

    if(verificarCorreo){
        throw new Error(`El correo ${correo} ya se encuentra registrado en la BD`);
    }
}

const existeId = async(id)=>{
    //Buscar usuario x id
    const verificarId = await Usuario.findById(id);

    if(!verificarId){
        throw new Error(`El id ${id} no esta registrado en la BD`);
    }
}


module.exports = {
    validarRol,
    emailExiste,
    existeId,
}