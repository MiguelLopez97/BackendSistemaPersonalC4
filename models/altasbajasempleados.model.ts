import { DataTypes } from 'sequelize';
import database from '../db/connection';

const altasbajasempleados = database.define('altasbajasempleados', {
  idaltasBajasEmpleados: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fk_idEmpleado: {
    type: DataTypes.INTEGER
  },
  fecha: {
    type: DataTypes.DATE
  }, 
  tipo: {
    type: DataTypes.BOOLEAN
  }
});

export default altasbajasempleados;