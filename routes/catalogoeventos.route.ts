import { Router } from 'express';
import { getAllCatalogoEventos, getCatalogoEventosById , createCatalogoEventos , updateCatalogoEventos , updateEstatusCatalogoEventos } from '../controllers/catalogoeventos.controller';

const router = Router();

router.get('/', getAllCatalogoEventos);
router.get('/:idCatalogoEventos', getCatalogoEventosById);
router.post('/', createCatalogoEventos );
router.put('/', updateCatalogoEventos );
router.delete('/:idCatalogoEventos', updateEstatusCatalogoEventos );
export default router;