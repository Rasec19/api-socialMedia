"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.obtenerUsuarios);
router.get('/:id', controllers_1.obtenerUsuario);
router.post('/', controllers_1.crearUsuario);
router.put('/:id', controllers_1.actualizarUsuario);
router.delete('/:id', controllers_1.eliminarUsuarios);
exports.default = router;
//# sourceMappingURL=usuarios.js.map