import { check } from 'express-validator';
import { Router } from 'express';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuarios } from '../controllers'
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers';
import { validarCampos, validarJWT } from '../middlewares';
import { tieneRole } from '../middlewares/validar-roles';


const router = Router();

router.get('/', obtenerUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    check('correo').custom( emailExiste ),
    validarCampos,
],crearUsuario);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], actualizarUsuario);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] , eliminarUsuarios);



export default router;