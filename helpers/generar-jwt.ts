import jwt from 'jsonwebtoken';
import { UsuarioModel } from '../model/usuario';


export const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATREKEY!, {
            expiresIn: '4h'
        }, ( err , token ) => {

            if( err ) {
                console.log(err)
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }
        });
    });
}

export const comprobarJWT = async ( token = '' ) => {

    try {
        
        if ( token.length < 10 ) {
            return null;
        }
        
        const { uid }: any = jwt.verify( token, process.env.SECRETORPRIVATREKEY! );
        const usuario = await UsuarioModel.findById( uid );

        if ( usuario && usuario.estado ) {
            return usuario;
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }

};