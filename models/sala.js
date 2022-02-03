const {Schema, model} = require('mongoose');

const salaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sala es obligatorio']
    },
    tipo: [
        {type: Schema.Types.ObjectId, ref: 'Tipo'}
    ],
    usuario: [
        {type: Schema.Types.ObjectId, ref: 'Usuario'}
    ],
    estado: {
        type: Boolean,
        required: [true],
        default: true
    }
});

module.exports = model('Sala', salaSchema);