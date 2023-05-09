import { Router } from 'express';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuarios } from '../controllers'


const router = Router();

router.get('/', obtenerUsuarios);

router.post('/', crearUsuario);

router.put('/:id', actualizarUsuario);

router.delete('/:id', eliminarUsuarios);



export default router;