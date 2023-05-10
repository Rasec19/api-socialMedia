import { Router } from 'express';
import { check } from 'express-validator';


const { validarCampos, validarJWT } = require('../middlewares');

import { login, renovarToken } from '../controllers'

const router = Router();

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
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get('/', validarJWT, renovarToken);


export default router;