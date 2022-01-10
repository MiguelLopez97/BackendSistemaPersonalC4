import { DataTypes } from 'sequelize';
import database from '../db/connection';

const tiposguardias = database.define('tiposguardias', {
  idTipoGuardia: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  clave: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  cantidadGuardias: {
    type: DataTypes.INTEGER
  }, 
  diasDescanso: {
    type: DataTypes.INTEGER
  },
  cantidadTurnos: {
    type: DataTypes.INTEGER
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default tiposguardias;