const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno desde .env

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE.toString(), 
  process.env.MYSQLUSER.toString(), 
  process.env.MYSQLPASSWORD.toString(), 
  {
  host: process.env.MYSQLHOST.toString(),
  dialect: 'mysql',
  port: process.env.MYSQLPORT.toString(),
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos MySQL");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

module.exports = {sequelize, connectDB}; 
