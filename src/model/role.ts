import mongoose, { Schema } from "mongoose";
import { Role } from '../interfaces'

const RoleSchema: Schema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
    }
});



export const RoleModel = mongoose.model<Role>('Role', RoleSchema);