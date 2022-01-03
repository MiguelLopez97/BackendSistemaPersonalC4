import { Router } from 'express';
import { getAllEmpleados, getEmpleadoById, createEmpleado, updateEmpleado, updateEstatusEmpleado } from '../controllers/empleado.controller';

const router = Router();

router.get('/', getAllEmpleados);
router.get('/:idEmpleado', getEmpleadoById);
router.post('/', createEmpleado);
router.put('/', updateEmpleado);
router.delete('/:idEmpleado', updateEstatusEmpleado);

export default router;