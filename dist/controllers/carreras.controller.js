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
exports.disableCarrera = exports.updateCarrera = exports.createCarrera = exports.getCarreraById = exports.getAllCarreras = void 0;
const carrera_model_1 = __importDefault(require("../models/carrera.model"));
const getAllCarreras = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const carreras = yield carrera_model_1.default.findAll();
    response.json({
        data: carreras,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllCarreras = getAllCarreras;
const getCarreraById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idCarrera = Number(request.params.idCarrera);
    if (isNaN(idCarrera)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idCarrera no es un valor válido'
        });
    }
    const carrera = yield carrera_model_1.default.findByPk(idCarrera);
    if (carrera) {
        response.json({
            data: carrera,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            idCarrera,
            data: carrera,
            success: false,
            message: 'No existe registro con el id ' + idCarrera
        });
    }
});
exports.getCarreraById = getCarreraById;
const createCarrera = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const carrera = carrera_model_1.default.build(body);
        yield carrera.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = carrera;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idCarrera: resultCreate.null,
            nombre: resultCreate.nombre,
            siglas: resultCreate.siglas,
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
exports.createCarrera = createCarrera;
const updateCarrera = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idCarrera'
        if (!body.idCarrera) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idCarrera es requerido'
            });
        }
        const carrera = yield carrera_model_1.default.findByPk(body.idCarrera);
        //Si no existe registro del idCarrera proporcionado
        if (!carrera) {
            return response.status(404).json({
                data: carrera,
                success: false,
                message: 'No existe registro con el id ' + body.idCarrera
            });
        }
        yield carrera.update(body);
        response.json({
            data: carrera,
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
exports.updateCarrera = updateCarrera;
const disableCarrera = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idCarrera = Number(request.params.idCarrera);
    if (isNaN(idCarrera)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idCarrera no es un valor válido'
        });
    }
    const carrera = yield carrera_model_1.default.findByPk(idCarrera);
    if (!carrera) {
        return response.status(404).json({
            data: carrera,
            success: false,
            message: 'No existe registro con el id ' + idCarrera
        });
    }
    //Para dar baja lógica a un registro (Update estatus)
    yield carrera.update({ estatus: false });
    response.json({
        data: carrera,
        success: true,
        message: 'Estatus actualizado correctamente',
    });
});
exports.disableCarrera = disableCarrera;
//# sourceMappingURL=carreras.controller.js.map