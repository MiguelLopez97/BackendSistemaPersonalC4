"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TallasPrendas = connection_1.default.define('tallasprendas', {
    idTallaPrenda: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    fk_idEmpleado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    tallaCamisa: {
        type: sequelize_1.DataTypes.STRING
    },
    tallaPantalon: {
        type: sequelize_1.DataTypes.STRING
    },
    tallaFalda: {
        type: sequelize_1.DataTypes.STRING
    },
    tallaZapato: {
        type: sequelize_1.DataTypes.STRING
    },
    estatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = TallasPrendas;
//# sourceMappingURL=talla-prenda.model.js.map