# Usuarios y Productos API
## Sobre el proyecto
Esta API se encarga de manejar el formato `CRUD` de usuarios y productos.
Utilizando las tecnologías `Nodejs`, `Expressjs` y `TypeScript`.
En una arquitectuira `MVC`.
Ademas de manejar el uso de tokens por `JWT` y pruebas unitarias con `Jest`.
### Instalación de paqueteria de `node`
> npm install

### Comando para la ejecución del servidor
> npm start

### Comando para la ejecución del servidor con nodemon para desarrollo
> npm run dev

### Comando para compilación de TypeScript
> tsc

### Comando para compilación de TypeScript durante desarrollo
> tsc --watch

### Comando para la ejecución del testing
> npm test

## Swagger
La API hace uso de la libreria `Swagger` para la creación de la documentación de cada una de las rutas de esta API, para que es cada una y sus posibles respuestas.

### Rutas para direccionar a Swagger dentro de la API

#### En servidor publico
> https://api-socialmedia-production.up.railway.app/api/docs
#### En ambiente de desarrollo
> http://localhost:3000/api/docs