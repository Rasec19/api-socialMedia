"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const validar_roles_1 = require("../middlewares/validar-roles");
const router = (0, express_1.Router)();
router.get('/', controllers_1.obtenerProductos);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos
], controllers_1.obtenerProducto);
router.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos,
], controllers_1.crearProducto);
router.put('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos
], controllers_1.actualizarProducto);
router.delete('/:id', [
    middlewares_1.validarJWT,
    validar_roles_1.esAdminRole,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos
], controllers_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map