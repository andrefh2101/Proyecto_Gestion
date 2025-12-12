// routes/evaluacionRoutes.js
const express = require("express");
const router = express.Router();
const evaluacionController = require("../controllers/evaluacionController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ===============================
// CONFIGURAR UPLOAD
// ===============================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../uploads/evaluaciones");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
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
router.get("/:proyecto_id/:subcategoria_id", evaluacionController.getBySubcategoria);
router.post("/save", evaluacionController.save);
router.post("/upload", upload.single("archivo"), evaluacionController.upload);

module.exports = router;



