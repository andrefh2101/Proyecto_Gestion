// models/entradaModel.js
const db = require('../config/db');

const Entrada = {

  async getBySubcategoriaId(subcategoria_id) {
    const query = `
      SELECT *
      FROM entradas
      WHERE subcategoria_id = ?
    `;

    const results = await db.query(query, [subcategoria_id]);
    return results;
  },

  create: async (subcategoriaId, nombre) => {
    const sql = `
      INSERT INTO entradas_subcategoria (subcategoria_id, nombre)
      VALUES (?, ?)
    `;
    const [result] = await db.query(sql, [subcategoriaId, nombre]);
    return result.insertId;
  }

};

module.exports = Entrada;
