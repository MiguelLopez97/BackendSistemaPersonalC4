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
exports.updateEstatusCorporacion = exports.updateCorporacion = exports.createCorporacion = exports.getCorporacionById = exports.getAllCorporaciones = void 0;
const corporacion_model_1 = __importDefault(require("../models/corporacion.model"));
const getAllCorporaciones = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const corporaciones = yield corporacion_model_1.default.findAll();
    response.json({
        data: corporaciones,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllCorporaciones = getAllCorporaciones;
const getCorporacionById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idCorporacion = Number(request.params.idCorporacion);
    if (isNaN(idCorporacion)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idCorporacion no es un valor válido'
        });
    }
    const corporacion = yield corporacion_model_1.default.findByPk(idCorporacion);
    if (corporacion) {
        response.json({
            data: corporacion,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            idCorporacion,
            data: corporacion,
            success: false,
            message: 'No existe registro con el id ' + idCorporacion
        });
    }
});
exports.getCorporacionById = getCorporacionById;
const createCorporacion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const corporacion = corporacion_model_1.default.build(body);
        yield corporacion.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = corporacion;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idCorporacion: resultCreate.null,
            nombre: resultCreate.nombre,
            siglas: resultCreate.siglas,
            direccion: resultCreate.direccion,
            telefono: resultCreate.telefono,
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
exports.createCorporacion = createCorporacion;
const updateCorporacion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idCorporacion'
        if (!body.idCorporacion) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idCorporacion es requerido'
            });
        }
        const corporacion = yield corporacion_model_1.default.findByPk(body.idCorporacion);
        //Si no existe registro del idCorporacion proporcionado
        if (!corporacion) {
            return response.status(404).json({
                data: corporacion,
                success: false,
                message: 'No existe registro con el id ' + body.idCorporacion
            });
        }
        yield corporacion.update(body);
        response.json({
            data: corporacion,
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
exports.updateCorporacion = updateCorporacion;
const updateEstatusCorporacion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idCorporacion = Number(request.params.idCorporacion);
    const estatus = request.query.estatus;
    if (isNaN(idCorporacion)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idCorporacion no es un valor válido'
        });
    }
    const corporacion = yield corporacion_model_1.default.findByPk(idCorporacion);
    if (!corporacion) {
        return response.status(404).json({
            data: corporacion,
            success: false,
            message: 'No existe registro con el id ' + idCorporacion
        });
    }
    if (estatus == undefined) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El valor del estatus es requerido (true o false)'
        });
    }
    //Habilitar o deshabilitar un registro (Update estatus)
    if (estatus == 'true') {
        //Si el estatus viene con valor 'true' deshabilita el registro
        corporacion.update({ estatus: false });
    }
    else if (estatus == 'false') {
        //Si el estatus viene con valor 'false' habilita el registro
        corporacion.update({ estatus: true });
    }
    else {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El valor del estatus no es válido (true o false)'
        });
    }
    response.json({
        data: corporacion,
        success: true,
        message: 'Estatus actualizado correctamente',
    });
});
exports.updateEstatusCorporacion = updateEstatusCorporacion;
// export const disableCorporacion = async (request: Request, response: Response) => {
//   const idCorporacion = Number(request.params.idCorporacion);
//   if (isNaN(idCorporacion))
//   {
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idCorporacion no es un valor válido'
//     });
//   }
//   const corporacion = await Corporacion.findByPk(idCorporacion);
//   if (!corporacion)
//   {
//     return response.status(404).json({
//       data: corporacion,
//       success: false,
//       message: 'No existe registro con el id ' + idCorporacion
//     });
//   }
//   //Para dar baja lógica a un registro (Update estatus)
//   await corporacion.update({ estatus: false });
//   response.json({
//     data: corporacion,
//     success:  true,
//     message: 'Estatus actualizado correctamente',
//   });
// }
//# sourceMappingURL=corporaciones.controller.js.map