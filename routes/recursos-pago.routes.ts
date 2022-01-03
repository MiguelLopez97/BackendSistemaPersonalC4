import { Router } from 'express';
import { getAllRecursosPagos, getRecursoPagoById, createRecursoPago, updateRecursoPago, disableRecursoPago } from '../controllers/recursos-pago.controller';

const router = Router();

router.get('/', getAllRecursosPagos);
router.get('/:idRecursoPago', getRecursoPagoById);
router.post('/', createRecursoPago);
router.put('/', updateRecursoPago);
router.delete('/:idRecursoPago', disableRecursoPago);

export default router;