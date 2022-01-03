"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tallas_prenda_controller_1 = require("../controllers/tallas-prenda.controller");
const router = express_1.Router();
router.get('/', tallas_prenda_controller_1.getAllTallasPrendas);
router.get('/:idTallaPrenda', tallas_prenda_controller_1.getTallaPrendaById);
router.get('/empleado/:idEmpleado', tallas_prenda_controller_1.getTallaPrendaByIdEmpleado);
router.post('/', tallas_prenda_controller_1.createTallaPrenda);
router.put('/', tallas_prenda_controller_1.updateTallaPrenda);
router.delete('/:idTallaPrenda', tallas_prenda_controller_1.disableTallaPrenda);
exports.default = router;
//# sourceMappingURL=tallas-prenda.routes.js.map