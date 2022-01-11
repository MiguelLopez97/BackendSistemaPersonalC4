import { Router } from 'express';
import {getAllConfiguraciones,getConfiguracionesById,createConfiguraciones,updateConfiguraciones,updateEstatusConfiguraciones  } from '../controllers/configuraciones.controller';

const router = Router();

router.get('/', getAllConfiguraciones);
router.get('/:idConfiguraciones', getConfiguracionesById);
router.post('/', createConfiguraciones );
router.put('/', updateConfiguraciones );
router.delete('/:idConfiguraciones', updateEstatusConfiguraciones);
export default router;