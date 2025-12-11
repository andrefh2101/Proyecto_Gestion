// models/itemsModel.js
const mysql = require("mysql2/promise");

// Conexión pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tu_base",
});

// =========================================================
// OBTENER ENTRADAS, HERRAMIENTAS/TÉCNICAS Y SALIDAS POR SUBCATEGORÍA
// =========================================================
async function getBySubcategoria(subcategoria_id) {
    try {
        // Entradas
        const [entradas] = await pool.query(
            "SELECT id, nombre FROM entradas_subcategoria WHERE subcategoria_id = ?",
            [subcategoria_id]
        );

        // Herramientas y Técnicas
        const [herramientas] = await pool.query(
            "SELECT id, nombre FROM herramientas_tecnicas_subcategoria WHERE subcategoria_id = ?",
            [subcategoria_id]
        );

        // Salidas
        const [salidas] = await pool.query(
            "SELECT id, nombre FROM salidas_subcategoria WHERE subcategoria_id = ?",
            [subcategoria_id]
        );

        return {
            entradas,
            herramientas,
            salidas
        };
    } catch (error) {
        console.error("Error en itemsModel.getBySubcategoria:", error);
        throw error;
    }
}

// =========================================================
// EXPORTACIÓN
// =========================================================
module.exports = {
    getBySubcategoria
};
