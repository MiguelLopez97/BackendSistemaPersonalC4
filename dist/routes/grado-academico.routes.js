"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grados_academicos_controller_1 = require("../controllers/grados-academicos.controller");
const router = express_1.Router();
router.get('/', grados_academicos_controller_1.getAllGradosAcademicos);
router.get('/:idGradoAcademico', grados_academicos_controller_1.getGradoAcademicoById);
router.post('/', grados_academicos_controller_1.createGradoAcademico);
router.put('/', grados_academicos_controller_1.updateGradoAcademico);
router.delete('/:idGradoAcademico', grados_academicos_controller_1.disableGradoAcademico);
exports.default = router;
//# sourceMappingURL=grado-academico.routes.js.map