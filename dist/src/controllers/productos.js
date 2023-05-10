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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.actualizarProducto = exports.crearProducto = exports.obtenerProducto = exports.obtenerProductos = void 0;
const producto_1 = require("../model/producto");
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 5, desde = 0 } = req.query;
        const query = { estado: true };
        const [total, productos] = yield Promise.all([
            producto_1.ProductoModel.countDocuments(query),
            producto_1.ProductoModel.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limit)),
        ]);
        res.status(200).json({
            total,
            productos,
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Erro en el servidor al buscar productos'
        });
    }
});
exports.obtenerProductos = obtenerProductos;
const obtenerProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield producto_1.ProductoModel.findById(id)
            .populate('usuario', 'nombre');
        res.status(200).json({
            producto
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error del servidor al buscar un producto',
        });
    }
});
exports.obtenerProducto = obtenerProducto;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado, usuario } = _a, body = __rest(_a, ["estado", "usuario"]);
    try {
        const productoDB = yield producto_1.ProductoModel.findOne({ nombre: body.nombre });
        if (productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre}, ya existe`
            });
        }
        // Generar la data a guardar
        const data = Object.assign(Object.assign({}, body), { nombre: body.nombre.toUpperCase(), usuario: req.usuario._id });
        const producto = new producto_1.ProductoModel(data);
        // Gaurdar DB
        yield producto.save();
        res.status(201).json(producto);
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            msg: 'Error al crear un nuevo producto',
            error
        });
    }
});
exports.crearProducto = crearProducto;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _b = req.body, { estado, usuario } = _b, data = __rest(_b, ["estado", "usuario"]);
        if (data.nombre) {
            data.nombre = data.nombre.toUpperCase();
        }
        data.usuario = req.usuario._id;
        const producto = yield producto_1.ProductoModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            producto
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Erro en el servidor al actualizar un producto',
        });
    }
});
exports.actualizarProducto = actualizarProducto;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield producto_1.ProductoModel.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.status(200).json(producto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Error en el servidor al eliminar un producto',
        });
    }
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.js.map