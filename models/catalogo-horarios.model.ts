import { DataTypes } from 'sequelize';
import database from '../db/connection';

const CatalogoHorarios = database.define('catalogohorarios', {
  idCatalogoHorario: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  clave: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.STRING
  },
  color: {
    type: DataTypes.STRING
  },
  hora_entrada: {
    type: DataTypes.STRING
  },
  hora_salida: {
    type: DataTypes.STRING
  },
  cantidadRetardo: {
    type: DataTypes.INTEGER
  },
  hora_entrada2: {
    type: DataTypes.STRING
  },
  hora_salida2: {
    type: DataTypes.STRING
  },
  fk_idTipoHorario: {
    type: DataTypes.INTEGER
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default CatalogoHorarios;