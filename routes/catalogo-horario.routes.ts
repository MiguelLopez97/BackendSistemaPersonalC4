import { Router } from "express";
import { getAllCatalogosHorarios, getHorarioById, createHorario, updateHorario, updateEstatusHorario } from '../controllers/catalogo-horarios.controller';

const router = Router();

router.get('/', getAllCatalogosHorarios);
router.get('/:idCatalogoHorario', getHorarioById);
router.post('/', createHorario);
router.put('/', updateHorario);
router.delete('/:idCatalogoHorario', updateEstatusHorario);

export default router;