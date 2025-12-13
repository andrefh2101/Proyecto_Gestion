const express = require("express");
const router = express.Router();
const subcategoriaController = require("../controllers/subcategoriaController");

router.get("/:areaId/subcategorias-disponibles", subcategoriaController.getSubcategoriasDisponibles);
router.get("/:areaId/subcategorias", subcategoriaController.getSubcategoriasByArea);

router.get("/:id/entradas", subcategoriaController.getEntradas);
router.get("/:id/herramientas", subcategoriaController.getHerramientas);
router.get("/:id/salidas", subcategoriaController.getSalidas);
router.get("/:id", subcategoriaController.getSubcategoriaById);
module.exports = router;
