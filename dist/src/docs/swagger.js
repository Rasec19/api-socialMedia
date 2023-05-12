"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API prueba Nextia",
        version: "1.0.0",
    },
    servers: [
        {
            url: "https://api-socialmedia-production.up.railway.app",
        },
        {
            url: "http://localhost:3000",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                name: "x-token",
                type: "apiKey",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT"
            },
        },
        schemas: {
            usuario: {
                type: "object",
                required: ["nombre", "correo", "contraseña", "rol"],
                properties: {
                    nombre: {
                        type: "string",
                        default: "nuevo usuario"
                    },
                    correo: {
                        type: "string",
                        default: "nuevo@gmail.com"
                    },
                    contraseña: {
                        type: "string",
                        default: "123456"
                    },
                    rol: {
                        type: "string",
                        default: "ADMIN"
                    },
                    estado: {
                        type: "boolean",
                        default: "true"
                    },
                },
            },
            producto: {
                type: "object",
                required: ["nombre", "estado", "usuario"],
                properties: {
                    nombre: {
                        type: "string",
                        default: "nuevo producto"
                    },
                    estado: {
                        type: "boolean",
                        default: "true"
                    },
                    usuario: {
                        type: "objectId",
                        default: "id del usuario"
                    },
                    precio: {
                        type: "number",
                        default: "1"
                    },
                    descripcion: {
                        type: "string",
                        default: "nueva descripcion"
                    },
                    disponible: {
                        type: "boolean",
                        default: "true"
                    },
                },
            },
            auth: {
                type: "object",
                required: ["correo", "contraseña"],
                properties: {
                    correo: {
                        type: "string",
                        default: "nextia@gmail.com"
                    },
                    contraseña: {
                        type: "string",
                        default: "123456"
                    },
                },
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swagger.js.map