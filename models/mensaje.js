const {Schema, model} = require('mongoose');

const mensajeSchema = Schema({
    msg: {
        type: String,
        required: [true, 'El mensaje es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        default: new Date()
    },
    privado: {
        type: Boolean,
        required: [true],
        default: true
    },
    sala: [
        {type: Schema.Types.ObjectId, ref: 'Sala'}
    ],
    estado: {
        type: Boolean,
        required: [true],
        default: true
    }
});

module.exports = model('Mensaje', mensajeSchema);