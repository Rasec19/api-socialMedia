import jwt from 'jsonwebtoken';

const Usuario = require('../models/usuario');



export const validarJWT = async( req: any, res: any, next: any ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid }: any = jwt.verify( token, process.env.SECRETORPRIVATREKEY! );
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }

        // Verificar si el uid tiene estado en true
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }
        
        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}