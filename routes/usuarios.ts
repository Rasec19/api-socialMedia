import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuarios } from '../controllers'


const router = Router();

router.get('/', obtenerUsuarios);

router.get('/:id', obtenerUsuario);

router.post('/', crearUsuario);

router.put('/:id', actualizarUsuario);

router.delete('/:id', eliminarUsuarios);



export default router;