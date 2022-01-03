"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleado_controller_1 = require("../controllers/empleado.controller");
const router = express_1.Router();
router.get('/', empleado_controller_1.getAllEmpleados);
router.get('/:idEmpleado', empleado_controller_1.getEmpleadoById);
router.post('/', empleado_controller_1.createEmpleado);
router.put('/', empleado_controller_1.updateEmpleado);
router.delete('/:idEmpleado', empleado_controller_1.updateEstatusEmpleado);
exports.default = router;
//# sourceMappingURL=empleado.routes.js.map