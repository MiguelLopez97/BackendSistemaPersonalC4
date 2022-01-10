import { Router } from 'express';
import { getAllTiposGuardias, getTiposGuardiasById, createTiposGuardias, updateTiposGuardias, updateEstatusTiposGuardias } from '../controllers/tiposguardias.controller';

const router = Router();

router.get('/', getAllTiposGuardias);
router.get('/:idTiposGuardias', getTiposGuardiasById);
router.post('/', createTiposGuardias );
router.put('/', updateTiposGuardias  );
router.delete('/:idTiposGuardias', updateEstatusTiposGuardias );
export default router;