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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../model/server"));
const supertest_2 = __importDefault(require("supertest"));
const helpers_1 = require("../helpers");
describe('Pruebas en usuario', () => {
    const server = new server_1.default();
    test('debe autenticar a un usuario y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const usuarioValidar = {
            correo: 'rasec.camacho19@gmail.com',
            contraseña: '123456'
        };
        const { status, text } = yield (0, supertest_1.default)(server.app)
            .post('/api/auth/login')
            .send(usuarioValidar);
        expect(status).toBe(200);
        // expect(response.body).toMatchObject(nuevoUsuario);
    }));
    test('debe crear un nuevo usuario y repsonder con status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, helpers_1.generarJWT)('6459da00ba8bc6737157048d');
        const nuevoUsuario = {
            nombre: 'test',
            contraseña: '12345678',
            correo: 'test@test.com',
            rol: 'USER'
        };
        const { statusCode } = yield (0, supertest_2.default)(server.app).post("/api/usuarios")
            .set('x-token', `${token}`)
            .send(nuevoUsuario);
        expect(statusCode).toBe(201);
        // expect(response.body).toMatchObject(nuevoUsuario);
    }));
});
//# sourceMappingURL=usuario.test.js.map