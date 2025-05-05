// controller/nodeController.js
require("dotenv").config();
const { NodesRepository,} = require("../_database/repositories/nodesRepository.js");
const { handleCheck } = require("../utils/handleCheck.js");

// Obtiene los campos de la tabla 'nodes'
const getFields = async (req, res) => {
    await handleCheck(
        res,
        async () => {
            const fields = await NodesRepository.getFields();
            return fields || []; // Devuelve un array vacío si no hay campos
        },
        "Error al obtener los campos"
    );
};

// Obtiene todos los nodos
const getNodes = async (req, res) => {
    await handleCheck(
        res,
        async () => {
            const nodes = await NodesRepository.get();
            return nodes || []; // Devuelve un array vacío si no hay nodos
        },
        "Error al obtener nodos"
    );
};

// Obtiene los nodos de la red y devuelve un objeto con clave ID y valor IP
const getIps = async (req, res) => {
    await handleCheck(
        res,
        async () => {
            const nodes = await NodesRepository.get();
            if (!nodes || nodes.length === 0) {
                return {}; // Devuelve un objeto vacío si no hay nodos/IPs
            }
            const nodesData = nodes.reduce((acc, node) => {
                acc[node.id] = { ip: node.ip, name: node.nombre }; // Incluimos el nombre
                return acc;
            }, {});
            // console.log("Nodes con IPs y Nombres:", nodesData);
            return nodesData;
        },
        "Error al obtener los nodos con IPs"
    );
};


// Edita un nodo específico
const editNode = async (req, res) => {
    const { filters, updates } = req.body;
    console.log("editNode", "filters: ", filters, "updates: ", updates)
    if (!filters || !updates) {
        return res.status(400).json({ error: "Filtros y datos de actualización son requeridos" });
    }
    await handleCheck(
        res,
        async () => {
            // Actualiza el nodo basado en los filtros y los datos proporcionados
            const updatedNode = await NodesRepository.update(updates, filters);
            return { message: "Nodo actualizado correctamente", data: updatedNode };
        },
        "Error al actualizar el nodo"
    );
};


// Elimina un nodo
const deleteNode = async (req, res) => {
    const { id } = req.body;
    await handleCheck(
        res,
        async () => {
            console.log("Borrando nodo con ID:", id);
            const deleted = await NodesRepository.delete({ id });
            if (deleted === 0) {
                return { message: "No se encontró el nodo para eliminar" };
            }
            return { message: "Nodo eliminado correctamente" };
        },
        "Error al eliminar el nodo"
    );
};

// Inserta un nuevo nodo en la bdd con su IP y Token, y otros campos
const registerNode = async (req, res) => {
    const { ip, token, ...otherFields } = req.body;
    if (!ip || !token) {
        return res.status(400).json({ error: "IP y token son requeridos" });
    }
    await handleCheck(
        res,
        async () => {
            const existingNode = await NodesRepository.get({ ip });
            if (existingNode && existingNode.length > 0) {
                throw new Error("Esta IP ya está registrada.");
            }
            console.log("Insertando nuevo nodo", req.body);
            // Inserta dinámicamente todos los campos enviados en `req.body`
            const newNode = await NodesRepository.insert({
                ip,
                token,
                ...otherFields,
            });
            return { message: "IP y token registrados correctamente", data: newNode };
        },
        "Error al guardar IP y token"
    );
};

module.exports = { getNodes, getFields, getIps, registerNode, editNode, deleteNode };