"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horario_empleados_controller_1 = require("../controllers/horario-empleados.controller");
const router = express_1.Router();
router.get('/', horario_empleados_controller_1.getAllHorariosEmpleados);
// router.get('/:idCarrera', getCarreraById);
// router.post('/', createCarrera);
// router.put('/', updateCarrera);
// router.delete('/:idCarrera', disableCarrera);
exports.default = router;
//# sourceMappingURL=horario-empleado.routes.js.map