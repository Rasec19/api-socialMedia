"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.actualizarProducto = exports.crearProducto = exports.obtenerProducto = exports.obtenerProductos = void 0;
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        msg: 'GET - Controller'
    });
});
exports.obtenerProductos = obtenerProductos;
const obtenerProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        msg: 'GET - Controller',
        id: req.params.id
    });
});
exports.obtenerProducto = obtenerProducto;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).json({
        msg: 'POST - Controller',
        body: req.body
    });
});
exports.crearProducto = crearProducto;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).json({
        msg: 'PUT - Controller',
        id: req.params.id,
        body: req.body
    });
});
exports.actualizarProducto = actualizarProducto;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        msg: 'DELETE - Controller',
        id: req.params.id
    });
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.js.map