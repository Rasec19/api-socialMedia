const Role = require('../models/role');
import { UsuarioModel } from '../model/usuario';
import { ProductoModel } from '../model/producto';

export const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

export const emailExiste = async ( correo = '' ) => { 
    const existeEmail = await UsuarioModel.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya existe`);
    }
}

export const existeUsuarioPorId = async ( id: string ) => {
    const existeUsuario = await UsuarioModel.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id }, no existe`);
    }
}

export const existeProductoPorId = async ( id: string ) => {
    const existeProducto = await ProductoModel.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id: ${ id }, no existe`);
    }
}

/**
 * Validar colecciones permitidas
 */
// export const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

//     const incluida = colecciones.includes( ProductoModel );
//     if( !incluida ) {
//         throw new Error(`La colección ${coleccion}, no es permitida - ${colecciones}`);
//     }

//     return true;
// };
