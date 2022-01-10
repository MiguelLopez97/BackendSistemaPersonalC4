import { Router } from 'express';
import { getAllCatalogoGuardias, getCatalogoGuardiasById, createCatalogoGuardias, updateCatalogoGuardias, updateEstatusCatalogoGuardias} from '../controllers/catalogoguardias.controller';

const router = Router();

router.get('/', getAllCatalogoGuardias);
router.get('/:idCatalogoGuardias', getCatalogoGuardiasById);
router.post('/', createCatalogoGuardias );
router.put('/', updateCatalogoGuardias );
router.delete('/:idCatalogoGuardias', updateEstatusCatalogoGuardias );
export default router;