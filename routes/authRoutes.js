const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleLogin } = require('../controllers/authController');

//Inicializar router
const router = Router();

//Login con credenciales
router.post('/',[
    //Middlewares
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty()
], login);

//Login con google
router.post('/google',[
    //Middlewares
    check('id_token','El id_token es obligatorio').not().isEmpty()
],googleLogin);

module.exports = router;