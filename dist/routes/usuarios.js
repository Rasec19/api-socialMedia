"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const validar_roles_1 = require("../middlewares/validar-roles");
const router = (0, express_1.Router)();
router.get('/', controllers_1.obtenerUsuarios);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('contraseña', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    (0, express_validator_1.check)('rol').custom(helpers_1.esRolValido),
    (0, express_validator_1.check)('correo').custom(helpers_1.emailExiste),
    middlewares_1.validarCampos,
], controllers_1.crearUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existeUsuarioPorId),
    (0, express_validator_1.check)('rol').custom(helpers_1.esRolValido),
    middlewares_1.validarCampos
], controllers_1.actualizarUsuario);
router.delete('/:id', [
    middlewares_1.validarJWT,
    // esAdminRole,
    (0, validar_roles_1.tieneRole)('ADMIN_ROLE', 'VENTAS_ROLE'),
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existeUsuarioPorId),
    middlewares_1.validarCampos
], controllers_1.eliminarUsuarios);
exports.default = router;
//# sourceMappingURL=usuarios.js.map