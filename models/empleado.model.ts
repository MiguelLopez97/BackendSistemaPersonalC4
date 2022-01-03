import { DataTypes } from 'sequelize';
import database from '../db/connection';

const Empleados = database.define('empleados', {
  idEmpleado: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  apPaterno: {
    type: DataTypes.STRING
  },
  apMaterno: {
    type: DataTypes.STRING
  },
  uriImgHuella: {
    type: DataTypes.STRING
  },
  fk_idPuesto: {
    type: DataTypes.INTEGER
  },
  fk_idCorporacion: {
    type: DataTypes.INTEGER
  },
  fk_idRecursoPago: {
    type: DataTypes.INTEGER
  },
  fk_idGradoAcademico: {
    type: DataTypes.INTEGER
  },
  estadoCivil: {
    type: DataTypes.STRING
  },
  fk_idCarrera: {
    type: DataTypes.INTEGER
  },
  fechaNacimiento: {
    type: DataTypes.DATE
  },
  hijos: {
    type: DataTypes.BOOLEAN
  },
  tipoSangre: {
    type: DataTypes.STRING
  },
  cuip: {
    type: DataTypes.STRING
  },
  curp: {
    type: DataTypes.STRING
  },
  rfc: {
    type: DataTypes.STRING
  },
  genero: {
    type: DataTypes.STRING
  },
  certificadoVacunacion: {
    type: DataTypes.BOOLEAN
  },
  correo: {
    type: DataTypes.STRING
  },
  numTelefonico: {
    type: DataTypes.STRING
  },
  domicilioCompleto: {
    type: DataTypes.STRING
  },
  vacaciones: {
    type: DataTypes.INTEGER
  },
  estatus: {
    type: DataTypes.BOOLEAN
  }
});

export default Empleados;