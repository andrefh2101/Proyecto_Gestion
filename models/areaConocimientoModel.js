// models/areaConocimientoModel.js
const db = require('../config/db');

const AreaConocimiento = {

  // Crear un área
  create: async (tipo_id, proyecto_id) => {
    try {
      const sql = `
        INSERT INTO areas_conocimiento (tipo_id, proyecto_id)
        VALUES (?, ?)
      `;
      const [result] = await db.query(sql, [tipo_id, proyecto_id]);
      return result;
    } catch (err) {
      throw err;
    }
  },


  // Obtener los tipo_id que ya están asignados al proyecto
  getTipoIdsByProjectId: async (proyecto_id) => {
    try {
      const sql = `
        SELECT tipo_id FROM areas_conocimiento
        WHERE proyecto_id = ?
      `;
      const [rows] = await db.query(sql, [proyecto_id]);
      return rows.map(r => r.tipo_id);
    } catch (err) {
      throw err;
    }
  },


  // Obtener tipos de área que NO se han usado
  getTiposDisponibles: async (existentes) => {
    try {
      let sql = `
        SELECT id, nombre FROM tipo_area_conocimiento
      `;

      if (existentes.length > 0) {
        sql += ` WHERE id NOT IN (${existentes.join(",")})`;
      }

      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      throw err;
    }
  },


  // Obtener áreas de un proyecto con JOIN
  getByProjectId: async (proyecto_id) => {
    try {
      const sql = `
        SELECT ac.id, ac.proyecto_id, ac.tipo_id, t.nombre
        FROM areas_conocimiento ac
        JOIN tipo_area_conocimiento t ON ac.tipo_id = t.id
        WHERE ac.proyecto_id = ?
      `;
      const [rows] = await db.query(sql, [proyecto_id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }

};

module.exports = AreaConocimiento;
