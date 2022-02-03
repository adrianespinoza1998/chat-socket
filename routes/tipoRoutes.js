const {Router} = require('express');
const {check} = require('express-validator');

const {listarTipos, buscarTipoXId, crearTipo, editarTipo,desactivarTipo} =require('../controllers/tipoController');
const { existeTipo, validarNombreTipo } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarUsuario, validarAdmin } = require('../middlewares/validar-jwt');

//Inicializar router
const router = Router();

//Listar tipos
router.get('/',[
    validarUsuario,
    validarCampos
], listarTipos);

//Buscar tipo x id
router.get('/:id', [
    //Middlewares
    validarUsuario,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeTipo),
    validarCampos
], buscarTipoXId);

//Crear tipo
router.post('/', [
    //Middlewares
    validarAdmin,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(validarNombreTipo),
    validarCampos
], crearTipo);

//Editar tipo
router.put('/:id', [
    //Middlewares
    validarAdmin,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeTipo),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(validarNombreTipo),
    validarCampos
], editarTipo);

//Desactivar tipo
router.delete('/:id', [
    //Middlewares
    validarAdmin,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeTipo),
    validarCampos
], desactivarTipo);

module.exports = router;