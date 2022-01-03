import { DataTypes } from 'sequelize';
import database from '../db/connection';

const Carreras = database.define('carreras', {
  idCarrera: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  siglas: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default Carreras;