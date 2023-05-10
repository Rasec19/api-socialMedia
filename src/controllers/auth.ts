import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UsuarioModel } from '../model/usuario';

import { generarJWT } from '../helpers';

export const login = async ( req: Request, res: Response ) => {

    const { correo, contraseña } = req.body 

    try {
        
        // Verificar sí el correo existe
        const usuario = await UsuarioModel.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo'
            });
        }

        // Sí el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync( contraseña, usuario.contraseña );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - contraseña'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.status(200).json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

export const renovarToken = async ( req: Request, res: Response ) => {
    
    const { usuario }: any = req;

    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    });

};