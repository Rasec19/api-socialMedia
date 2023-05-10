"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const { validarCampos, validarJWT } = require('../middlewares');
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
/**
* @openapi
* /api/auth/login:
*   post:
*     tags:
*       - Authenticación
*     summary: Autenticación de usuario
*     description: Petición para autenticación del usuario y creación de token
*     requestBody:
*       description: Atenticar usuario
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/auth'
*           application/xml:
*               schema:
*                   $ref: '#/components/schemas/auth'
*     responses:
*       200:
*         description: Atenticacion exitosa
*       400:
*         description: Error parametros incorrecto
*       500:
*         description: Error del servidor al autenticar
*/
router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], controllers_1.login);
/**
* @openapi
* /api/auth:
*   get:
*     tags:
*       - Authenticación
*     description: Renuva el token del usuario
*     responses:
*       200:
*         description: Un nuevo token
*       400:
*         description: Erro del token invalido
*       500:
*         description: Error del servidor al renovar token
*/
router.get('/', validarJWT, controllers_1.renovarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map