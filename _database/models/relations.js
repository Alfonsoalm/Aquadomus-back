const { Actuators } = require("./actuators");
const { Nodes } = require("./nodes");
const { SensorData } = require("./sensorData");
const { Sensors } = require("./sensors");

// Un nodo (Nodes) tiene muchos sensores (Sensors)
Nodes.hasMany(Sensors, { foreignKey: 'id_registro' });
Sensors.belongsTo(Nodes, { foreignKey: 'id_registro' });

// Un nodo (Nodes) tiene muchos actuadores (Actuators)
Nodes.hasMany(Actuators, { foreignKey: 'id_registro' });
Actuators.belongsTo(Nodes, { foreignKey: 'id_registro' });

// Un sensor (Sensors) tiene muchos registros de datos (SensorData)
Sensors.hasMany(SensorData, { foreignKey: 'id_sensor' });
SensorData.belongsTo(Sensors, { foreignKey: 'id_sensor' });
