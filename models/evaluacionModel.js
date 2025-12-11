// models/evaluacionModel.js
const db = require("../config/db");

module.exports = {

  // Obtener evaluaciones existentes (para mostrar en tablas)
  getBySubcategoria(proyecto_id, subcategoria_id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT e.*, si.nombre, si.tipo
        FROM evaluacion_subcategoria_items e
        JOIN subcategoria_items si ON si.id = e.subcategoria_item_id
        WHERE si.subcategoria_id = ? AND e.proyecto_id = ?
      `;

      db.query(sql, [subcategoria_id, proyecto_id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Guardar un item de evaluación
  insert(data) {
    return db.execute(
      `INSERT INTO evaluacion_subcategoria_items
        (proyecto_id, subcategoria_item_id, tipo, cumplio, descripcion, observaciones, fecha_cumplimiento, evidencia_path)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)`,
      [
        data.proyecto_id,
        data.subcategoria_item_id,
        data.tipo,
        data.cumplio,
        data.descripcion,
        data.observaciones,
        data.evidencia_path
      ]
    );
  },

  // Lista general por proyecto (opcional)
  listar(proyectoId) {
    return db.execute(
      `SELECT e.*, si.nombre, si.tipo
       FROM evaluacion_subcategoria_items e
       JOIN subcategoria_items si ON si.id = e.subcategoria_item_id
       WHERE e.proyecto_id = ?`,
      [proyectoId]
    ).then(r => r[0]);
  }

};
