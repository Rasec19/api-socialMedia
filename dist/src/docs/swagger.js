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
                    },
                    correo: {
                        type: "string",
                    },
                    contraseña: {
                        type: "string",
                    },
                    rol: {
                        type: "string",
                        default: "USER"
                    },
                    estado: {
                        type: "boolean",
                    },
                },
            },
            producto: {
                type: "object",
                required: ["nombre", "estado", "usuario"],
                properties: {
                    nombre: {
                        type: "string",
                    },
                    estado: {
                        type: "boolean",
                    },
                    usuario: {
                        type: "objectId",
                    },
                    precio: {
                        type: "number",
                    },
                    descripcion: {
                        type: "string",
                    },
                    disponible: {
                        type: "boolean",
                    },
                },
            },
            auth: {
                type: "object",
                required: ["correo", "contraseña"],
                properties: {
                    correo: {
                        type: "string",
                    },
                    contraseña: {
                        type: "string",
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