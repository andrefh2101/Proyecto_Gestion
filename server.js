// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");

const projectController = require("./controllers/projectController");
const Project = require("./models/projectModel");
const areaConocimientoController = require("./controllers/areaConocimientoController");
const subcategoriaController = require("./controllers/subcategoriaController");

const subcategoriaRoutes = require("./routes/subcategoriaRoutes");
const evaluacionRoutes = require("./routes/evaluacionRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const areasRoutes = require("./routes/areasRoutes");

const app = express();
const port = process.env.PORT || 3000;


/* ===============================
   BASE PATH (PKG SAFE)
================================ */
const BASE_PATH = process.pkg ? process.cwd() : __dirname;
const PUBLIC_PATH = path.join(BASE_PATH, "public");
const UPLOADS_PATH = path.join(BASE_PATH, "uploads", "evaluaciones");

/* ===============================
   CREAR CARPETAS REALES
================================ */
if (!fs.existsSync(UPLOADS_PATH)) {
  fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}

/* ===============================
   SECURITY
================================ */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

/* ===============================
   MIDDLEWARE
================================ */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* ===============================
   STATIC FILES (PKG SAFE)
================================ */
app.use(express.static(PUBLIC_PATH));
app.use("/uploads", express.static(path.join(BASE_PATH, "uploads")));

/* ===============================
   ROUTES
================================ */
app.use("/api/subcategorias", subcategoriaRoutes);
app.use("/api/evaluaciones", evaluacionRoutes);
app.use("/items", itemsRoutes);
app.use("/api/areas", areasRoutes);

/* ===============================
   API
================================ */
app.get("/api/proyectos", async (req, res) => {
  try {
    const proyectos = await Project.getAll();
    res.json(proyectos);
  } catch (err) {
    res.status(500).send("Error al obtener los proyectos");
  }
});

app.post("/api/proyectos", projectController.createProject);
app.delete("/api/proyectos/:id", projectController.deleteProject);
app.get("/proyectos", (req, res) => {
  res.redirect("/projects.html");
});
app.get("/api/proyectos/:proyectoId/areas", areaConocimientoController.getAreasByProject);
app.post("/api/areas", areaConocimientoController.createArea);
app.get("/api/proyectos/:proyectoId/areas-disponibles", areaConocimientoController.getAvailableAreas);
app.get("/api/areas/:areaId/subcategorias", subcategoriaController.getSubcategoriasByArea);
app.get("/api/areas/:areaId/subcategorias-disponibles", subcategoriaController.getSubcategoriasDisponibles);
app.post("/api/subcategorias", subcategoriaController.createSubcategoria);
app.delete("/api/subcategorias/:id", subcategoriaController.deleteSubcategoria);

/* ===============================
   SERVER
================================ */
const server = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

/* ===============================
   CLEAN SHUTDOWN
================================ */
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Servidor cerrado");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Servidor cerrado");
    process.exit(0);
  });
});
