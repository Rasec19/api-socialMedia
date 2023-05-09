import { Request, Response } from 'express';

export const obtenerProductos = async ( req: Request, res: Response ) => {

    res.status(200).json({
        msg:'GET - Controller'
    });

}

export const obtenerProducto = async ( req: Request, res: Response ) => {

    res.status(200).json({
        msg:'GET - Controller',
        id: req.params.id
    });

}

export const crearProducto = async ( req: Request, res: Response ) => {

    res.status(201).json({
        msg:'POST - Controller',
        body: req.body
    });

}   

export const actualizarProducto = async ( req: Request, res: Response ) => {

    res.status(201).json({
        msg:'PUT - Controller',
        id: req.params.id,
        body: req.body
    });

}

export const eliminarProducto = async ( req: Request, res: Response ) => {

    res.status(200).json({
        msg:'DELETE - Controller',
        id: req.params.id
    });

}