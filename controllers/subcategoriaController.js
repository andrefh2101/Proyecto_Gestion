// controllers/subcategoriaController.js
const Subcategoria = require('../models/subcategoriaModel');
const templates = require("../helpers/subcategoriaTemplates");
const db = require('../config/db');

const subcategoriaController = {

  getSubcategoriasByArea: async (req, res) => {
    try {
      const areaId = req.params.areaId;
      const subcategorias = await Subcategoria.getByAreaId(areaId);
      res.json(subcategorias);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener subcategorías");
    }
  },

  createSubcategoria: async (req, res) => {
    const conn = await db.getConnection();

    try {
      const { area_conocimiento_id, nombre_subcategoria_id } = req.body;

      if (!area_conocimiento_id || !nombre_subcategoria_id) {
        return res.status(400).json({ message: "Datos incompletos" });
      }

      const existe = await Subcategoria.existe(
        area_conocimiento_id,
        nombre_subcategoria_id
      );

      if (existe) {
        return res.status(400).json({
          message: "La subcategoría ya está registrada en esta área."
        });
      }

      await conn.beginTransaction();

      // 1️⃣ Crear subcategoría
      const [result] = await conn.query(
        `INSERT INTO subcategorias (area_conocimiento_id, nombre_subcategoria_id)
         VALUES (?, ?)`,
        [area_conocimiento_id, nombre_subcategoria_id]
      );

      const subcategoriaId = result.insertId;

      // 2️⃣ Cargar plantilla
      const plantilla = templates[nombre_subcategoria_id];

      if (plantilla) {

        for (const nombre of plantilla.entradas) {
          await conn.query(
            `INSERT INTO entradas_subcategoria (subcategoria_id, nombre)
             VALUES (?, ?)`,
            [subcategoriaId, nombre]
          );
        }

        for (const nombre of plantilla.herramientas) {
          await conn.query(
            `INSERT INTO herramientas_tecnicas_subcategoria (subcategoria_id, nombre)
             VALUES (?, ?)`,
            [subcategoriaId, nombre]
          );
        }

        for (const nombre of plantilla.salidas) {
          await conn.query(
            `INSERT INTO salidas_subcategoria (subcategoria_id, nombre)
             VALUES (?, ?)`,
            [subcategoriaId, nombre]
          );
        }
      }

      await conn.commit();

      res.status(201).json({
        message: "Subcategoría creada con entradas, herramientas y salidas",
        subcategoria_id: subcategoriaId
      });

    } catch (error) {
      await conn.rollback();
      console.error("❌ Error creando subcategoría:", error);
      res.status(500).json({ message: "Error al crear subcategoría" });
    } finally {
      conn.release();
    }
  },

  getSubcategoriasDisponibles: async (req, res) => {
    try {
      const areaId = req.params.areaId;
      const subcategorias = await Subcategoria.getDisponibles(areaId);
      res.json(subcategorias);

    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener subcategorías disponibles");
    }
  },

  deleteSubcategoria: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Subcategoria.delete(id);

      if (deleted.affectedRows === 0) {
        return res.status(404).json({ message: "Subcategoría no encontrada" });
      }

      res.json({ message: "Subcategoría eliminada correctamente" });

    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar subcategoría");
    }
  },

  getSubcategoriaDetalle: async (req, res) => {
    try {
      const { id } = req.params;
      const sub = await Subcategoria.getById(id);

      if (!sub) return res.status(404).json({ message: "Subcategoría no encontrada" });

      res.json(sub);

    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener detalle");
    }
  },

  getEntradas: async (req, res) => {
    try {
      const entradas = await Subcategoria.getEntradas(req.params.id);
      res.json(entradas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener entradas");
    }
  },

  getHerramientas: async (req, res) => {
    try {
      const herramientas = await Subcategoria.getHerramientas(req.params.id);
      res.json(herramientas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener herramientas");
    }
  },

  getSalidas: async (req, res) => {
    try {
      const salidas = await Subcategoria.getSalidas(req.params.id);
      res.json(salidas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener salidas");
    }
  },

  // =============================
  //  NUEVAS FUNCIONES DIRECTAS A BD
  // =============================

getSubcategoriaById: async (req, res) => {
  try {
    db.query(
      "SELECT * FROM nombre_subcategorias WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) {
          console.error("ERROR EN getSubcategoriaById:", err);
          return res.status(500).json({ message: err.message });
        }

        if (rows.length === 0)
          return res.status(404).json({ message: "No encontrada" });

        res.json(rows[0]);
      }
    );
  } catch (error) {
    console.error("ERROR EN getSubcategoriaById:", error);
    res.status(500).json({ message: error.message });
  }
},


getEntradasBySubcategoria: async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, nombre FROM entradas_subcategoria WHERE subcategoria_id = ?",
      [req.params.id]
    );

    res.json(rows);
  } catch (error) {
    console.error("ERROR en Entradas:", error);
    res.status(500).json({ message: error.message });
  }
},

getHerramientasBySubcategoria: async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, nombre FROM herramientas_tecnicas_subcategoria WHERE subcategoria_id = ?",
      [req.params.id]
    );

    res.json(rows);
  } catch (error) {
    console.error("ERROR en Herramientas:", error);
    res.status(500).json({ message: error.message });
  }
},

getSalidasBySubcategoria: async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, nombre FROM salidas_subcategoria WHERE subcategoria_id = ?",
      [req.params.id]
    );

    res.json(rows);
  } catch (error) {
    console.error("ERROR en Salidas:", error);
    res.status(500).json({ message: error.message });
  }
}



};

module.exports = subcategoriaController;
