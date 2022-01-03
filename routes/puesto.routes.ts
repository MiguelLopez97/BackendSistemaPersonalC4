import { Router } from "express";
import { getAllPuestos, getPuestoById, createPuesto, updatePuesto, updateEstatusPuesto } from '../controllers/puestos.controller';

const router = Router();

router.get('/', getAllPuestos);
router.get('/:idPuesto', getPuestoById);
router.post('/', createPuesto);
router.put('/', updatePuesto);
router.delete('/:idPuesto', updateEstatusPuesto);

export default router;