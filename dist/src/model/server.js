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
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../docs/swagger"));
const auth_1 = __importDefault(require("../routes/auth"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const productos_1 = __importDefault(require("../routes/productos"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../db/config");
class Server {
    constructor() {
        this.apiPath = {
            auth: '/api/auth',
            docs: '/api/docs',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        // TODO: Metodos iniciales
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        //*CORS
        this.app.use((0, cors_1.default)());
        //*Lectura dee JSON
        this.app.use(express_1.default.json());
        //*Carpeta public
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPath.auth, auth_1.default);
        this.app.use(this.apiPath.docs, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
        this.app.use(this.apiPath.usuarios, usuarios_1.default);
        this.app.use(this.apiPath.productos, productos_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map