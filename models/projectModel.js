// models/projectModel.js
const db = require('../config/db');

const Project = {
  create: (name, percentage) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO proyectos (nombre, porcentaje_avance) VALUES (?, ?)';
      db.query(query, [name, percentage], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM proyectos';
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Project;