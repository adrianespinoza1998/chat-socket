const { request, response } = require('express');
const Tipo = require('../models/tipo');

const listarTipos = async (req = request, res = response)=>{

    //Listar tipos
    const tipos = await Tipo.find({estado: true});

    res.status(200).json({
        tipos
    });
}

const buscarTipoXId = async (req = request, res = response)=>{

    //Guardar id del tipo del
    const {id} = req.params;

    //Buscar tipo
    const tipo = Tipo.find({estado: true});

    res.status(200).json({
        tipo
    });
}

const crearTipo = async (req = request, res = response)=>{

    //Guardar datos del tipo
    const {nombre} = req.body;

    //Crear tipo
    const tipo = new Tipo({nombre: nombre.toUpperCase()});

    //Guardar tipo
    await tipo.save();

    res.status(201).json({
        tipo
    });
}

const editarTipo = async (req = request, res = response)=>{

    //Guardar id del tipo
    const {id} = req.params;

    //Guardar datos del tipo
    const {nombre} = req.body;

    //Editar tipo
    const tipo = await Tipo.findByIdAndUpdate(id, {nombre: nombre.toUpperCase()}, {new: true});

    res.status(201).json({
        tipo
    });
}

const desactivarTipo = async (req = request, res = response) => {

    //Guardar id del tipo
    const {id} = req.params;

    //Desactivar tipo
    const tipo = await Tipo.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(200).json({
        tipo
    });
}

module.exports = {
    listarTipos,
    buscarTipoXId,
    crearTipo,
    editarTipo,
    desactivarTipo
}