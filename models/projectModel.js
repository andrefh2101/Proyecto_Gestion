// models/projectModel.js
const db = require('../config/db');

const Project = {

  // Crear proyecto
  create: async (name, percentage) => {
    try {
      const sql = `
        INSERT INTO proyectos (nombre, porcentaje_avance)
        VALUES (?, ?)
      `;
      
      const [result] = await db.query(sql, [name, percentage]);

      return result.insertId; // devuelve el ID creado
    } catch (err) {
      throw err;
    }
  },

  // Obtener todos los proyectos
  getAll: async () => {
    try {
      const sql = `SELECT * FROM proyectos`;
      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      throw err;
    }
  }

};

module.exports = Project;
