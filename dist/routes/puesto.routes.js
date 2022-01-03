"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puestos_controller_1 = require("../controllers/puestos.controller");
const router = express_1.Router();
router.get('/', puestos_controller_1.getAllPuestos);
router.get('/:idPuesto', puestos_controller_1.getPuestoById);
router.post('/', puestos_controller_1.createPuesto);
router.put('/', puestos_controller_1.updatePuesto);
router.delete('/:idPuesto', puestos_controller_1.updateEstatusPuesto);
exports.default = router;
//# sourceMappingURL=puesto.routes.js.map