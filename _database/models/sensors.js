// sensors.js
const {sequelize} = require('../connection.js');
const { DataTypes } = require('sequelize');

const Sensors = sequelize.define('Sensors', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_registro: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'nodes', // Nombre de la tabla referenciada
      key: 'id'
    }
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  dispositivo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ubicacion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  coordX: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
  },
  coordY: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
  },
}, {
  tableName: 'sensors',
  timestamps: false,
});

module.exports = { Sensors };
