const sequelize = require("../_database/connection.js"); // Ajusta según dónde tengas la conexión de MySQL
const { handleCheck } = require("../utils/handleCheck.js");

// Obtener tamaño total de la base de datos
const getDatabaseSize = async (req, res) => {
  const database = "aquadomus";
  console.log("Database size requested");

  await handleCheck(
    res,
    async () => {
      const [results] = await sequelize.query(`
        SELECT table_schema AS database_name,
               ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb
        FROM information_schema.tables
        WHERE table_schema = ?
        GROUP BY table_schema
      `, {
        replacements: [database],
        type: sequelize.QueryTypes.SELECT,
      });

      return {
        message: `Tamaño total de la base de datos ${database}`,
        data: results?.size_mb ?? 0
      };
    },
    "Error al obtener tamaño de la base de datos"
  );
};

// Obtener tamaño de una tabla específica
const getTableSize = async (req, res) => {
  const database = "aquadomus";
  const { tableDatabase } = req.query;

  // Validación de que la tabla es una tabla permitida
  const allowedTables = ["nodes", "sensors", "sensorData"];
  if (!allowedTables.includes(tableDatabase)) {
    return res.status(400).json({
      message: "Tabla no permitida",
    });
  }

  await handleCheck(
    res,
    async () => {
      const [results] = await sequelize.query(`
        SELECT table_name,
               ROUND((data_length + index_length) / 1024 / 1024, 2) AS size_mb
        FROM information_schema.tables
        WHERE table_schema = ? AND table_name = ?
      `, {
        replacements: [database, tableDatabase],
        type: sequelize.QueryTypes.SELECT,
      });

      return {
        message: `Tamaño de la tabla ${tableDatabase}`,
        data: results?.size_mb ?? 0
      };
    },
    "Error al obtener tamaño de la tabla"
  );
};

// Borrar todos los datos de una tabla específica
const deleteTableData = async (req, res) => {
  const { tableDatabase } = req.body;
  const allowedTables = ["nodes", "sensors", "sensorData"];

  await handleCheck(
    res,
    async () => {
      if (!allowedTables.includes(tableDatabase)) {
        throw new Error("Tabla no permitida.");
      }

      // ⚠️ Sequelize no permite reemplazo con `??`, así que concatenamos con precaución:
      await sequelize.query(`DELETE FROM ${tableDatabase}`);

      return {
        message: `Datos de la tabla ${tableDatabase} borrados correctamente.`,
        data: tableDatabase
      };
    },
    "Error al borrar datos de la tabla"
  );
};


module.exports = { getDatabaseSize, getTableSize, deleteTableData };
