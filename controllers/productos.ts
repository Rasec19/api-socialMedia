import { Request, Response } from 'express';
import { ProductoModel } from '../model/producto';

export const obtenerProductos = async ( req: Request, res: Response ) => {

    try {
        const { limit = 5, desde = 0} = req.query;
        const query = { estado:true };

        const [ total, productos ] = await Promise.all([
            ProductoModel.countDocuments(query),
            ProductoModel.find(query)
                .populate('usuario', 'nombre')
                .skip( Number(desde) )
                .limit( Number(limit) ),
        ]);

        res.status(200).json({
            total,
            productos,
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Erro en el servidor al buscar productos'
        });
    }
}

export const obtenerProducto = async ( req: Request, res: Response ) => {

    try {

        const { id } = req.params;

        const producto = await ProductoModel.findById(id)
            .populate('usuario', 'nombre')

        res.status(200).json({
            producto
        });
        
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            error,
            msg: 'Error del servidor al buscar un producto',
        });
    }
}

export const crearProducto = async ( req: Request, res: Response ) => {

    const { estado, usuario, ...body } = req.body;

    try {
        
        const productoDB = await ProductoModel.findOne({ nombre: body.nombre });

        if( productoDB ) {
            return res.status(400).json({
                msg: `El producto ${ productoDB.nombre }, ya existe`
            });
        }

        // Generar la data a guardar
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }
 
        const producto = new ProductoModel(data);

        // Gaurdar DB
        await producto.save();

        res.status(201).json(producto);

    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({
            msg: 'Error al crear un nuevo producto',
            error
        });
    }
}   

export const actualizarProducto = async ( req: Request, res: Response ) => {

    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        if( data.nombre ) {
            data.nombre = data.nombre.toUpperCase();
        }
        
        data.usuario = req.usuario._id;

        const producto = await ProductoModel.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Erro en el servidor al actualizar un producto',
        });
    }
}

export const eliminarProducto = async ( req: Request, res: Response ) => {

    try {
        const { id } = req.params;

        const producto = await ProductoModel.findByIdAndUpdate( id, { estado: false }, { new: true } );

        res.status(200).json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            msg: 'Error en el servidor al eliminar un producto',
        });
    }
}