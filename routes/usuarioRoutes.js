const {Router} = require('express');
const {check} = require('express-validator');
const {usuariosGet, usuariosPost} = require('../controllers/usuariosController');
const { emailExiste, validarRol } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

//Inicializar router
const router = Router();

//Crear endpoint de metodo get
router.get('/', usuariosGet);

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

module.exports = router;