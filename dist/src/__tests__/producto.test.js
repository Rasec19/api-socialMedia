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
describe('Prueba en productos', () => {
    const server = new server_1.default();
    test('debe crear un nuevo producto y repsonder con status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, helpers_1.generarJWT)('6459da00ba8bc6737157048d');
        const nuevoProducto = {
            nombre: 'testProductoCreat',
            precio: 100,
            descripcion: 'testing create',
            usuario: '6459da00ba8bc6737157048d'
        };
        const { statusCode } = yield (0, supertest_2.default)(server.app).post("/api/productos")
            .set('x-token', `${token}`)
            .send(nuevoProducto);
        expect(statusCode).toBe(201);
    }));
    test('debe obtener todos los productos y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app)
            .get('/api/productos')
            .send();
        expect(response.status).toBe(200);
    }));
    test('debe obtener un producto por su id y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const idProducto = "6459eee984e561aea5b9f2e9";
        const response = yield (0, supertest_1.default)(server.app)
            .get(`/api/productos/${idProducto}`)
            .send();
        expect(response.status).toBe(200);
    }));
    test('debe actualizar un producto por su id y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const idUsuario = "6459da00ba8bc6737157048d";
        const token = yield (0, helpers_1.generarJWT)(idUsuario);
        const idProducto = '645c28a4051749ef3a2d1d6f';
        const updateProducto = {
            nombre: "testingUpdated",
            descripcion: "testing updated function",
        };
        const { statusCode } = yield (0, supertest_2.default)(server.app).put(`/api/productos/${idProducto}`)
            .set('x-token', `${token}`)
            .send(updateProducto);
        expect(statusCode).toBe(200);
    }));
    test('debe eliminar un producto por su id y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const idUsuario = "6459da00ba8bc6737157048d";
        const token = yield (0, helpers_1.generarJWT)(idUsuario);
        const idProducto = '645c28a4051749ef3a2d1d6f';
        const { statusCode } = yield (0, supertest_2.default)(server.app).delete(`/api/productos/${idProducto}`)
            .set('x-token', `${token}`)
            .send();
        expect(statusCode).toBe(200);
    }));
});
//# sourceMappingURL=producto.test.js.map