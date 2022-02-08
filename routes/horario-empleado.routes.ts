import { Router } from 'express';
import { getAllHorariosEmpleados, getHorarioEmpleadoById, getHorariosByEmpleadoByIdEmpleado, createHorarioEmpleado, updateHorarioEmpleado, updateEstatusHorarioEmpleado } from '../controllers/horario-empleados.controller';

const router = Router();

router.get('/', getAllHorariosEmpleados);
router.get('/:idHorarioEmpleado', getHorarioEmpleadoById);
router.get('/Empleado/:idEmpleado', getHorariosByEmpleadoByIdEmpleado);
router.post('/', createHorarioEmpleado);
router.put('/', updateHorarioEmpleado);
router.delete('/:idHorarioEmpleado', updateEstatusHorarioEmpleado);

export default router;