const express = require("express");
const router = express.Router();
const subcategoriaController = require("../controllers/subcategoriaController");

// /api/subcategorias/:id
router.get("/:id", subcategoriaController.getSubcategoriaById);

// /api/subcategorias/:id/entradas
router.get("/:id/entradas", subcategoriaController.getEntradas);

// /api/subcategorias/:id/herramientas
router.get("/:id/herramientas", subcategoriaController.getHerramientas);

// /api/subcategorias/:id/salidas
router.get("/:id/salidas", subcategoriaController.getSalidas);

router.get("/:areaId/subcategorias", subcategoriaController.getSubcategoriasByArea);

router.get("/:areaId/subcategorias-disponibles", subcategoriaController.getSubcategoriasDisponibles);

module.exports = router;
