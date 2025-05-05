const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('aquadomus', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

module.exports = sequelize; 
