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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renovarToken = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../model/usuario");
const helpers_1 = require("../helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contraseña } = req.body;
    try {
        // Verificar sí el correo existe
        const usuario = yield usuario_1.UsuarioModel.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo'
            });
        }
        // Sí el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(contraseña, usuario.contraseña);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - contraseña'
            });
        }
        // Generar el JWT
        const token = yield (0, helpers_1.generarJWT)(usuario.id);
        res.status(200).json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
const renovarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req;
    const token = yield (0, helpers_1.generarJWT)(usuario.id);
    res.json({
        usuario,
        token
    });
});
exports.renovarToken = renovarToken;
//# sourceMappingURL=auth.js.map