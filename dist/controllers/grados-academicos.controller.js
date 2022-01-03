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
exports.disableGradoAcademico = exports.updateGradoAcademico = exports.createGradoAcademico = exports.getGradoAcademicoById = exports.getAllGradosAcademicos = void 0;
const grado_academico_model_1 = __importDefault(require("../models/grado-academico.model"));
const getAllGradosAcademicos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gradosAcademicos = yield grado_academico_model_1.default.findAll();
    response.json({
        data: gradosAcademicos,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllGradosAcademicos = getAllGradosAcademicos;
const getGradoAcademicoById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idGradoAcademico = Number(request.params.idGradoAcademico);
    if (isNaN(idGradoAcademico)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idGradoAcademico no es un valor válido'
        });
    }
    const gradoAcademico = yield grado_academico_model_1.default.findByPk(idGradoAcademico);
    if (gradoAcademico) {
        response.json({
            data: gradoAcademico,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            data: gradoAcademico,
            success: false,
            message: 'No existe registro con el id ' + idGradoAcademico
        });
    }
});
exports.getGradoAcademicoById = getGradoAcademicoById;
const createGradoAcademico = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const gradoAcademico = grado_academico_model_1.default.build(body);
        yield gradoAcademico.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = gradoAcademico;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idGradoAcademico: resultCreate.null,
            nombre: resultCreate.nombre,
            abreviatura: resultCreate.abreviatura,
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
exports.createGradoAcademico = createGradoAcademico;
const updateGradoAcademico = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idGradoAcademico'
        if (!body.idGradoAcademico) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idGradoAcademico es requerido'
            });
        }
        const gradoAcademico = yield grado_academico_model_1.default.findByPk(body.idGradoAcademico);
        //Si no existe registro del idGradoAcademico proporcionado
        if (!gradoAcademico) {
            return response.status(404).json({
                data: gradoAcademico,
                success: false,
                message: 'No existe registro con el id ' + body.idGradoAcademico
            });
        }
        yield gradoAcademico.update(body);
        response.json({
            data: gradoAcademico,
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
exports.updateGradoAcademico = updateGradoAcademico;
const disableGradoAcademico = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idGradoAcademico = Number(request.params.idGradoAcademico);
    if (isNaN(idGradoAcademico)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idGradoAcademico no es un valor válido'
        });
    }
    const gradoAcademico = yield grado_academico_model_1.default.findByPk(idGradoAcademico);
    if (!gradoAcademico) {
        return response.status(404).json({
            data: gradoAcademico,
            success: false,
            message: 'No existe registro con el id ' + idGradoAcademico
        });
    }
    //Para dar baja lógica a un registro (Update estatus)
    yield gradoAcademico.update({ estatus: false });
    response.json({
        data: gradoAcademico,
        success: true,
        message: 'Estatus actualizado correctamente',
    });
});
exports.disableGradoAcademico = disableGradoAcademico;
//# sourceMappingURL=grados-academicos.controller.js.map