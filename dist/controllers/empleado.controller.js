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
exports.updateEstatusEmpleado = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleadoById = exports.getAllEmpleados = void 0;
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const getAllEmpleados = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const empleados = yield empleado_model_1.default.findAll();
    response.json({
        data: empleados,
        success: true,
        message: 'Datos obtenidos correctamente'
    });
});
exports.getAllEmpleados = getAllEmpleados;
const getEmpleadoById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmpleado = Number(request.params.idEmpleado);
    if (isNaN(idEmpleado)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idEmpleado no es un valor válido'
        });
    }
    const empleado = yield empleado_model_1.default.findByPk(idEmpleado);
    if (empleado) {
        response.json({
            data: empleado,
            success: true,
            message: 'Datos obtenidos correctamente'
        });
    }
    else {
        response.status(404).json({
            data: empleado,
            success: false,
            message: 'No existe registro con el id ' + idEmpleado
        });
    }
});
exports.getEmpleadoById = getEmpleadoById;
const createEmpleado = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        const empleado = empleado_model_1.default.build(body);
        yield empleado.save();
        //Guardamos el resultado de la consulta ejecutada
        const resultCreate = empleado;
        //Objeto con los datos creados para mandar como respuesta
        const dataCreated = {
            idEmpleado: resultCreate.null,
            nombre: resultCreate.nombre,
            apPaterno: resultCreate.apPaterno,
            apMaterno: resultCreate.apMaterno,
            uriImgHuella: resultCreate.uriImgHuella,
            fk_idPuesto: resultCreate.fk_idPuesto,
            fk_idCorporacion: resultCreate.fk_idCorporacion,
            fk_idRecursoPago: resultCreate.fk_idRecursoPago,
            fk_idGradoAcademico: resultCreate.fk_idGradoAcademico,
            estadoCivil: resultCreate.estadoCivil,
            fk_idCarrera: resultCreate.fk_idCarrera,
            fechaNacimiento: resultCreate.fechaNacimiento,
            hijos: resultCreate.hijos,
            tipoSangre: resultCreate.tipoSangre,
            cuip: resultCreate.cuip,
            curp: resultCreate.curp,
            rfc: resultCreate.rfc,
            genero: resultCreate.genero,
            certificadoVacunacion: resultCreate.certificadoVacunacion,
            correo: resultCreate.correo,
            numTelefonico: resultCreate.numTelefonico,
            domicilioCompleto: resultCreate.domicilioCompleto,
            vacaciones: resultCreate.vacaciones,
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
exports.createEmpleado = createEmpleado;
const updateEmpleado = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    try {
        //Si en el body del response no viene el 'idEmpleado'
        if (!body.idEmpleado) {
            return response.status(400).json({
                data: null,
                success: false,
                message: 'El idEmpleado es requerido'
            });
        }
        const empleado = yield empleado_model_1.default.findByPk(body.idEmpleado);
        //Si no existe registro del idEmpleado proporcionado
        if (!empleado) {
            return response.status(404).json({
                data: empleado,
                success: false,
                message: 'No existe registro con el id ' + body.idEmpleado
            });
        }
        yield empleado.update(body);
        response.json({
            data: empleado,
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
exports.updateEmpleado = updateEmpleado;
const updateEstatusEmpleado = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmpleado = Number(request.params.idEmpleado);
    const estatus = request.query.estatus;
    if (isNaN(idEmpleado)) {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El idEmpleado no es un valor válido'
        });
    }
    const empleado = yield empleado_model_1.default.findByPk(idEmpleado);
    if (!empleado) {
        return response.status(404).json({
            data: empleado,
            success: false,
            message: 'No existe registro con el id ' + idEmpleado
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
        empleado.update({ estatus: false });
    }
    else if (estatus == 'false') {
        //Si el estatus viene con valor 'false' habilita el registro
        empleado.update({ estatus: true });
    }
    else {
        return response.status(400).json({
            data: null,
            success: false,
            message: 'El valor del estatus no es válido (true o false)'
        });
    }
    response.json({
        data: empleado,
        success: true,
        message: 'Estatus actualizado correctamente',
    });
});
exports.updateEstatusEmpleado = updateEstatusEmpleado;
// export const disableEmpleado = async (request: Request, response: Response) => {
//   const idEmpleado = Number(request.params.idEmpleado);
//   if (isNaN(idEmpleado))
//   { 
//     return response.status(400).json({
//       data: null,
//       success: false,
//       message: 'El idEmpleado no es un valor válido'
//     });
//   }
//   const empleado = await Empleado.findByPk(idEmpleado);
//   if (!empleado)
//   {
//     return response.status(404).json({
//       data: empleado,
//       success: false,
//       message: 'No existe registro con el id ' + idEmpleado
//     });
//   }
//   //Para dar baja lógica a un registro (Update estatus)
//   await empleado.update({ estatus: false });
//   response.json({
//     data: empleado,
//     success:  true,
//     message: 'Estatus actualizado correctamente',
//   });
// }
//# sourceMappingURL=empleado.controller.js.map