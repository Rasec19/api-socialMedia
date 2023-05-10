import { check } from 'express-validator';
import { Router } from 'express';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuarios } from '../controllers'
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers';
import { validarCampos, validarJWT } from '../middlewares';
import { tieneRole } from '../middlewares/validar-roles';


const router = Router();

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
router.get('/', obtenerUsuarios);

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
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol').custom( esRolValido ),
    check('correo').custom( emailExiste ),
    validarCampos,
],crearUsuario);

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
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], actualizarUsuario);

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
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] , eliminarUsuarios);



export default router;