// models/salidaModel.js
const db = require('../config/db');

const Salida = {

  async getBySubcategoriaId(subcategoria_id) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM salidas WHERE subcategoria_id = ?`,
        [subcategoria_id]
      );
      return rows;
    } catch (error) {
      console.error("Error en Salida.getBySubcategoriaId:", error);
      throw error;
    }
  },

  async create(subcategoria_id, nombre) {
    const query = `
      INSERT INTO salidas_subcategoria (subcategoria_id, nombre)
      VALUES (?, ?)
    `;
    const [result] = await db.query(query, [subcategoria_id, nombre]);
    return result.insertId;
  }

};

module.exports = Salida;
