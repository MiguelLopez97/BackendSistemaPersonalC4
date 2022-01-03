import { DataTypes } from 'sequelize';
import database from '../db/connection';

const Puesto = database.define('puestos', {
  idPuesto: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  clave: {
    type: DataTypes.STRING
  },
  nombre: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  fk_idDepartamento: {
    type: DataTypes.INTEGER,
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default Puesto;