// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { cyclicSensorsReading } = require("./main");
const routes = require("./routes/routes");
const { connectDB, sequelize } = require("./_database/connection");

const app = express();
const PORT = process.env.PORT || 5000;
const INTERVAL_TIME = 7000; // Definición de INTERVAL_TIME en el ámbito superior

app.use(express.json());
app.use(cors());

app.use("/", routes);

(async () => {
  try {
    await connectDB();
    await sequelize.sync();
    console.log("Base de datos conectada y modelos sincronizados.");

    await cyclicSensorsReading();
    setInterval(cyclicSensorsReading, INTERVAL_TIME);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en ${process.env.MYSQLHOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor o conectar a la base de datos:", error);
    // No necesitas usar INTERVAL_TIME aquí, ya que el servidor no se inició correctamente
  }
})();