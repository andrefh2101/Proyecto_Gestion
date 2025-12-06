const db = require('../config/db');

const Salida = {
  getBySubcategoriaId: (subcategoria_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM salidas
        WHERE subcategoria_id = ?
      `;
      db.query(query, [subcategoria_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Salida;
