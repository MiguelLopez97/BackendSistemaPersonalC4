"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recursos_pago_controller_1 = require("../controllers/recursos-pago.controller");
const router = express_1.Router();
router.get('/', recursos_pago_controller_1.getAllRecursosPagos);
router.get('/:idRecursoPago', recursos_pago_controller_1.getRecursoPagoById);
router.post('/', recursos_pago_controller_1.createRecursoPago);
router.put('/', recursos_pago_controller_1.updateRecursoPago);
router.delete('/:idRecursoPago', recursos_pago_controller_1.disableRecursoPago);
exports.default = router;
//# sourceMappingURL=recursos-pago.routes.js.map