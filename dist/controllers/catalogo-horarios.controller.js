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
exports.updateEstatusHorario = exports.updateHorario = exports.createHorario = exports.getHorarioById = exports.getAllCatalogosHorarios = void 0;
const catalogo_horarios_model_1 = __importDefault(require("../models/catalogo-horarios.model"));
const getAllCatalogosHorarios = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const catalogosHorarios = yield catalogo_horarios_model_1.default.findAll();
    response.json({
        data: catalogosHorarios,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllCatalogosHorarios = getAllCatalogosHorarios;
const getHorarioById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idCatalogoHorario = Number(request.params.idCatalogoHorario);
    if (isNaN(idCatalogoHorario)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idCatalogoHorario no es un valor válido'
        });
    }
    const horario = yield catalogo_horarios_model_1.default.findByPk(idCatalogoHorario);
    if (horario) {
        response.json({
            data: horario,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            data: horario,
            success: false,
            message: 'No existe registro con el id ' + idCatalogoHorario
        });
    }
});
exports.getHorarioById = getHorarioById;
const createHorario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const horario = catalogo_horarios_model_1.default.build(body);
        yield horario.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = horario;
        console.log(horario);
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idCatalogoHorario: resultCreate.null,
            clave: resultCreate.clave,
            descripcion: resultCreate.descripcion,
            hora_entrada: resultCreate.hora_entrada,
            hora_salida: resultCreate.hora_salida,
            cantidad_retardo: resultCreate.cantidadRetardo,
            hora_entrada2: resultCreate.hora_entrada2,
            hora_salida2: resultCreate.hora_salida2,
            fk_idTipoHorario: resultCreate.fk_idTipoHorario,
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
            error: error.parent.sqlMessage,
            success: false,
            message: 'Error al procesar la petición'
        });
    }
});
exports.createHorario = createHorario;
const updateHorario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idCarrera'
        if (!body.idCatalogoHorario) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idCatalogoHorario es requerido'
            });
        }
        const horario = yield catalogo_horarios_model_1.default.findByPk(body.idCatalogoHorario);
        //Si no existe registro del idCarrera proporcionado
        if (!horario) {
            return response.status(404).json({
                data: horario,
                success: false,
                message: 'No existe registro con el id ' + body.idCatalogoHorario
            });
        }
        yield horario.update(body);
        response.json({
            data: horario,
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
exports.updateHorario = updateHorario;
const updateEstatusHorario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idCatalogoHorario = Number(request.params.idCatalogoHorario);
    const estatus = request.query.estatus;
    if (isNaN(idCatalogoHorario)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idCatalogoHorario no es un valor válido'
        });
    }
    const horario = yield catalogo_horarios_model_1.default.findByPk(idCatalogoHorario);
    if (!horario) {
        return response.status(404).json({
            data: horario,
            success: false,
            message: 'No existe registro con el id ' + idCatalogoHorario
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
        horario.update({ estatus: false });
    }
    else if (estatus == 'false') {
        //Si el estatus viene con valor 'false' habilita el registro
        horario.update({ estatus: true });
    }
    else {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El valor del estatus no es válido (true o false)'
        });
    }
    response.json({
        data: horario,
        success: true,
        message: 'Estatus actualizado correctamente',
    });
});
exports.updateEstatusHorario = updateEstatusHorario;
// export const disableHorario = async (request: Request, response: Response) => {
//   const idCatalogoHorario = Number(request.params.idCatalogoHorario);
//   if (isNaN(idCatalogoHorario))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idCatalogoHorario no es un valor válido'
//     });
//   }
//   const horario = await CatalogoHorarios.findByPk(idCatalogoHorario);
//   if (!horario)
//   {
//     return response.status(404).json({
//       data: horario,
//       success: false,
//       message: 'No existe registro con el id ' + idCatalogoHorario
//     });
//   }
//   //Para dar baja lógica a un registro (Update estatus)
//   await horario.update({ estatus: false });
//   response.json({
//     data: horario,
//     success: true,
//     message: 'Estatus actualizado correctamente',
//   });
// }
//# sourceMappingURL=catalogo-horarios.controller.js.map