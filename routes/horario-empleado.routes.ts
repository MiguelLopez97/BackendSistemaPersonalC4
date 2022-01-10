import { Router } from 'express';
import { getAllHorariosEmpleados, getHorarioEmpleadoById } from '../controllers/horario-empleados.controller';

const router = Router();

router.get('/', getAllHorariosEmpleados);
router.get('/:idHorarioEmpleado', getHorarioEmpleadoById);
// router.post('/', createCarrera);
// router.put('/', updateCarrera);
// router.delete('/:idCarrera', disableCarrera);

export default router;