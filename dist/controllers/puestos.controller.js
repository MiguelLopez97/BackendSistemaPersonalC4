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
exports.updateEstatusPuesto = exports.updatePuesto = exports.createPuesto = exports.getPuestoById = exports.getAllPuestos = void 0;
const puesto_model_1 = __importDefault(require("../models/puesto.model"));
const getAllPuestos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const puestos = yield puesto_model_1.default.findAll();
    response.json({
        data: puestos,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllPuestos = getAllPuestos;
const getPuestoById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idPuesto = Number(request.params.idPuesto);
    if (isNaN(idPuesto)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idPuesto no es un valor válido'
        });
    }
    const puesto = yield puesto_model_1.default.findByPk(idPuesto);
    if (puesto) {
        response.json({
            data: puesto,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            idPuesto,
            data: puesto,
            success: false,
            message: 'No existe registro con el id ' + idPuesto
        });
    }
});
exports.getPuestoById = getPuestoById;
const createPuesto = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const puesto = puesto_model_1.default.build(body);
        yield puesto.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = puesto;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idPuesto: resultCreate.null,
            clave: resultCreate.clave,
            nombre: resultCreate.nombre,
            descripcion: resultCreate.descripcion,
            idDepartamento: resultCreate.fk_idDepartamento,
            estatus: resultCreate.estatus,
            createdAt: resultCreate.createdAt,
            updatedAt: resultCreate.updatedAt
        };
        response.json({
            resultado: resultCreate,
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
exports.createPuesto = createPuesto;
const updatePuesto = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idPuesto'
        if (!body.idPuesto) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idPuesto es requerido'
            });
        }
        const puesto = yield puesto_model_1.default.findByPk(body.idPuesto);
        //Si no existe registro del idPuesto proporcionado
        if (!puesto) {
            return response.status(404).json({
                data: puesto,
                success: false,
                message: 'No existe registro con el id ' + body.idPuesto
            });
        }
        yield puesto.update(body);
        response.json({
            data: puesto,
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
exports.updatePuesto = updatePuesto;
const updateEstatusPuesto = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idPuesto = Number(request.params.idPuesto);
    const estatus = request.query.estatus;
    if (isNaN(idPuesto)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idPuesto no es un valor válido'
        });
    }
    const puesto = yield puesto_model_1.default.findByPk(idPuesto);
    if (!puesto) {
        return response.status(404).json({
            data: puesto,
            success: false,
            message: 'No existe registro con el id ' + idPuesto
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
        puesto.update({ estatus: false });
    }
    else if (estatus == 'false') {
        //Si el estatus viene con valor 'false' habilita el registro
        puesto.update({ estatus: true });
    }
    else {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El valor del estatus no es válido (true o false)'
        });
    }
    response.json({
        data: puesto,
        success: true,
        message: 'Estatus actualizado correctamente',
    });
});
exports.updateEstatusPuesto = updateEstatusPuesto;
// export const disablePuesto = async (request: Request, response: Response) => {
//   const idPuesto = Number(request.params.idPuesto);
//   if (isNaN(idPuesto))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idPuesto no es un valor válido'
//     });
//   }
//   const puesto = await Puesto.findByPk(idPuesto);
//   if (!puesto)
//   {
//     return response.status(404).json({
//       data: puesto,
//       success: false,
//       message: 'No existe registro con el id ' + idPuesto
//     });
//   }
//   //Para dar baja lógica a un registro (Update estatus)
//   await puesto.update({ estatus: false });
//   response.json({
//     data: puesto,
//     success:  true,
//     message: 'Estatus actualizado correctamente',
//   });
// }
//# sourceMappingURL=puestos.controller.js.map