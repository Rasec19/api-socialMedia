"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.obtenerProductos);
router.get('/:id', controllers_1.obtenerProducto);
router.post('/', controllers_1.crearProducto);
router.put('/:id', controllers_1.actualizarProducto);
router.delete('/:id', controllers_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map