// sensorData.js
const sequelize = require('../connection.js');
const { DataTypes } = require('sequelize');

const SensorData = sequelize.define('SensorData', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_sensor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sensors',
      key: 'id',
    },
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  valor: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  unidades: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'sensordata',
  timestamps: false,
});

module.exports = { SensorData };
