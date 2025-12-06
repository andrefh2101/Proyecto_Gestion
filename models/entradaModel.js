const db = require('../config/db');

const Entrada = {
  getBySubcategoriaId: (subcategoria_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM entradas
        WHERE subcategoria_id = ?
      `;
      db.query(query, [subcategoria_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Entrada;
