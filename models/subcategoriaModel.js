// models/subcategoriaModel.js
const db = require('../config/db');

const Subcategoria = {

  // Crear una subcategoría
  async create(area_conocimiento_id, nombre_subcategoria_id) {
    const query = `
      INSERT INTO subcategorias (area_conocimiento_id, nombre_subcategoria_id)
      VALUES (?, ?)
    `;
    return await db.query(query, [area_conocimiento_id, nombre_subcategoria_id]);
  },

  // Obtener subcategorías de un área
  async getByAreaId(area_conocimiento_id) {
    const query = `
      SELECT 
        s.id AS subcategoria_id,
        ns.id AS nombre_subcategoria_id,
        ns.nombre
      FROM subcategorias s
      JOIN nombre_subcategorias ns ON ns.id = s.nombre_subcategoria_id
      WHERE s.area_conocimiento_id = ?
    `;
    const results = await db.query(query, [area_conocimiento_id]);
    return results;
  },

  // Validar que no exista duplicado
  async existe(area_conocimiento_id, nombre_subcategoria_id) {
    const query = `
      SELECT id FROM subcategorias
      WHERE area_conocimiento_id = ? AND nombre_subcategoria_id = ?
    `;
    const results = await db.query(query, [
      area_conocimiento_id,
      nombre_subcategoria_id
    ]);

    return results.length > 0;
  },

  // Subcategorías disponibles según el tipo del área
  async getDisponibles(areaId) {
    const query = `
      SELECT ns.id, ns.nombre
      FROM areas_conocimiento ac
      JOIN nombre_subcategorias ns ON ns.tipo_id = ac.tipo_id
      WHERE ac.id = ?
    `;
    return await db.query(query, [areaId]);
  },

  // Eliminar subcategoría
  async delete(id) {
    const query = `
      DELETE FROM subcategorcias
      WHERE id = ?
    `;
    return await db.query(query, [id]);
  },

  // Obtener detalle por ID
  async getById(id) {
    const query = `
      SELECT 
        ns.id AS nombre_subcategoria_id,
        ns.nombre
      FROM subcategorias s
      JOIN nombre_subcategorias ns 
        ON ns.id = s.nombre_subcategoria_id
      WHERE s.id = ?
    `;
    const results = await db.query(query, [id]);
    return results[0];
  },

  // Entradas por subcategoría
  async getEntradas(subcategoria_id) {
    const query = `
      SELECT id, nombre
      FROM entradas_subcategoria
      WHERE subcategoria_id = ?
    `;
    return await db.query(query, [subcategoria_id]);
  },

  // Herramientas por subcategoría
  async getHerramientas(subcategoria_id) {
    const query = `
      SELECT id, nombre
      FROM herramientas_tecnicas_subcategoria
      WHERE subcategoria_id = ?
    `;
    return await db.query(query, [subcategoria_id]);
  },

  // Salidas por subcategoría
  async getSalidas(subcategoria_id) {
    const query = `
      SELECT id, nombre
      FROM salidas_subcategoria
      WHERE subcategoria_id = ?
    `;
    return await db.query(query, [subcategoria_id]);
  }

};

module.exports = Subcategoria;
