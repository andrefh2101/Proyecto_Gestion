// models/itemsModel.js
const db = require("../config/db");

module.exports = {

    // Obtener entradas, herramientas y salidas por subcategoría
    async getBySubcategoria(subcategoria_id) {
        try {
            // Entradas
            const [entradas] = await db.query(
                "SELECT id, nombre, 'entrada' AS tipo FROM entradas_subcategoria WHERE subcategoria_id = ?",
                [subcategoria_id]
            );

            // Herramientas / Técnicas
            const [herramientas] = await db.query(
                "SELECT id, nombre, 'herramienta' AS tipo FROM herramientas_tecnicas_subcategoria WHERE subcategoria_id = ?",
                [subcategoria_id]
            );

            // Salidas
            const [salidas] = await db.query(
                "SELECT id, nombre, 'salida' AS tipo FROM salidas_subcategoria WHERE subcategoria_id = ?",
                [subcategoria_id]
            );

            // Unificar todo en un solo array
            return [...entradas, ...herramientas, ...salidas];

        } catch (error) {
            console.error("Error en itemsModel.getBySubcategoria:", error);
            throw error;
        }
    }
};
