import { Router } from 'express';
import { getAllTallasPrendas, getTallaPrendaById, getTallaPrendaByIdEmpleado, createTallaPrenda, updateTallaPrenda,updateEstatusTallaPrenda  } from '../controllers/tallas-prenda.controller';

const router = Router();

router.get('/', getAllTallasPrendas);
router.get('/:idTallaPrenda', getTallaPrendaById);
router.get('/empleado/:idEmpleado', getTallaPrendaByIdEmpleado);
router.post('/', createTallaPrenda);
router.put('/', updateTallaPrenda);
router.delete('/:idTallaPrenda', updateEstatusTallaPrenda);

export default router;