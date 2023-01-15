import { Router } from 'express';


const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        msg:'GET - exito!'
    });
});




export default router;