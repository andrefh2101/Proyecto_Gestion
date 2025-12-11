// services/proyectoSetup.js
const AreaConocimiento = require("../models/areaConocimientoModel");
const Subcategoria = require("../models/subcategoriaModel");

async function crearEstructuraProyecto(proyecto_id) {
  try {
    // 1. Crear área con tipo_id = 5
    const area = await AreaConocimiento.create(5, proyecto_id);
    const area_id = area.insertId;

    // 2. Crear 6 subcategorías para esa área
    const subcategorias = [1, 2, 3, 4, 5, 6];

    for (const nombre_id of subcategorias) {
      await Subcategoria.create(area_id, nombre_id);
    }

    return true;

  } catch (err) {
    console.error("Error creando estructura automática:", err);
    throw err;
  }
}

module.exports = crearEstructuraProyecto;
