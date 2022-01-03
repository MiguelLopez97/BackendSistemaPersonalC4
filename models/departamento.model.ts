import { DataTypes } from 'sequelize';
import database from '../db/connection';

const Departamento = database.define('departamentos', {
  idDepartamento: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  claveDepartamento: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  extensionTelefono: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default Departamento;