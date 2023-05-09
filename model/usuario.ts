import mongoose, { Schema } from "mongoose";
import { Usuario } from '../interfaces'


const UsuarioSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
        type: String,
        required: true,
        default: 'USER',
        emun: ['ADMIN', 'USER']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export const UsuarioModel = mongoose.model<Usuario>('Usuario', UsuarioSchema);