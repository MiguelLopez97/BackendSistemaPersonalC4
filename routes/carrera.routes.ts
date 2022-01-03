import { Router } from 'express';
import { getAllCarreras, getCarreraById, createCarrera, updateCarrera, disableCarrera } from '../controllers/carreras.controller';

const router = Router();

router.get('/', getAllCarreras);
router.get('/:idCarrera', getCarreraById);
router.post('/', createCarrera);
router.put('/', updateCarrera);
router.delete('/:idCarrera', disableCarrera);

export default router;