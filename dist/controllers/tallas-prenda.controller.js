"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableTallaPrenda = exports.updateTallaPrenda = exports.createTallaPrenda = exports.getTallaPrendaByIdEmpleado = exports.getTallaPrendaById = exports.getAllTallasPrendas = void 0;
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const { QueryTypes } = require('sequelize');
const talla_prenda_model_1 = __importDefault(require("../models/talla-prenda.model"));
const getAllTallasPrendas = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const tallasPrendas = yield talla_prenda_model_1.default.findAll();
    response.json({
        data: tallasPrendas,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllTallasPrendas = getAllTallasPrendas;
const getTallaPrendaById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idTallaPrenda = Number(request.params.idTallaPrenda);
    if (isNaN(idTallaPrenda)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idTallaPrenda no es un valor válido'
        });
    }
    //Buscamos el registro de TallaPrenda por 'idTallaPrenda'
    const tallaPrenda = yield talla_prenda_model_1.default.findByPk(idTallaPrenda);
    const resultTallaPrenda = tallaPrenda;
    //Buscamos el registro del empleado en base al 'fk_idEmpleado' para obtener el nombre completo
    const empleado = yield empleado_model_1.default.findByPk(resultTallaPrenda.fk_idEmpleado);
    //Objeto a mandar como respuesta 
    const dataResult = {
        idTallaPrenda: resultTallaPrenda.idTallaPrenda,
        fk_idEmpleado: resultTallaPrenda.fk_idEmpleado,
        nombreEmpleado: empleado.nombre + ' ' + empleado.apPaterno + ' ' + empleado.apMaterno,
        tallaCamisa: resultTallaPrenda.tallaCamisa,
        tallaPantalon: resultTallaPrenda.tallaPantalon,
        tallaFalda: resultTallaPrenda.tallaFalda,
        tallaZapato: resultTallaPrenda.tallaZapato,
        estatus: resultTallaPrenda.estatus,
        createdAt: resultTallaPrenda.createdAt,
        updatedAt: resultTallaPrenda.updatedAt
    };
    if (tallaPrenda) {
        response.json({
            data: dataResult,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            data: tallaPrenda,
            success: false,
            message: 'No existe registro con el id ' + idTallaPrenda
        });
    }
});
exports.getTallaPrendaById = getTallaPrendaById;
const getTallaPrendaByIdEmpleado = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const idEmpleado = Number(request.params.idEmpleado);
    if (isNaN(idEmpleado)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idEmpleado no es un valor válido'
        });
    }
    const tallaPrenda = yield ((_a = talla_prenda_model_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query("SELECT * FROM tallasprendas WHERE fk_idEmpleado = ?", {
        replacements: [idEmpleado],
        model: talla_prenda_model_1.default,
        mapToModel: true
    }));
    if (tallaPrenda === null || tallaPrenda === void 0 ? void 0 : tallaPrenda.length) {
        response.json({
            data: tallaPrenda[0],
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            data: tallaPrenda,
            success: false,
            message: 'No existe registro de tallas para el idEmpleado ' + idEmpleado
        });
    }
});
exports.getTallaPrendaByIdEmpleado = getTallaPrendaByIdEmpleado;
const createTallaPrenda = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const tallaPrenda = talla_prenda_model_1.default.build(body);
        yield tallaPrenda.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = tallaPrenda;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idTallaPrenda: resultCreate.null,
            fk_idEmpleado: resultCreate.fk_idEmpleado,
            tallaCamisa: resultCreate.tallaCamisa,
            tallaPantalon: resultCreate.tallaPantalon,
            tallaFalda: resultCreate.tallaFalda,
            tallaZapato: resultCreate.tallaZapato,
            estatus: resultCreate.estatus,
            createdAt: resultCreate.createdAt,
            updatedAt: resultCreate.updatedAt
        };
        response.json({
            data: dataCreated,
            success: true,
            message: 'Datos guardados correctamente'
        });
    }
    catch (error) {
        response.status(500).json({
            error: error,
            success: false,
            message: 'Error al procesar la petición'
        });
    }
});
exports.createTallaPrenda = createTallaPrenda;
const updateTallaPrenda = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idTallaPrenda'
        if (!body.idTallaPrenda) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idTallaPrenda es requerido'
            });
        }
        const tallaPrenda = yield talla_prenda_model_1.default.findByPk(body.idTallaPrenda);
        //Si no existe registro del idTallaPrenda proporcionado
        if (!tallaPrenda) {
            return response.status(404).json({
                data: tallaPrenda,
                success: false,
                message: 'No existe registro con el id ' + body.idTallaPrenda
            });
        }
        yield tallaPrenda.update(body);
        response.json({
            data: tallaPrenda,
            success: true,
            message: 'Datos actualizados correctamente'
        });
    }
    catch (error) {
        response.status(500).json({
            error: error,
            success: false,
            message: 'Error al procesar la petición'
        });
    }
});
exports.updateTallaPrenda = updateTallaPrenda;
const disableTallaPrenda = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idTallaPrenda = Number(request.params.idTallaPrenda);
    if (isNaN(idTallaPrenda)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idTallaPrenda no es un valor válido'
        });
    }
    const tallaPrenda = yield talla_prenda_model_1.default.findByPk(idTallaPrenda);
    if (!tallaPrenda) {
        return response.status(404).json({
            data: tallaPrenda,
            success: false,
            message: 'No existe registro con el id ' + idTallaPrenda
        });
    }
    //Para dar baja lógica a un registro (Update estatus)
    yield tallaPrenda.update({ estatus: false });
    response.json({
        data: tallaPrenda,
        success: true,
        message: 'Estatus actualizado correctamente',
    });
});
exports.disableTallaPrenda = disableTallaPrenda;
//# sourceMappingURL=tallas-prenda.controller.js.map