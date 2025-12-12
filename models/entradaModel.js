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
  }

};

module.exports = Entrada;
