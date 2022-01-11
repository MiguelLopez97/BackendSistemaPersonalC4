import { DataTypes } from 'sequelize';
import database from '../db/connection';

const configuraciones = database.define('configuraciones', {
  idConfiguracion: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  uriImgLogo: {
    type: DataTypes.STRING
  },
  cantidadRetardos: {
    type: DataTypes.INTEGER
  }, 
  minConsiderarRetardo: {
    type: DataTypes.INTEGER
  },
  vacacionesC4: {
      type: DataTypes.INTEGER
  },
  vacacionesComisionados: {
      type: DataTypes.INTEGER
  },
  estatus: {
      type: DataTypes.BOOLEAN
  }
});

export default configuraciones;