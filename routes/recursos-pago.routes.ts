import { Router } from 'express';
import { getAllRecursosPagos, getRecursoPagoById, createRecursoPago, updateRecursoPago, updateEstatusRecursoPago } from '../controllers/recursos-pago.controller';

const router = Router();

router.get('/', getAllRecursosPagos);
router.get('/:idRecursoPago', getRecursoPagoById);
router.post('/', createRecursoPago);
router.put('/', updateRecursoPago);
router.delete('/:idPuesto', updateEstatusRecursoPago);

export default router;