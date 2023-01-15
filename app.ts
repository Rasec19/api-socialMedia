import dotenv from 'dotenv'
import Server from './model/server';

// *Configuracion de dotenv: variables de entorno
dotenv.config();

const server = new Server();

server.listen();