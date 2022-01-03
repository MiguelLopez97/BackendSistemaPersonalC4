import { DataTypes } from 'sequelize';
import database from '../db/connection';

const HorarioEmpleados = database.define('horariosempleados', {
  idHorarioEmpleado: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fk_idEmpleado: {
    type: DataTypes.INTEGER
  },
  mes: {
    type: DataTypes.INTEGER
  },
  anio: {
    type: DataTypes.INTEGER
  },
  1: {
    type: DataTypes.INTEGER
  },
  2: {
    type: DataTypes.INTEGER
  },
  3: {
    type: DataTypes.INTEGER
  },
  4: {
    type: DataTypes.INTEGER
  },
  5: {
    type: DataTypes.INTEGER
  },
  6: {
    type: DataTypes.INTEGER
  },
  7: {
    type: DataTypes.INTEGER
  },
  8: {
    type: DataTypes.INTEGER
  },
  9: {
    type: DataTypes.INTEGER
  },
  10: {
    type: DataTypes.INTEGER
  },
  11: {
    type: DataTypes.INTEGER
  },
  12: {
    type: DataTypes.INTEGER
  },
  13: {
    type: DataTypes.INTEGER
  },
  14: {
    type: DataTypes.INTEGER
  },
  15: {
    type: DataTypes.INTEGER
  },
  16: {
    type: DataTypes.INTEGER
  },
  17: {
    type: DataTypes.INTEGER
  },
  18: {
    type: DataTypes.INTEGER
  },
  19: {
    type: DataTypes.INTEGER
  },
  20: {
    type: DataTypes.INTEGER
  },
  21: {
    type: DataTypes.INTEGER
  },
  22: {
    type: DataTypes.INTEGER
  },
  23: {
    type: DataTypes.INTEGER
  },
  24: {
    type: DataTypes.INTEGER
  },
  25: {
    type: DataTypes.INTEGER
  },
  26: {
    type: DataTypes.INTEGER
  },
  27: {
    type: DataTypes.INTEGER
  },
  28: {
    type: DataTypes.INTEGER
  },
  29: {
    type: DataTypes.INTEGER
  },
  30: {
    type: DataTypes.INTEGER
  },
  31: {
    type: DataTypes.INTEGER
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default HorarioEmpleados;