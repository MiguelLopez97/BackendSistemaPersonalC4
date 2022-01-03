import { DataTypes } from 'sequelize';
import database from '../db/connection';

const RecursosPago = database.define('recursospagos', {
  idRecursoPago: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default RecursosPago;