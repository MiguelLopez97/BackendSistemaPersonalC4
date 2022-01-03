"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Parámetros para el Sequelize ("nombre_bd", "username", "password") 
//-----------------DESARROLLO --------------------------
const database = new sequelize_1.Sequelize('controldepersonal', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
});
//------------ PRODUCCIÓN -------------------------------
// const database = new Sequelize('controldepersonal', 'personal', 'PersonalC4*', {
//   // host: '172.16.21.201',
//   host: 'localhost',
//   dialect: 'mysql',
//   //logging: false
// });
exports.default = database;
//# sourceMappingURL=connection.js.map