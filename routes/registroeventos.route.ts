import { Router } from 'express';
import { getAllRegistroEventos, getRegistroEventosById, createRegistroEventos,updateRegistroEventos,updateEstatusRegistroEventos} from '../controllers/registroeventos.controller';

const router = Router();

router.get('/', getAllRegistroEventos);
router.get('/:idRegistroEventos', getRegistroEventosById);
router.post('/', createRegistroEventos );
router.put('/', updateRegistroEventos );
router.delete('/:idRegistroEventos', updateEstatusRegistroEventos);
export default router;