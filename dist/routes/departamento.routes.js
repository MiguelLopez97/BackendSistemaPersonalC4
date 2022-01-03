"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentos_controller_1 = require("../controllers/departamentos.controller");
const router = express_1.Router();
router.get('/', departamentos_controller_1.getAllDepartamentos);
router.get('/:idDepartamento', departamentos_controller_1.getDepartamentoById);
router.post('/', departamentos_controller_1.createDepartamento);
router.put('/', departamentos_controller_1.updateDepartamento);
router.delete('/:idDepartamento', departamentos_controller_1.updateEstatusDepartamento);
exports.default = router;
//# sourceMappingURL=departamento.routes.js.map