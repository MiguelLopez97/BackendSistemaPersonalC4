import { Router } from 'express';
import { getAllControlConfianza, getControlConfianzaById, createControlConfianza, updateControlConfianza, updateEstatusControlConfianza } from '../controllers/controlconfianza.controller';

const router = Router();

router.get('/', getAllControlConfianza);
router.get('/:idControlConfianza', getControlConfianzaById);
router.post('/', createControlConfianza );
router.put('/', updateControlConfianza );
router.delete('/:idControlConfianza', updateEstatusControlConfianza);
export default router;