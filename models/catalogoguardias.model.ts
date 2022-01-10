import { DataTypes } from 'sequelize';
import database from '../db/connection';

const catalogoguardias = database.define('catalogoguardias', {
  idGuardia: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  clave: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  }, 
  fk_idTipoGuardia: {
    type: DataTypes.INTEGER
  },
  estatus: {
    type: DataTypes.BOOLEAN  
  }
});

export default catalogoguardias;