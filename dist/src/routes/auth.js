"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const { validarCampos, validarJWT } = require('../middlewares');
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], controllers_1.login);
router.get('/', validarJWT, controllers_1.renovarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map