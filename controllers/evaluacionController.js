// controllers/evaluacionController.js
const multer = require("multer");
const path = require("path");
const Evaluacion = require("../models/evaluacionModel");

// -------------------------------------------
// CONFIGURACIÓN MULTER PARA ARCHIVOS
// -------------------------------------------
const storage = multer.diskStorage({
  destination: "public/evidencias",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });

// Exportamos multer para usarlo en la ruta
exports.upload = upload;

// -------------------------------------------
// LISTAR EVALUACIONES DE UNA SUBCATEGORIA
// -------------------------------------------
exports.getEvaluacionesBySubcategoria = async (req, res) => {
  try {
    const subcategoria_id = req.params.id;
    const proyecto_id = req.query.proyecto;

    const datos = await Evaluacion.getBySubcategoria(proyecto_id, subcategoria_id);
    res.json(datos);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// -------------------------------------------
// GUARDAR TODAS LAS EVALUACIONES DEL FORM
// -------------------------------------------
exports.guardarEvaluaciones = async (req, res) => {
  const proyectoId = req.body.proyecto_id;
  const subcategoriaId = req.body.subcategoria_id;

  try {
    const files = req.files || [];

    for (let key in req.body) {

      if (!key.startsWith("cumplio_")) continue;

      const [, tipo, itemId] = key.split("_");

      const cumplio = req.body[key] || "NO";
      const descripcion = req.body[`descripcion_${tipo}_${itemId}`] || null;
      const observaciones = req.body[`observaciones_${tipo}_${itemId}`] || null;

      // Buscar archivo correspondiente
      const fileObj = files.find(f => f.fieldname === `evidencia_${tipo}_${itemId}`);
      const evidencia_path = fileObj ? `/evidencias/${fileObj.filename}` : null;

      await Evaluacion.insert({
        proyecto_id: proyectoId,
        subcategoria_item_id: itemId,
        tipo,
        cumplio,
        descripcion,
        observaciones,
        evidencia_path
      });
    }

    res.json({ ok: true, message: "Evaluaciones guardadas correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

// -------------------------------------------
// LISTAR EVALUACIONES POR PROYECTO
// -------------------------------------------
exports.listarEvaluaciones = async (req, res) => {
  try {
    const { proyectoId, subcategoriaId } = req.params;
    const datos = await Evaluacion.listar(proyectoId, subcategoriaId);
    res.json(datos);
  } catch (err) {
    res.status(500).json(err);
  }
};
