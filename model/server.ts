import express, { Application } from 'express';
import usuariosRoutes from '../routes/usuarios'
import productosRoutes from '../routes/productos'
import cors from 'cors';

import { dbConnection } from '../db/config';


class Server {
    
    private app: Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios',
        productos: '/api/productos',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // TODO: Metodos iniciales
        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //*CORS
        this.app.use( cors() );

        //*Lectura dee JSON
        this.app.use( express.json() );

        //*Carpeta public
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.apiPath.usuarios, usuariosRoutes );
        this.app.use( this.apiPath.productos, productosRoutes );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);
        });
    }

}




export default Server;