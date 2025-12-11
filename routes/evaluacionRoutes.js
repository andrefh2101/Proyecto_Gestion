// routes/evaluacionRoutes.js
const express = require("express");
const router = express.Router();

const evaluacionController = require("../controllers/evaluacionController");

// -------------------------------------------
// RUTAS
// -------------------------------------------

// Obtener evaluaciones por subcategoría + proyecto
router.get("/subcategoria/:id", evaluacionController.getEvaluacionesBySubcategoria);

// Guardar TODAS las evaluaciones con archivos
router.post(
  "/evaluaciones/guardar",
  evaluacionController.upload.any(),   // <-- correctamente
  evaluacionController.guardarEvaluaciones
);

// Listar evaluaciones de un proyecto
router.get("/:proyectoId/:subcategoriaId", evaluacionController.listarEvaluaciones);

// Crear una evaluación individual

module.exports = router;
