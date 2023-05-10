import { check } from 'express-validator';
import { Router } from 'express';
import { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } from '../controllers'
import { existeProductoPorId } from '../helpers';
import { validarCampos, validarJWT } from '../middlewares';
import { esAdminRole } from '../middlewares/validar-roles';


const router = Router();

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene una lista de productos
 *     description: Obtiene una lista de todos los productos registrados.
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Erro del servidor
 */

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);


router.post('/', [ 
    validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos, 
    ], crearProducto);


router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], eliminarProducto);



export default router;