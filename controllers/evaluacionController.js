const evaluacionModel = require("../models/evaluacionModel");
const itemsModel = require("../models/itemsModel");

// =======================================================
// 1) OBTENER MATRIZ COMPLETA
// =======================================================
exports.getBySubcategoria = async (req, res) => {
  try {
    const { proyecto_id, subcategoria_id } = req.params;

    const items = await itemsModel.getBySubcategoria(subcategoria_id);
    const evaluaciones = await evaluacionModel.getBySubcategoria(
      proyecto_id,
      subcategoria_id
    );

    const evaluacionesMap = {};

    evaluaciones.forEach(ev => {
      if (ev.fecha_cumplimiento) {
        ev.fecha_cumplimiento = ev.fecha_cumplimiento
          .toISOString()
          .split("T")[0];
      }

      const key = `${ev.item_id}_${ev.tipo}`;
      evaluacionesMap[key] = ev;
    });

    res.json({ items, evaluaciones: evaluacionesMap });

  } catch (error) {
    console.error("❌ Error en getBySubcategoria:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
};

// =======================================================
// 2) GUARDAR / ACTUALIZAR (SIN ARCHIVO)
// =======================================================
exports.save = async (req, res) => {
    try {
        console.log("📥 BODY RECIBIDO:", req.body);

        const data = req.body;

        if (!data.proyecto_id || !data.subcategoria_id || !data.item_id || !data.tipo) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const result = await evaluacionModel.saveOrUpdate(data);
        res.json({ message: "Guardado correctamente", result });

    } catch (error) {
        console.error("❌ Error en save:", error);
        res.status(500).json({ error: "Error al guardar" });
    }
};

// =======================================================
// 3) UPLOAD DE EVIDENCIA
// =======================================================
exports.upload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se envió archivo" });
        }

        const {
            proyecto_id,
            subcategoria_id,
            item_id,
            tipo,
            cumplio,
            descripcion,
            observaciones,
            fecha_cumplimiento
        } = req.body;

        const evidencia_path = `/uploads/evaluaciones/${req.file.filename}`;

        await evaluacionModel.saveFile({
            proyecto_id,
            subcategoria_id,
            item_id,
            tipo,
            evidencia_path,
            cumplio,
            descripcion,
            observaciones,
            fecha_cumplimiento
        });

        res.json({
            message: "Archivo subido correctamente",
            evidencia_path
        });

    } catch (error) {
        console.error("❌ Error en upload:", error);
        res.status(500).json({ error: "Error al subir archivo" });
    }
};

// =======================================================
// 4) PORCENTAJE
// =======================================================
exports.getPorcentaje = async (req, res) => {
    try {
        const { proyecto_id, subcategoria_id } = req.params;
        const porcentaje = await evaluacionModel.getPorcentaje(proyecto_id, subcategoria_id);
        res.json({ porcentaje });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener porcentaje" });
    }
};

// =======================================================
// 5) PROGRESO
// =======================================================
exports.getProgreso = async (req, res) => {
    try {
        const { proyecto_id, subcategoria_id } = req.params;
        const progreso = await evaluacionModel.getProgresoSubcategoria(proyecto_id, subcategoria_id);
        res.json(progreso);
    } catch (error) {
        console.error("Error progreso:", error);
        res.status(500).json({ error: "Error al calcular progreso" });
    }
};
