import { Router } from 'express';
import { getAllDepartamentos, getDepartamentoById, createDepartamento, updateDepartamento, updateEstatusDepartamento } from '../controllers/departamentos.controller';

const router = Router();

router.get('/', getAllDepartamentos);
router.get('/:idDepartamento', getDepartamentoById);
router.post('/', createDepartamento);
router.put('/', updateDepartamento);
router.delete('/:idDepartamento', updateEstatusDepartamento);

export default router;