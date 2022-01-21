const Usuario = require('../models/usuario');
const Rol = require('../models/rol');
const Sala = require('../models/sala');
const Mensaje = require('../models/mensaje');
const Tipo = require('../models/tipo');

const validarRol = async(rol='')=>{
    //Buscar rol por nombre
    const existeRol = await Rol.findOne({rol: rol.toUpperCase()});

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

const existeSala = async(id)=>{
    //Buscar sala x id
    const sala = await Sala.findById(id);

    if(!sala){
        throw new Error(`La sala con el id ${id} no existe`);
    }
}

const existeMensaje = async(id)=>{
    //Buscar mensaje x id
    const mensaje = await Mensaje.findById(id);

    if(!mensaje){
        throw new Error(`El mensaje con el id ${mensaje} no existe`);
    }    
}

const existeTipo = async(id)=>{
    //Buscar tipo x id
    const tipo = await Tipo.findById(id);

    if(!tipo){
        throw new Error(`El tipo con el id ${id} no existe`);
    }
}

/*const existeMensaje = async(id)=>{
    //Buscar mensaje x id
    const mensaje = await Mensaje.findById(id);

    if(!mensaje){
        throw new Error(`El mensaje con el id ${mensaje} no existe`);
    }    
}*/

const validarNombreTipo = async(nombre)=>{

    //Buscar nombre tipo que
    const tipo = await Tipo.findOne({nombre: nombre.toUpperCase()});

    if(tipo){
        throw new Error(`El tipo con el nombre ${nombre} ya existe`);
    }
}

const validarRolExiste = async(rol)=>{
    //Buscar rol por nombre
    const existeRol = await Rol.findOne({rol: rol.toUpperCase()});

    if(existeRol){
        //Enviar un error personalizado
        throw new Error(`El rol ${rol} ya existe en la BD`);
    }
}

module.exports = {
    validarRol,
    emailExiste,
    existeId,
    existeSala,
    existeMensaje,
    existeTipo,
    validarNombreTipo,
    validarRolExiste
}