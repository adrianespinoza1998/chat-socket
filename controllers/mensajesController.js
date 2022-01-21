const { request, response } = require('express');
const express = require('express');

const Mensaje = require('../models/mensaje');

const mensajesGet = async(req = request, res = response)=>{
    //Buscar mensajes activos
    const mensajes = await Mensaje.find({estado: true});

    res.status(200).json({
        mensajes
    });
}

const buscarMensajeXId = async(req = request, res = response)=>{
    //Guardar id del mensaje
    const {id} = req.params;

    const mensaje = Mensaje.findById(id, {estado: true});
    
    res.status(200).json({
        mensaje
    });
}

const buscarMensajeXSala = async(req = request, res = response)=>{
    //Guardar id de la sala
    const {id} = req.params;

    //Buscar mensaje x sala y estado activo
    const mensajes = Mensaje.findOne({sala: id, estado: true});

    res.status(200).json({
        mensajes
    });
}

const buscarMensajePrivado = async (req = request, res = response)=>{
    //Guardar Id del Usuario
    const {id} = req.params;

    //Buscar mensaje x emisor y estado activo
    const mensajes = Mensaje.findOne({emisor: id, estado: true});

    res.status(200).json({
        mensajes
    });
}

const crearMensajePrivado = async(req = request, res = response)=>{
    //Guardar datos del mensaje
    const {msg, emisor, receptor} = req.body;

    //Crear Mensaje
    const mensaje = await new Mensaje({msg, emisor, receptor});

    //Guardar mensaje en mongo
    await mensaje.save();

    res.status(201).json({
        mensaje
    });
}

const crearMensajeSala = async(req = request, res = response)=>{
    //Guardar datos del mensaje
    const {msg, sala, emisor} = req.body;
    
    //Crear Mensaje
    const mensaje = await new Mensaje({msg, sala, emisor, privado: false});

    //Guardar mensaje en mongo
    await mensaje.save();

    res.status(201).json({
        mensaje
    });
}

const editarMensajePrivado = async(req = request, res = response)=>{
    //Guardar id del mensaje
    const {id} = req.params;

    //Guardar datos del mensaje privado
    const {msg, emisor, receptor} = req.body;

    //Actualizar el mensaje
    const mensaje = await Mensaje.findByIdAndUpdate(id, {msg, emisor, receptor, editado: true}, {new: true});

    res.status(201).json({
        mensaje
    });
}

const editarMensajeSala = async(req = request, res = response)=>{
    //Guardar id de la sala
    const {id} = req.params;

    //Guardar el mensaje
    const {msg, emisor} = req.body;

    //Actualizar el mensaje
    const mensaje = await Mensaje.findByIdAndUpdate(id, {msg, emisor, editado: true}, {new: true});

    res.status(201).json({
        mensaje
    });
}

const desactivarMensajeXId = async(req = request, res = response)=>{
    //Guardar id del mensaje
    const {id} = req.params;

    //Descativar el mensaje
    const mensaje = await Mensaje.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(201).json({
        mensaje
    });
}

const desactivarMensajesConversacion = async(req = request, res = response)=>{
    //Guardar id del emisor
    const {id} = req.params;

    //Guardar id del receptor
    const {receptor} = req.body;

    //Desactivar mensajes
    const mensajes = await Mensaje.findOneAndUpdate({emisor: id, receptor}, {estado: false}, {new: true});

    res.status(201).json({
        mensajes
    });
}

const desactivarMensajesSala = async(req = request, res = response)=>{
    //Guardar id del emisor
    const {id} = req.params;

    //Guardar sala
    const {sala} = req.body;

    //Desactivar mensajes
    const mensajes = await Mensaje.findOneAndUpdate({emisor: id, sala}, {estado: false}, {new: true});

    res.status(201).json({
        mensajes
    });
}

const desactivarMensajesAllSala = async(req = request, res = response)=>{

    //Guardar id del emisor
    const {id} = req.params;

    //Desactivar todos los mensajes de la sala
    const mensajes = await Mensaje.findOneAndUpdate({sala: id}, {estado: false}, {new: true});

    res.status(201).json({
        mensajes
    });
}

module.exports = {
    mensajesGet,
    buscarMensajeXId,
    buscarMensajeXSala,
    buscarMensajePrivado,
    crearMensajePrivado,
    crearMensajeSala,
    editarMensajePrivado,
    editarMensajeSala,
    desactivarMensajeXId,
    desactivarMensajesConversacion,
    desactivarMensajesSala,
    desactivarMensajesAllSala
}