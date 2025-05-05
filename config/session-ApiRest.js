// session-ApiRest.js
require("dotenv").config();
const axios = require("axios");
const HA_PORT = "8123";

// Función para enviar peticiones a Home Assistant con la IP seleccionada
const sendRequest = async (method, selectedIP, selectedToken, endpoint, data = {}) => {
  try {
    if (!selectedIP) {
      console.error("IP no válida seleccionada");
    }
    // Construir la URL sin agregar "/" si endpoint es vacío
    let url = `http://${selectedIP}:${HA_PORT}/api/states`;
    if (endpoint && endpoint.trim() !== "") {
      url += `/${endpoint}`;
    }
    // console.log("selectedIP", selectedIP);
    // console.log("selectedToken", selectedToken);
    // console.log("method", method);
    // console.log("url", url);
    // console.log("data", data);

    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${selectedToken}`,
        "Content-Type": "application/json",
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error en la petición:",
      error.response?.data || error.message
    );
    throw error;
  }
};


module.exports = { sendRequest };
