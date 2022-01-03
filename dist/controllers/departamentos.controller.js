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
exports.updateEstatusDepartamento = exports.updateDepartamento = exports.createDepartamento = exports.getDepartamentoById = exports.getAllDepartamentos = void 0;
const departamento_model_1 = __importDefault(require("../models/departamento.model"));
const getAllDepartamentos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const departamentos = yield departamento_model_1.default.findAll();
    response.json({
        data: departamentos,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllDepartamentos = getAllDepartamentos;
const getDepartamentoById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idDepartamento = Number(request.params.idDepartamento);
    if (isNaN(idDepartamento)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idDepartamento no es un valor válido'
        });
    }
    const departamento = yield departamento_model_1.default.findByPk(idDepartamento);
    if (departamento) {
        response.json({
            data: departamento,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            data: departamento,
            success: false,
            message: 'No existe registro con el id ' + idDepartamento
        });
    }
});
exports.getDepartamentoById = getDepartamentoById;
const createDepartamento = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const departamento = departamento_model_1.default.build(body);
        yield departamento.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = departamento;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idDepartamento: resultCreate.null,
            nombre: resultCreate.nombre,
            claveDepartamento: resultCreate.claveDepartamento,
            descripcion: resultCreate.descripcion,
            extensionTelefono: resultCreate.extensionTelefono,
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
exports.createDepartamento = createDepartamento;
const updateDepartamento = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idDepartamento'
        if (!body.idDepartamento) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idDepartamento es requerido'
            });
        }
        const departamento = yield departamento_model_1.default.findByPk(body.idDepartamento);
        //Si no existe registro del idDepartamento proporcionado
        if (!departamento) {
            return response.status(404).json({
                data: departamento,
                success: false,
                message: 'No existe registro con el id ' + body.idDepartamento
            });
        }
        yield departamento.update(body);
        response.json({
            data: departamento,
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
exports.updateDepartamento = updateDepartamento;
const updateEstatusDepartamento = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idDepartamento = Number(request.params.idDepartamento);
    const estatus = request.query.estatus;
    if (isNaN(idDepartamento)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idDepartamento no es un valor válido'
        });
    }
    const departamento = yield departamento_model_1.default.findByPk(idDepartamento);
    if (!departamento) {
        return response.status(404).json({
            data: null,
            success: false,
            message: 'No existe registro con el id ' + idDepartamento
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
        departamento.update({ estatus: false });
    }
    else if (estatus == 'false') {
        //Si el estatus viene con valor 'false' habilita el registro
        departamento.update({ estatus: true });
    }
    else {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El valor del estatus no es válido (true o false)'
        });
    }
    response.json({
        data: departamento,
        success: true,
        message: 'Estatus actualizado correctamente'
    });
});
exports.updateEstatusDepartamento = updateEstatusDepartamento;
// export const disableDepartamento = async (request: Request, response: Response) => {
//   const idDepartamento = Number(request.params.idDepartamento);
//   if (isNaN(idDepartamento))
//   {
//     return response.status(500).json({
//       data: null,
//       success: false,
//       message: 'El idDepartamento no es un valor válido'
//     });
//   }
//   const departamento = await Departamento.findByPk(idDepartamento);
//   if (!departamento)
//   {
//     return response.status(404).json({
//       data: null,
//       success: false,
//       message: 'No existe registro con el id ' + idDepartamento
//     });
//   }
//   //Para dar baja lógica a un registro (Update estatus)
//   departamento.update({ estatus: false });
//   response.json({
//     data: departamento,
//     success: true,
//     message: 'Estatus actualizado correctamente'
//   });
// }
//# sourceMappingURL=departamentos.controller.js.map