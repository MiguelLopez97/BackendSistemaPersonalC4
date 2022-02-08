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
  datosHorario: {
    type: DataTypes.TEXT
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default HorarioEmpleados;