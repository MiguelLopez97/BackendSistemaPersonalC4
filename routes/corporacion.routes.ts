import { Router } from 'express';
import { getAllCorporaciones, getCorporacionById, createCorporacion, updateCorporacion, updateEstatusCorporacion } from '../controllers/corporaciones.controller';

const router = Router();

router.get('/', getAllCorporaciones);
router.get('/:idCorporacion', getCorporacionById);
router.post('/', createCorporacion);
router.put('/', updateCorporacion);
router.delete('/:idCorporacion', updateEstatusCorporacion);

export default router;