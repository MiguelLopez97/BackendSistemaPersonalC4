"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Empleados = connection_1.default.define('empleados', {
    idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    apPaterno: {
        type: sequelize_1.DataTypes.STRING
    },
    apMaterno: {
        type: sequelize_1.DataTypes.STRING
    },
    uriImgHuella: {
        type: sequelize_1.DataTypes.STRING
    },
    fk_idPuesto: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fk_idCorporacion: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fk_idRecursoPago: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fk_idGradoAcademico: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estadoCivil: {
        type: sequelize_1.DataTypes.STRING
    },
    fk_idCarrera: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fechaNacimiento: {
        type: sequelize_1.DataTypes.DATE
    },
    hijos: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    tipoSangre: {
        type: sequelize_1.DataTypes.STRING
    },
    cuip: {
        type: sequelize_1.DataTypes.STRING
    },
    curp: {
        type: sequelize_1.DataTypes.STRING
    },
    rfc: {
        type: sequelize_1.DataTypes.STRING
    },
    genero: {
        type: sequelize_1.DataTypes.STRING
    },
    certificadoVacunacion: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    numTelefonico: {
        type: sequelize_1.DataTypes.STRING
    },
    domicilioCompleto: {
        type: sequelize_1.DataTypes.STRING
    },
    vacaciones: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Empleados;
//# sourceMappingURL=empleado.model.js.map