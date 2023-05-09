import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../model/usuario';

export const obtenerUsuarios = async ( req: Request, res: Response ) => {

    try {
        const { limit = 5, desde = 0 } = req.query; 
        const query = {estado: true};

        const [ total, usuarios ] = await Promise.all([
            UsuarioModel.countDocuments(query),
            UsuarioModel.find(query)
                .skip( Number(desde) )
                .limit( Number(limit) )
        ]);

        res.status(200).json({
            total,
            usuarios
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al buscar usuarios'
        });
    }

}

export const crearUsuario = async ( req: Request, res: Response ) => {

    try {
        const { nombre, correo, contraseña, rol } = req.body;
        const usuario = new UsuarioModel( { nombre, correo, contraseña, rol } );

        //* Encriptrar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.contraseña = bcrypt.hashSync( contraseña, salt );

        //* Guardar en DB
        await usuario.save();

        res.status(201).json({usuario});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al crear un usuario'
        });
    }

}   

export const actualizarUsuario = async ( req: Request, res: Response ) => {

    try {
        const { id } = req.params;
        const { _id, contraseña, correo,...resto } = req.body;

        // TODOD: validar contra base de datos
        if ( contraseña ) {
            //* Encriptrar la contraseña
            const salt = bcrypt.genSaltSync();
            resto.contraseña = bcrypt.hashSync( contraseña, salt );
        }

        const usuario = await UsuarioModel.findByIdAndUpdate( id, resto );

        res.json({usuario});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al actualizar un usuario'
        });
    }

}

export const eliminarUsuarios = async ( req: Request, res: Response ) => {

    try {
        const { id } = req.params;

        const usuario = await UsuarioModel.findByIdAndUpdate( id, { estado: false } );

        res.json(usuario);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error al eliminar un usuario'
        });
    }

}