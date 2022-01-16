const {Schema, model} = require('mongoose');

const tipoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de tipo es obligatorio']
    },
    estado: {
        type: Boolean,
        required: [true],
        default: true
    }
});

module.exports = model('Tipo', tipoSchema);