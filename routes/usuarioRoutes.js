const {Router} = require('express');
const {check} = require('express-validator');
const {usuariosGet} = require('../controllers/usuariosController');

//Inicializar router
const router = Router();

//Crear endpoint de metodo get
router.get('/', usuariosGet);

module.exports = router;