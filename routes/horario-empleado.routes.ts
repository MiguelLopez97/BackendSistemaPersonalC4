import { Router } from 'express';
import { getAllHorariosEmpleados } from '../controllers/horario-empleados.controller';

const router = Router();

router.get('/', getAllHorariosEmpleados);
// router.get('/:idCarrera', getCarreraById);
// router.post('/', createCarrera);
// router.put('/', updateCarrera);
// router.delete('/:idCarrera', disableCarrera);

export default router;