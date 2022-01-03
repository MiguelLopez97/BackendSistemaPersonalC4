"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const CatalogoHorarios = connection_1.default.define('catalogohorarios', {
    idCatalogoHorario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    clave: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    hora_entrada: {
        type: sequelize_1.DataTypes.STRING
    },
    hora_salida: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidadRetardo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    hora_entrada2: {
        type: sequelize_1.DataTypes.STRING
    },
    hora_salida2: {
        type: sequelize_1.DataTypes.STRING
    },
    fk_idTipoHorario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = CatalogoHorarios;
//# sourceMappingURL=catalogo-horarios.model.js.map