const {Router} = require('express');
const {check} = require('express-validator');
const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete} = require('../controllers/usuariosController');
const { emailExiste, validarRol, existeId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarUsuario, validarAdmin } = require('../middlewares/validar-jwt');

//Inicializar router
const router = Router();

//Listar usuarios
router.get('/',[
    validarUsuario,
    validarCampos
], usuariosGet);

//Crear usuario
router.post('/', [
    //Middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña debe poseer mínimo 6 caracteres').isLength({min: 6}),
    check('correo').custom(emailExiste),
    check('rol').custom(validarRol),
    validarCampos
], usuariosPost);

//Actualizar usuario
router.put('/:id', [
    //Middlewares
    validarUsuario,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña debe poseer mínimo 6 caracteres').isLength({min: 6}),
    check('rol').custom(validarRol),
    validarCampos
], usuariosPut);

//Desactivar usuario
router.delete('/:id', [
    //Middlewares
    validarAdmin,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeId),
], usuariosDelete);

module.exports = router;