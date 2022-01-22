const {Router} = require('express');
const { listarSala, buscarSalaXId, crearSala, editarSala, desactivarSala, buscarSalaXTipo } = require('../controllers/salaController');
const {check} = require('express-validator');
const { existeTipo, existeSala } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

//Inicializar router
const router = Router();

//Listar salas
router.get('/', listarSala);

//Buscar sala x id
router.get('/:id',[
    //Middlewares
    check('id','El id es obligatorio').isMongoId(),
], buscarSalaXId);

//Buscar sala x tipo
router.get('/tipo/:id',[
    //Middlewares
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeTipo),
    validarCampos
], buscarSalaXTipo);

//Crear sala
router.post('/', [
    //Middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').isMongoId(),
    check('tipo').custom(existeTipo),
    validarCampos
], crearSala);

//Editar sala
router.put('/:id',[
    //Middlewares
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeSala),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').isMongoId(),
    check('tipo').custom(existeTipo),
    validarCampos
], editarSala);

//Desactivar sala
router.delete('/:id', [
    //Middlewares
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeSala),
    validarCampos
], desactivarSala);

module.exports = router;