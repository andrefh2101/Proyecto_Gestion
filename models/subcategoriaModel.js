// models/subcategoriaModel.js
const db = require('../config/db');

const Subcategoria = {

  create: (area_conocimiento_id, nombre_subcategoria_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO subcategorias (area_conocimiento_id, nombre_subcategoria_id)
        VALUES (?, ?)
      `;
      db.query(query, [area_conocimiento_id, nombre_subcategoria_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getByAreaId: (area_conocimiento_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.id AS subcategoria_id,
        ns.id AS nombre_subcategoria_id,
        ns.nombre
      FROM subcategorias s
      JOIN nombre_subcategorias ns ON ns.id = s.nombre_subcategoria_id
      WHERE s.area_conocimiento_id = ?
    `;
    db.query(query, [area_conocimiento_id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
},


  // Validar que no exista repetido
  existe: (area_conocimiento_id, nombre_subcategoria_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT id FROM subcategorias
        WHERE area_conocimiento_id = ? AND nombre_subcategoria_id = ?
      `;
      db.query(query, [area_conocimiento_id, nombre_subcategoria_id], (err, results) => {
        if (err) reject(err);
        resolve(results.length > 0);
      });
    });
  },

  // Subcategorías disponibles según el tipo del área
  getDisponibles: (areaId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT ns.id, ns.nombre
        FROM areas_conocimiento ac
        JOIN nombre_subcategorias ns ON ns.tipo_id = ac.tipo_id
        WHERE ac.id = ?
      `;
      db.query(query, [areaId], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  delete: (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM subcategorias
      WHERE id = ?
    `;
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
},

// Obtener detalle de la subcategoría
getById: (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
  ns.id AS nombre_subcategoria_id,
  ns.nombre
FROM subcategorias s
JOIN nombre_subcategorias ns 
  ON ns.id = s.nombre_subcategoria_id
WHERE s.id = ?
    `;
    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
}

,
// Obtener Entradas por subcategoría
getEntradas: (subcategoria_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, nombre
      FROM entradas_subcategoria
      WHERE subcategoria_id = ?
    `;
    db.query(query, [subcategoria_id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
},

// Obtener Herramientas por subcategoría
getHerramientas: (subcategoria_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, nombre
      FROM herramientas_tecnicas_subcategoria
      WHERE subcategoria_id = ?
    `;
    db.query(query, [subcategoria_id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
},

// Obtener Salidas por subcategoría
getSalidas: (subcategoria_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, nombre
      FROM salidas_subcategoria
      WHERE subcategoria_id = ?
    `;
    db.query(query, [subcategoria_id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}


};

module.exports = Subcategoria;
