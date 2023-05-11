import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API prueba Nextia",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
    {
      url: "http://api-socialmedia-production.up.railway.app:3000",
    }
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
            default:"USER"
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

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);