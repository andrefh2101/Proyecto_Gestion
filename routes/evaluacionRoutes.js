// routes/evaluacionRoutes.js
const express = require("express");
const router = express.Router();
const evaluacionController = require("../controllers/evaluacionController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ===============================
// RUTA BASE REAL (COMPATIBLE CON .EXE)
// ===============================
const BASE_PATH = process.pkg
  ? process.cwd()              // cuando es .exe
  : path.join(__dirname, ".."); // cuando es node normal

const UPLOAD_PATH = path.join(BASE_PATH, "uploads", "evaluaciones");

// Crear carpeta real si no existe
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

// ===============================
// CONFIGURAR MULTER
// ===============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ===============================
// RUTAS
// ===============================
router.get(
  "/:proyecto_id/:subcategoria_id",
  evaluacionController.getBySubcategoria
);

router.post("/save", evaluacionController.save);

router.post(
  "/upload",
  upload.single("archivo"),
  evaluacionController.upload
);

router.get(
  "/porcentaje/:proyecto_id/:subcategoria_id",
  evaluacionController.getPorcentaje
);

router.get(
  "/progreso/:proyecto_id/:subcategoria_id",
  evaluacionController.getProgreso
);

router.post(
  "/porcentaje",
  evaluacionController.savePorcentaje
);

module.exports = router;
