import { DataTypes } from 'sequelize';
import database from '../db/connection';

const Corporaciones = database.define('corporaciones', {
  idCorporacion: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  siglas: {
    type: DataTypes.STRING
  },
  direccion: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default Corporaciones;