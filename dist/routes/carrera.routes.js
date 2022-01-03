"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carreras_controller_1 = require("../controllers/carreras.controller");
const router = express_1.Router();
router.get('/', carreras_controller_1.getAllCarreras);
router.get('/:idCarrera', carreras_controller_1.getCarreraById);
router.post('/', carreras_controller_1.createCarrera);
router.put('/', carreras_controller_1.updateCarrera);
router.delete('/:idCarrera', carreras_controller_1.disableCarrera);
exports.default = router;
//# sourceMappingURL=carrera.routes.js.map