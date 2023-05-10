import mongoose, { Schema } from "mongoose";
import { Producto } from '../interfaces'


const ProductoSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    precio: {
        type: Number,
        default: 0,
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

export const ProductoModel = mongoose.model<Producto>('Producto', ProductoSchema);