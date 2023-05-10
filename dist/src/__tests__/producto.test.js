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
describe('Prueba en productos', () => {
    const server = new server_1.default();
    test('debe crear un nuevo producto y repsonder con status 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const nuevoProducto = {
            nombre: 'Play Station 4',
            precio: 1100,
            descripcion: 'Es una consola de videojuegos',
            usuario: '6459da00ba8bc6737157048d'
        };
        const response = yield (0, supertest_1.default)(server.app)
            .post('/api/productos')
            .send(nuevoProducto);
        expect(response.status).toBe(201);
        // expect(response.body).toMatchObject(nuevoProducto);
    }));
    test('debe obtener todos los productos y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app)
            .get('/api/productos')
            .send();
        expect(response.status).toBe(200);
    }));
    test('debe obtener un producto por su id y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "6459eee984e561aea5b9f2e9";
        const response = yield (0, supertest_1.default)(server.app)
            .get(`/api/productos/${id}`)
            .send();
        expect(response.status).toBe(200);
    }));
    test('debe actualizar un producto por su id y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "6459eee984e561aea5b9f2e9";
        const updateProducto = {
            disponible: false,
        };
        const response = yield (0, supertest_1.default)(server.app)
            .put(`/api/productos/${id}`)
            .send(updateProducto);
        expect(response.status).toBe(200);
    }));
    test('debe eliminar un producto por su id y repsonder con status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "6459eee984e561aea5b9f2e9";
        const response = yield (0, supertest_1.default)(server.app)
            .delete(`/api/productos/${id}`)
            .send();
        expect(response.status).toBe(200);
    }));
});
//# sourceMappingURL=producto.test.js.map