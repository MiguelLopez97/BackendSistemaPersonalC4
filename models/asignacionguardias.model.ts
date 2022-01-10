import { DataTypes } from 'sequelize';
import database from '../db/connection';

const asignacionguardias = database.define('asignacionguardias', {
  idAsignacionGuardia: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fk_idEmpleado: {
    type: DataTypes.INTEGER
  },
  fk_idGuardia: {
    type: DataTypes.INTEGER
  }, 
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default asignacionguardias;