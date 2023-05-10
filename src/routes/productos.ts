import { check } from "express-validator";
import { Router } from "express";
import {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers";
import { existeProductoPorId } from "../helpers";
import { validarCampos, validarJWT } from "../middlewares";
import { esAdminRole } from "../middlewares/validar-roles";

const router = Router();

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
router.get("/", obtenerProductos);

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
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

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
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

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
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

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
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  eliminarProducto
);

export default router;
