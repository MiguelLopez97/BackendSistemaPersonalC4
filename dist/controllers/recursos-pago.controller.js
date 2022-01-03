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
exports.disableRecursoPago = exports.updateRecursoPago = exports.createRecursoPago = exports.getRecursoPagoById = exports.getAllRecursosPagos = void 0;
const recurso_pago_model_1 = __importDefault(require("../models/recurso-pago.model"));
const getAllRecursosPagos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const recursosPagos = yield recurso_pago_model_1.default.findAll();
    response.json({
        data: recursosPagos,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllRecursosPagos = getAllRecursosPagos;
const getRecursoPagoById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idRecursoPago = Number(request.params.idRecursoPago);
    if (isNaN(idRecursoPago)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idRecursoPago no es un valor válido'
        });
    }
    const recursoPago = yield recurso_pago_model_1.default.findByPk(idRecursoPago);
    if (recursoPago) {
        response.json({
            data: recursoPago,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            data: recursoPago,
            success: false,
            message: 'No existe registro con el id ' + idRecursoPago
        });
    }
});
exports.getRecursoPagoById = getRecursoPagoById;
const createRecursoPago = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const recursoPago = recurso_pago_model_1.default.build(body);
        yield recursoPago.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = recursoPago;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idRecursoPago: resultCreate.null,
            nombre: resultCreate.nombre,
            descripcion: resultCreate.descripcion,
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
exports.createRecursoPago = createRecursoPago;
const updateRecursoPago = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idRecursoPago'
        if (!body.idRecursoPago) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idRecursoPago es requerido'
            });
        }
        const recursoPago = yield recurso_pago_model_1.default.findByPk(body.idRecursoPago);
        //Si no existe registro del idRecursoPago proporcionado
        if (!recursoPago) {
            return response.status(404).json({
                data: recursoPago,
                success: false,
                message: 'No existe registro con el id ' + body.idRecursoPago
            });
        }
        yield recursoPago.update(body);
        response.json({
            data: recursoPago,
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
exports.updateRecursoPago = updateRecursoPago;
const disableRecursoPago = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idRecursoPago = Number(request.params.idRecursoPago);
    if (isNaN(idRecursoPago)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idRecursoPago no es un valor válido'
        });
    }
    const recursoPago = yield recurso_pago_model_1.default.findByPk(idRecursoPago);
    if (!recursoPago) {
        return response.status(404).json({
            data: recursoPago,
            success: false,
            message: 'No existe registro con el id ' + idRecursoPago
        });
    }
    //Para dar baja lógica a un registro (Update estatus)
    yield recursoPago.update({ estatus: false });
    response.json({
        data: recursoPago,
        success: true,
        message: 'Estatus actualizado correctamente'
    });
});
exports.disableRecursoPago = disableRecursoPago;
//# sourceMappingURL=recursos-pago.controller.js.map