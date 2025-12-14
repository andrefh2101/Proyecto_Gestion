// models/herramientaModel.js
const db = require('../config/db');

const Herramienta = {

  // Obtener herramientas por subcategoría
  async getBySubcategoriaId(subcategoria_id) {
    const query = `
      SELECT *
      FROM herramientas
      WHERE subcategoria_id = ?
    `;
    
    try {
      const [results] = await db.query(query, [subcategoria_id]);
      return results;
    } catch (err) {
      throw err; // Re-lanzamos el error
    }
  },

  async create(subcategoria_id, nombre) {
    const query = `
      INSERT INTO herramientas_tecnicas_subcategoria (subcategoria_id, nombre)
      VALUES (?, ?)
    `;
    const [result] = await db.query(query, [subcategoria_id, nombre]);
    return result.insertId;
  }

};

module.exports = Herramienta;
