// nodes.js
const {sequelize} = require('../connection.js'); // Importa la conexión a la BD
const { DataTypes } = require('sequelize');

const Nodes = sequelize.define('Nodes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ip: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  calle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  codpostal: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  provincia: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  localidad: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'nodes',
  timestamps: false, 
});

module.exports = { Nodes };
