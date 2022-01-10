import { Router } from 'express';
import { getAllAltasBajasEmpleados, getAltasBajasEmpleadosById, createAltasBajasEmpleados, updateAltasBajasEmpleados, updateEstatusAltasBajasEmpleados  } from '../controllers/altasbajasempleados.controller';

const router = Router();

router.get('/', getAllAltasBajasEmpleados);
router.get('/:idAltasBajasEmpleados', getAltasBajasEmpleadosById);
router.post('/', createAltasBajasEmpleados );
router.put('/', updateAltasBajasEmpleados );
router.delete('/:idAltasBajasEmpleados',updateEstatusAltasBajasEmpleados);

export default router;