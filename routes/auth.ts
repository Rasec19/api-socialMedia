import { Router } from 'express';
import { check } from 'express-validator';


const { validarCampos, validarJWT } = require('../middlewares');

import { login, renovarToken } from '../controllers'

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get('/', validarJWT, renovarToken);


module.exports = router;