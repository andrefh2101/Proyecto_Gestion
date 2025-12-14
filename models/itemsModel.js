// models/itemsModel.js
const db = require("../config/db");

module.exports = {

    async getBySubcategoria(subcategoria_id) {
        try {
            const [entradas] = await db.query(
                "SELECT id, nombre, 'entrada' AS tipo FROM entradas_subcategoria WHERE subcategoria_id = ?",
                [subcategoria_id]
            );

            const [herramientas] = await db.query(
                "SELECT id, nombre, 'herramienta' AS tipo FROM herramientas_tecnicas_subcategoria WHERE subcategoria_id = ?",
                [subcategoria_id]
            );

            const [salidas] = await db.query(
                "SELECT id, nombre, 'salida' AS tipo FROM salidas_subcategoria WHERE subcategoria_id = ?",
                [subcategoria_id]
            );

            return [...entradas, ...herramientas, ...salidas];

        } catch (error) {
            console.error("❌ Error en itemsModel.getBySubcategoria:", error);
            throw error;
        }
    }

};
