"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const corporaciones_controller_1 = require("../controllers/corporaciones.controller");
const router = express_1.Router();
router.get('/', corporaciones_controller_1.getAllCorporaciones);
router.get('/:idCorporacion', corporaciones_controller_1.getCorporacionById);
router.post('/', corporaciones_controller_1.createCorporacion);
router.put('/', corporaciones_controller_1.updateCorporacion);
router.delete('/:idCorporacion', corporaciones_controller_1.updateEstatusCorporacion);
exports.default = router;
//# sourceMappingURL=corporacion.routes.js.map