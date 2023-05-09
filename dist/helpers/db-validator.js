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
exports.existeProductoPorId = exports.existeUsuarioPorId = exports.emailExiste = exports.esRolValido = void 0;
const role_1 = require("../model/role");
const usuario_1 = require("../model/usuario");
const producto_1 = require("../model/producto");
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield role_1.RoleModel.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const emailExiste = (correo = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_1.UsuarioModel.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya existe`);
    }
});
exports.emailExiste = emailExiste;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield usuario_1.UsuarioModel.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id}, no existe`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
const existeProductoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeProducto = yield producto_1.ProductoModel.findById(id);
    if (!existeProducto) {
        throw new Error(`El id: ${id}, no existe`);
    }
});
exports.existeProductoPorId = existeProductoPorId;
/**
 * Validar colecciones permitidas
 */
// export const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
//     const incluida = colecciones.includes( ProductoModel );
//     if( !incluida ) {
//         throw new Error(`La colección ${coleccion}, no es permitida - ${colecciones}`);
//     }
//     return true;
// };
//# sourceMappingURL=db-validator.js.map