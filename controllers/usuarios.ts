import { Request, Response } from 'express';

export const obtenerUsuarios = async ( req: Request, res: Response ) => {

    res.status(200).json({
        msg:'GET - Controller'
    });

}

export const obtenerUsuario = async ( req: Request, res: Response ) => {

    res.status(200).json({
        msg:'GET - Controller',
        id: req.params.id
    });

}

export const crearUsuario = async ( req: Request, res: Response ) => {

    res.status(201).json({
        msg:'POST - Controller',
        body: req.body
    });

}   

export const actualizarUsuario = async ( req: Request, res: Response ) => {

    res.status(201).json({
        msg:'PUT - Controller',
        id: req.params.id,
        body: req.body
    });

}

export const eliminarUsuarios = async ( req: Request, res: Response ) => {

    res.status(200).json({
        msg:'DELETE - Controller',
        id: req.params.id
    });

}