import { Router } from 'express';
import { getAllCarreras, getCarreraById, createCarrera, updateCarrera,updateEstatusCarreras  } from '../controllers/carreras.controller';

const router = Router();

router.get('/', getAllCarreras);
router.get('/:idCarrera', getCarreraById);
router.post('/', createCarrera);
router.put('/', updateCarrera);
router.delete('/:idCarrera', updateEstatusCarreras );

export default router;