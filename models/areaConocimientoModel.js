// models/areaConocimientoModel.js
const db = require('../config/db');

const AreaConocimiento = {

  // Crear un área
  create: (tipo_id, proyecto_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO areas_conocimiento (tipo_id, proyecto_id)
        VALUES (?, ?)
      `;
      db.query(query, [tipo_id, proyecto_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  

  // Obtener los tipo_id que ya están asignados al proyecto
  getTipoIdsByProjectId: (proyecto_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT tipo_id FROM areas_conocimiento
        WHERE proyecto_id = ?
      `;
      db.query(query, [proyecto_id], (err, results) => {
        if (err) reject(err);
        resolve(results.map(r => r.tipo_id));
      });
    });
  },

  // Obtener tipos de área que aún no se han usado
  getTiposDisponibles: (existentes) => {
    return new Promise((resolve, reject) => {
      let query = `
        SELECT id, nombre FROM tipo_area_conocimiento
      `;

      if (existentes.length > 0) {
        query += ` WHERE id NOT IN (${existentes.join(",")})`;
      }

      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  // Obtener áreas de un proyecto con JOIN
  getByProjectId: (proyecto_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT ac.id, ac.proyecto_id, ac.tipo_id, t.nombre
        FROM areas_conocimiento ac
        JOIN tipo_area_conocimiento t ON ac.tipo_id = t.id
        WHERE ac.proyecto_id = ?
      `;
      db.query(query, [proyecto_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

};

module.exports = AreaConocimiento;
