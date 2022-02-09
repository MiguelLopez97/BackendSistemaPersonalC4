import { DataTypes } from 'sequelize';
import database from '../db/connection';

const users = database.define('users', {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  NameUser: {
    type: DataTypes.STRING
  },
  PassUser: {
    type: DataTypes.STRING
  },
  UserRol: {
    type: DataTypes.STRING
  },
  estatus: {
      type: DataTypes.BOOLEAN
  }
});

// users.methods.toJSON = function() {
//   const {  idUser, ...usuario  } = this.toObject();
//   usuario.uid = idUser;
//   return usuario;
// }

export default users;