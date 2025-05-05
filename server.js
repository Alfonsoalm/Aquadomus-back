
// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { cyclicSensorsReading } = require("./main");
const routes = require("./routes/routes"); // Importa las rutas definidas

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Monta las rutas
app.use("/", routes);

// Inicia la función cíclica
cyclicSensorsReading();
const INTERVAL_TIME = 7000;
setInterval(cyclicSensorsReading, INTERVAL_TIME);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
