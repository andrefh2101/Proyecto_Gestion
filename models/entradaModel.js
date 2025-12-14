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

  async create(subcategoria_id, nombre) {
    const query = `
      INSERT INTO herramientas_tecnicas_subcategoria (subcategoria_id, nombre)
      VALUES (?, ?)
    `;
    const [result] = await db.query(query, [subcategoria_id, nombre]);
    return result.insertId;
  }

};

module.exports = Entrada;
