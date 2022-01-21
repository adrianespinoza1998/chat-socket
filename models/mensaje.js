const {Schema, model} = require('mongoose');
const { required } = require('nodemon/lib/config');

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
    },
    emisor: [
        {type: Schema.Types.ObjectId, ref: 'Usuario'},
    ],
    receptor: [
        {type: Schema.Types.ObjectId, ref: 'Usuario'},
    ],
    editado: {
        type: Boolean,
        required: [true],
        default: false
    }
});

module.exports = model('Mensaje', mensajeSchema);