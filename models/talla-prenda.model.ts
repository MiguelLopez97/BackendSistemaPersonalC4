import { DataTypes } from 'sequelize';
import database from '../db/connection';

const TallasPrendas = database.define('tallasprendas', {
  idTallaPrenda: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fk_idEmpleado: {
    type: DataTypes.INTEGER
  },
  tallaCamisa: {
    type: DataTypes.STRING
  },
  tallaPantalon: {
    type: DataTypes.STRING
  },
  tallaFalda: {
    type: DataTypes.STRING
  },
  tallaZapato: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default TallasPrendas;