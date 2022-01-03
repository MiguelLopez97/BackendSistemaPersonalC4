"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Puesto = connection_1.default.define('puestos', {
    idPuesto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    clave: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    fk_idDepartamento: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    estatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Puesto;
//# sourceMappingURL=puesto.model.js.map