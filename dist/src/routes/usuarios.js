"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const validar_roles_1 = require("../middlewares/validar-roles");
const router = (0, express_1.Router)();
/**
* @openapi
* /api/usuarios:
*   get:
*     tags:
*       - Usuario
*     summary: Obtiene un listado de todos los usuarios
*     description: Obtiene una lista de todos los usuarios registrados.
*     responses:
*       200:
*         description: Lista de productos
*       500:
*         description: Erro del servidor al buscar productos
*/
router.get('/', controllers_1.obtenerUsuarios);
/**
* @openapi
* /api/usuarios:
*   post:
*     tags:
*       - Usuario
*     summary: Crea un nuevo usuario
*     description: Peticion para crear un nuevo usuario solo puedo usarse si el usuario esta validado o logeado
*     requestBody:
*       description: Crear un objeto usuario
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/usuario'
*           application/xml:
*               schema:
*                   $ref: '#/components/schemas/usuario'
*     responses:
*       200:
*         description: Objeto del nuevo usuario creado
*       400:
*         description: Error parametros incorrecto
*       500:
*         description: Error del servidor al crear un nuevo producto
*/
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('contraseña', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('rol').custom(helpers_1.esRolValido),
    (0, express_validator_1.check)('correo').custom(helpers_1.emailExiste),
    middlewares_1.validarCampos,
], controllers_1.crearUsuario);
/**
* @openapi
* /api/usuarios/{id}:
*   put:
*     tags:
*       - Usuario
*     summary: Actualiza un usuario que busca mediante su ID
*     description: Peticion que actualiza un usuario mediante ID, es necesario estar logeado o validado
*     parameters:
*       -   in: path
*           name: id
*           description: id de usuario que deasea actualizar
*           required: true
*           schema:
*               type: string
*     requestBody:
*       description: Actualiza un usuario existente
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/usuario'
*           application/xml:
*               schema:
*                   $ref: '#/components/schemas/usuario'
*     responses:
*       200:
*         description: Usuario actualizado
*       400:
*         description: Error parametros incorrecto
*       500:
*         description: Error del servidor al actualizar un usuario
*/
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existeUsuarioPorId),
    (0, express_validator_1.check)('rol').custom(helpers_1.esRolValido),
    middlewares_1.validarCampos
], controllers_1.actualizarUsuario);
/**
* @openapi
* /api/usuarios/{id}:
*   delete:
*     tags:
*       - Usuario
*     summary: Eliminar un usuario
*     description: Peticion que elimina un usuario mediante ID, es necesario estar logeado o validado
*     parameters:
*       -   in: path
*           name: id
*           description: id de usuario que deasea eliminar
*           required: true
*           schema:
*               type: string
*     responses:
*       200:
*         description: Usuario eliminado
*       400:
*         description: Error parametros incorrecto
*       500:
*         description: Error del servidor al eliminar un usuario
*/
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, validar_roles_1.tieneRole)('ADMIN'),
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.existeUsuarioPorId),
    middlewares_1.validarCampos
], controllers_1.eliminarUsuarios);
exports.default = router;
//# sourceMappingURL=usuarios.js.map