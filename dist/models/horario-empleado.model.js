"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const HorarioEmpleados = connection_1.default.define('horariosempleados', {
    idHorarioEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    fk_idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    mes: {
        type: sequelize_1.DataTypes.INTEGER
    },
    anio: {
        type: sequelize_1.DataTypes.INTEGER
    },
    1: {
        type: sequelize_1.DataTypes.INTEGER
    },
    2: {
        type: sequelize_1.DataTypes.INTEGER
    },
    3: {
        type: sequelize_1.DataTypes.INTEGER
    },
    4: {
        type: sequelize_1.DataTypes.INTEGER
    },
    5: {
        type: sequelize_1.DataTypes.INTEGER
    },
    6: {
        type: sequelize_1.DataTypes.INTEGER
    },
    7: {
        type: sequelize_1.DataTypes.INTEGER
    },
    8: {
        type: sequelize_1.DataTypes.INTEGER
    },
    9: {
        type: sequelize_1.DataTypes.INTEGER
    },
    10: {
        type: sequelize_1.DataTypes.INTEGER
    },
    11: {
        type: sequelize_1.DataTypes.INTEGER
    },
    12: {
        type: sequelize_1.DataTypes.INTEGER
    },
    13: {
        type: sequelize_1.DataTypes.INTEGER
    },
    14: {
        type: sequelize_1.DataTypes.INTEGER
    },
    15: {
        type: sequelize_1.DataTypes.INTEGER
    },
    16: {
        type: sequelize_1.DataTypes.INTEGER
    },
    17: {
        type: sequelize_1.DataTypes.INTEGER
    },
    18: {
        type: sequelize_1.DataTypes.INTEGER
    },
    19: {
        type: sequelize_1.DataTypes.INTEGER
    },
    20: {
        type: sequelize_1.DataTypes.INTEGER
    },
    21: {
        type: sequelize_1.DataTypes.INTEGER
    },
    22: {
        type: sequelize_1.DataTypes.INTEGER
    },
    23: {
        type: sequelize_1.DataTypes.INTEGER
    },
    24: {
        type: sequelize_1.DataTypes.INTEGER
    },
    25: {
        type: sequelize_1.DataTypes.INTEGER
    },
    26: {
        type: sequelize_1.DataTypes.INTEGER
    },
    27: {
        type: sequelize_1.DataTypes.INTEGER
    },
    28: {
        type: sequelize_1.DataTypes.INTEGER
    },
    29: {
        type: sequelize_1.DataTypes.INTEGER
    },
    30: {
        type: sequelize_1.DataTypes.INTEGER
    },
    31: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = HorarioEmpleados;
//# sourceMappingURL=horario-empleado.model.js.map