const express = require("express");
const router = express.Router();
const subcategoriaController = require("../controllers/subcategoriaController");

router.post("/", subcategoriaController.createSubcategoria);

router.get("/:areaId/subcategorias", subcategoriaController.getSubcategoriasByArea);
router.get("/:areaId/subcategorias-disponibles", subcategoriaController.getSubcategoriasDisponibles);

router.delete("/:id", subcategoriaController.deleteSubcategoria);

router.get("/:id", subcategoriaController.getSubcategoriaById);
router.get("/:id/entradas", subcategoriaController.getEntradas);
router.get("/:id/herramientas", subcategoriaController.getHerramientas);
router.get("/:id/salidas", subcategoriaController.getSalidas);
router.post("/subcategorias/porcentaje", subcategoriaController.updatePorcentaje);


module.exports = router;
