const {Router} = require('express');
const { listarSala, buscarSalaXId, crearSala, editarSala, desactivarSala, buscarSalaXTipo } = require('../controllers/salaController');
const {check} = require('express-validator');
const { existeTipo, existeSala, existeId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarUsuario, validarAdmin } = require('../middlewares/validar-jwt');

//Inicializar router
const router = Router();

//Listar salas
router.get('/',[
    //Middlewares
    validarUsuario,
    validarCampos
], listarSala);

//Buscar sala x id
router.get('/:id',[
    //Middlewares
    validarUsuario,
    check('id','El id es obligatorio').isMongoId(),
    validarCampos
], buscarSalaXId);

//Buscar sala x tipo
router.get('/tipo/:id',[
    //Middlewares
    validarUsuario,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeTipo),
    validarCampos
], buscarSalaXTipo);

//Crear sala
router.post('/', [
    //Middlewares
    validarAdmin,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').isMongoId(),
    check('tipo').custom(existeTipo),
    check('usuario','El usuario es obligatorio').isMongoId(),
    check('usuario').custom(existeId),
    validarCampos
], crearSala);

//Editar sala
router.put('/:id',[
    //Middlewares
    validarAdmin,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeSala),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').isMongoId(),
    check('tipo').custom(existeTipo),
    check('usuario','El usuario es obligatorio').isMongoId(),
    check('usuario').custom(existeId),
    validarCampos
], editarSala);

//Desactivar sala
router.delete('/:id', [
    //Middlewares
    validarAdmin,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeSala),
    validarCampos
], desactivarSala);

module.exports = router;