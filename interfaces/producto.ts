import { Document } from 'mongoose'

export interface Producto extends Document {
    nombre: string;
    estado: boolean;
    usuario: any;
    precio: number;
    descripcion: string;
    disponible: boolean;
}