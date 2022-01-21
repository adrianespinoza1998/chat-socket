const {Router} = require('express');
const {check} = require('express-validator');

const { mensajesGet, buscarMensajeXId, buscarMensajeXSala, buscarMensajePrivado, crearMensajePrivado, editarMensajePrivado, editarMensajeSala, desactivarMensajeXId, desactivarMensajesConversacion, desactivarMensajesSala, desactivarMensajesAllSala } = require('../controllers/mensajesController');
const { existeId, existeSala, existeMensaje } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

//Inicializar router
const router = Router();

//Listar todos los mensajes activos
router.get('/', mensajesGet);

//Buscar mensajes X Id
router.get('/:id', [
    //Middlewares
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId)
], buscarMensajeXId);

//Buscar mensaje X sala
router.get('/sala/:id', [
    //Middlewares
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId)
], buscarMensajeXSala);

//Buscar mensajes privados
router.get('/privados/:id', [
    //Middlewares
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId)
], buscarMensajePrivado);

//Crear mensaje privado
router.post('/', [
    //Middlewares
    check('msg','El mensaje es obligatorio').not().isEmpty(),
    check('emisor','El emisor es obligatorio').isMongoId(),
    check('emisor').custom(existeId),
    check('receptor','El receptor es obligatorio').not().isEmpty(),
    check('receptor').custom(existeId),
    validarCampos
], crearMensajePrivado);

//Crear mensaje sala
router.post('/sala', [
    //Middlewares
    check('msg','El mensaje es obligatorio').not().isEmpty(),
    check('sala', 'La sala es obligatoria').isMongoId(),
    check('sala').custom(existeSala),
    check('emisor','El emisor es obligatorio').isMongoId(),
    check('emisor').custom(existeId),
    validarCampos
], crearMensajePrivado);

//Editar mensaje privado
router.put('/:id', [
    //Middlewares
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(existeMensaje),
    check('msg','El mensaje es obligatorio').not().isEmpty(),
    check('emisor','El emisor es obligatorio').isMongoId(),
    check('emisor').custom(existeId),
    check('receptor','El receptor es obligatorio').isMongoId(),
    check('receptor').custom(existeId),
    validarCampos
],editarMensajePrivado);

//Editar mensaje sala
router.put('/sala/:id', [
    //Middlewares
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(existeMensaje),
    check('msg','El mensaje es obligatorio').not().isEmpty(),
    check('emisor','El emisor es obligatorio').isMongoId(),
    check('emisor').custom(existeId),
    validarCampos
], editarMensajeSala);

//Desactivar mensaje
router.delete('/:id', [
    //Middlewares
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(existeMensaje),
    validarCampos
], desactivarMensajeXId);

//Desactivar todos los mensajes de una conversación
router.delete('/privado/:id',[
    //Middlewares
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(existeId),
    check('receptor','El receptor es obligatorio').isMongoId(),
    check('receptor').custom(existeId),
    validarCampos
], desactivarMensajesConversacion);

//Desactivar los mensaje de un usuario en una sala
router.delete('/sala/:id', [
    //Middlewares
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(existeId),
    check('sala', 'La sala es obligatoria').isMongoId(),
    check('sala').custom(existeSala),
    validarCampos
], desactivarMensajesSala);

//Desactivar todos los mensajes de una sala
router.delete('/del-sala/:id',[
    //Middlewares
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(existeSala),
], desactivarMensajesAllSala);

module.exports = router;