import { DataTypes } from 'sequelize';
import database from '../db/connection';

const GradosAcademicos = database.define('gradosacademicos', {
  idGradoAcademico: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  abreviatura: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default GradosAcademicos;