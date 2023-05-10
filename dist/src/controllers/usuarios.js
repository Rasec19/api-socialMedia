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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuarios = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../model/usuario");
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 5, desde = 0 } = req.query;
        const query = { estado: true };
        const [total, usuarios] = yield Promise.all([
            usuario_1.UsuarioModel.countDocuments(query),
            usuario_1.UsuarioModel.find(query)
                .skip(Number(desde))
                .limit(Number(limit))
        ]);
        res.status(200).json({
            total,
            usuarios
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al buscar usuarios'
        });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo, contraseña, rol } = req.body;
        const usuario = new usuario_1.UsuarioModel({ nombre, correo, contraseña, rol });
        //* Encriptrar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.contraseña = bcryptjs_1.default.hashSync(contraseña, salt);
        //* Guardar en DB
        yield usuario.save();
        res.status(201).json({ usuario });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al crear un usuario'
        });
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { _id, contraseña, correo } = _a, resto = __rest(_a, ["_id", "contrase\u00F1a", "correo"]);
        // TODOD: validar contra base de datos
        if (contraseña) {
            //* Encriptrar la contraseña
            const salt = bcryptjs_1.default.genSaltSync();
            resto.contraseña = bcryptjs_1.default.hashSync(contraseña, salt);
        }
        const usuario = yield usuario_1.UsuarioModel.findByIdAndUpdate(id, resto);
        res.json({ usuario });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al actualizar un usuario'
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield usuario_1.UsuarioModel.findByIdAndUpdate(id, { estado: false });
        res.json(usuario);
    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al eliminar un usuario'
        });
    }
});
exports.eliminarUsuarios = eliminarUsuarios;
//# sourceMappingURL=usuarios.js.map