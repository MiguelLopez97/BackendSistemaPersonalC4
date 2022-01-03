"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogo_horarios_controller_1 = require("../controllers/catalogo-horarios.controller");
const router = express_1.Router();
router.get('/', catalogo_horarios_controller_1.getAllCatalogosHorarios);
router.get('/:idCatalogoHorario', catalogo_horarios_controller_1.getHorarioById);
router.post('/', catalogo_horarios_controller_1.createHorario);
router.put('/', catalogo_horarios_controller_1.updateHorario);
router.delete('/:idCatalogoHorario', catalogo_horarios_controller_1.updateEstatusHorario);
exports.default = router;
//# sourceMappingURL=catalogo-horario.routes.js.map