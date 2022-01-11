import { Sequelize } from 'sequelize';

//Parámetros para el Sequelize ("nombre_bd", "username", "password") 
//-----------------DESARROLLO --------------------------
// const database = new Sequelize('controldepersonal', 'Tobi', '1234', {
//   host: 'localhost',
//   dialect: 'mysql',
//   //logging: false
// });

//------------ PRODUCCIÓN -------------------------------
const database = new Sequelize('controldepersonal', 'personal', 'PersonalC4*', {
  host: '172.16.21.201',
  dialect: 'mysql',
  //logging: false
});

export default database;