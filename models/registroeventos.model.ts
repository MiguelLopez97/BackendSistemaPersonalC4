import { DataTypes } from 'sequelize';
import database from '../db/connection';

const registroeventos = database.define('registroeventos', {
  idRegistroEvento: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fk_idEvento: {
    type: DataTypes.INTEGER
  },
  fk_idEmpleado: {
    type: DataTypes.INTEGER
  },
  fecha: {
    type: DataTypes.DATE
  }, 
  justificacion: {
    type: DataTypes.STRING
  },
  uriDocumento: {
      type: DataTypes.STRING
  },
  estatus:{
      type: DataTypes.BOOLEAN
  }
});

export default registroeventos;