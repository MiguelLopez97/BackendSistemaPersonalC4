import { DataTypes } from 'sequelize';
import database from '../db/connection';

const controlconfianza = database.define('controlconfianzas', {
  idControlConfianza: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fk_idEmpleado: {
    type: DataTypes.INTEGER
  },
  fecha: {
    type: DataTypes.DATE
  },
  resultado: {
    type: DataTypes.BOOLEAN
  }, 
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default controlconfianza;