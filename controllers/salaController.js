const { request, response } = require('express');
const Sala = require('../models/sala');

const listarSala = async(req = request, res = response)=>{

    //Buscar salas activas
    const salas = await Sala.find({estado: true});

    res.status(200).json(salas);
}

const buscarSalaXId = async(req = request, res = response) => {

    //Guardar id de salas activas
    const {id} = req.params;

    //Buscar sala x id
    const sala = await Sala.findById(id);

    res.status(200).json(sala);
}

const buscarSalaXTipo = async(req = request, res = response) => {
    //Guardar id del tipo
    const {id} = req.params;

    //Buscar salas x id del tipo
    const salas = await Sala.find({tipo: id});

    res.status(200).json(salas);
}

const crearSala = async(req = request, res = response)=>{

    //Guardar datos de la sala
    const {nombre, tipo, usuario} = req.body;

    //Crear sala
    const sala = new Sala({nombre: nombre.toUpperCase(), tipo, usuario});

    //Guardar sala
    await sala.save();

    res.status(200).json(sala);
}

const editarSala = async(req = request, res = response)=>{

    //Guardar id de la sala
    const {id} = req.params;

    //Guardar datos de la sala
    const {nombre, tipo, usuario} = req.body;

    //Buscar y actualizar sala
    const sala = await Sala.findByIdAndUpdate(id, {nombre: nombre.toUpperCase(), tipo, usuario}, {new: true});

    res.status(201).json(sala);
}

const desactivarSala = async(req = request, res = response)=>{

    //Guardar id de la sala
    const {id} = req.params;

    //Desactivar sala
    const sala = await Sala.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(201).json(sala);
}

module.exports = {
    listarSala,
    buscarSalaXId,
    crearSala,
    editarSala,
    desactivarSala,
    buscarSalaXTipo
}