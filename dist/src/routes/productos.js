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
* /api/productos:
*   get:
*     tags:
*       - Productos
*     description: Obtiene una lista de todos los productos registrados.
*     responses:
*       200:
*         description: Lista de productos
*       500:
*         description: Erro del servidor al buscar productos
*/
router.get("/", controllers_1.obtenerProductos);
/**
* @openapi
* /api/productos/:id:
*   get:
*     tags:
*       - Productos
*     summary: Obtiene un producto por su ID
*     description: Obtiene un producto por el ID proporcionador en el parametro
*     parameters:
*       -   name: Id del producto
*           in: path
*           description: Regresa el producto
*           required: true
*     responses:
*       200:
*         description: Objeto del producto
*       400:
*         description: Error en parametros incorrecto
*       500:
*         description: Error del servidor al buscar productos
*/
router.get("/:id", [
    (0, express_validator_1.check)("id", "No es un ID valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos,
], controllers_1.obtenerProducto);
/**
* @openapi
* /api/productos/:
*   post:
*     tags:
*       - Productos
*     summary: Crea un nuevo producto
*     description: Peticion para crear un nuevo producto solo puedo usarse si el usuario esta validado o logeado
*     requestBody:
*       description: Crear un objeto producto
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/producto'
*           application/xml:
*               schema:
*                   $ref: '#/components/schemas/producto'
*     responses:
*       200:
*         description: Objeto del nuevo productro creado
*       400:
*         description: Error parametros incorrecto
*       500:
*         description: Error del servidor al crear un nuevo producto
*/
router.post("/", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    middlewares_1.validarCampos,
], controllers_1.crearProducto);
/**
* @openapi
* /api/productos/:id:
*   put:
*     tags:
*       - Productos
*     summary: Actualiza un producto que busca mediante su ID
*     description: Peticion que actualiza un producto mediante ID, es necesario estar logeado o validado
*     parameters:
*       -   name: ID
*           in: path
*           description: id de producto que deasea actualizar
*           required: true
*           schema:
*               type: string
*     requestBody:
*       description: Actualiza un producto existente
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/producto'
*           application/xml:
*               schema:
*                   $ref: '#/components/schemas/producto'
*     responses:
*       200:
*         description: Producto actualizado
*       400:
*         description: Error parametros incorrecto
*       500:
*         description: Error del servidor al actualizar un producto
*/
router.put("/:id", [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)("id", "No es un ID valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos,
], controllers_1.actualizarProducto);
/**
* @openapi
* /api/productos/:id:
*   delete:
*     tags:
*       - Productos
*     summary: Eliminar un producto
*     description: Peticion que elimina un producto mediante ID, es necesario estar logeado o validado
*     parameters:
*       -   name: ID
*           in: path
*           description: id de producto que deasea eliminar
*           required: true
*           schema:
*               type: string
*     responses:
*       200:
*         description: Producto eliminado
*       400:
*         description: Error parametros incorrecto
*       500:
*         description: Error del servidor al eliminar un producto
*/
router.delete("/:id", [
    middlewares_1.validarJWT,
    validar_roles_1.esAdminRole,
    (0, express_validator_1.check)("id", "No es un ID valido").isMongoId(),
    (0, express_validator_1.check)("id").custom(helpers_1.existeProductoPorId),
    middlewares_1.validarCampos,
], controllers_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map