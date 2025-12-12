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
  }

};

module.exports = Salida;
