import { Router } from 'express';
import { getAllAsignacionGuardias, getAsignacionGuardiasById, createAsignacionGuardias, updateAsignacionGuardias,updateEstatusAsignacionGuardias } from '../controllers/asignacionguardias.controller';

const router = Router();

router.get('/', getAllAsignacionGuardias );
router.get('/:idAsignacionGuardias', getAsignacionGuardiasById);
router.post('/', createAsignacionGuardias );
router.put('/', updateAsignacionGuardias );
router.delete('/:idAsignacionGuardias', updateEstatusAsignacionGuardias);
export default router;