const {Router} = require('express');
const { check } = require('express-validator');
const {buscarRolXId, listarRoles, crearRol, editarRol, desactivarRol} = require('../controllers/rolController');
const { validarRolExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Listar roles
router.get('/', listarRoles);

//Buscar rol x Id
router.get('/:id', [
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(validarRolExiste),
    validarCampos
], buscarRolXId);

//Crear rol
router.post('/', [
    check('rol','El rol es obligatorio').not().isEmpty()
], crearRol);

//Editar rol
router.put('/:id', [
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(validarRolExiste),    
    check('rol','El rol es obligatorio').not().isEmpty(),
    validarCampos
], editarRol);

//Desactivar rol
router.delete('/:id', [
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(validarRolExiste), 
    validarCampos
], desactivarRol);

module.exports = router;