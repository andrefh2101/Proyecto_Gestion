// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const projectController = require('./controllers/projectController');
const Project = require('./models/projectModel');
const helmet = require('helmet');  // Middleware para mejorar la seguridad
const areaConocimientoController = require('./controllers/areaConocimientoController');
const subcategoriaController = require('./controllers/subcategoriaController');
const subcategoriaRoutes = require("./routes/subcategoriaRoutes");
const router = express.Router();
const evaluacionRoutes = require("./routes/evaluacionRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const areasRoutes = require("./routes/areasRoutes");

const app = express();
const port = 3000;

// Middleware para agregar cabeceras CSP
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"], // Permitir solo el mismo dominio
    connectSrc: ["'self'", 'http://localhost:3000'], // Permitir conexiones al mismo dominio
    scriptSrc: ["'self'", "'unsafe-inline'"], // Permitir scripts solo desde el mismo dominio y permitir inline scripts
    styleSrc: ["'self'", "'unsafe-inline'"], // Permitir estilos solo desde el mismo dominio y estilos en línea
  },
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Agregar para aceptar solicitudes con JSON
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use("/api/subcategorias", subcategoriaRoutes);
app.use("/items", require("./routes/itemsRoutes"));
app.use(express.static("public"));
app.use("/api/evaluaciones", evaluacionRoutes);
app.use("/uploads/evidencias", express.static("uploads/evidencias"));
app.use("/api/areas", areasRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página estática de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para mostrar proyectos (sirviendo projects.html)
app.get('/proyectos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

// Ruta para obtener proyectos en formato JSON (API)
app.get('/api/proyectos', async (req, res) => {
  try {
    const proyectos = await Project.getAll();
    res.json(proyectos); // Enviar los proyectos como JSON
  } catch (err) {
    res.status(500).send('Error al obtener los proyectos');
  }
});
app.get('/areas.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'areas.html'));
});
app.get('/api/proyectos/:proyectoId/areas', areaConocimientoController.getAreasByProject);
app.post('/api/areas', areaConocimientoController.createArea);
app.get('/api/proyectos/:proyectoId/areas-disponibles', areaConocimientoController.getAvailableAreas);
app.get('/api/areas/:areaId/subcategorias-disponibles', subcategoriaController.getSubcategoriasDisponibles);
app.delete('/api/subcategorias/:id', subcategoriaController.deleteSubcategoria);

router.get("/:id", subcategoriaController.getSubcategoriaById);
router.get("/:id/entradas", subcategoriaController.getEntradasBySubcategoria);
router.get("/:id/herramientas", subcategoriaController.getHerramientasBySubcategoria);
router.get("/:id/salidas", subcategoriaController.getSalidasBySubcategoria);

// Ruta para crear proyectos (API)
app.post('/api/proyectos', async (req, res) => {
  const { nombre, porcentaje_avance } = req.body;
  try {
    await Project.create(nombre, porcentaje_avance); // Crear el proyecto en la base de datos
    res.status(201).send({ message: 'Proyecto creado con éxito' }); // Responder con un mensaje de éxito
  } catch (err) {
    res.status(500).send('Error al crear el proyecto');
  }
});
app.get('/api/areas/:areaId/subcategorias', subcategoriaController.getSubcategoriasByArea);
app.post('/api/subcategorias', subcategoriaController.createSubcategoria);

// Ruta para crear proyectos desde el formulario
app.post('/crear-proyecto', projectController.createProject, (req, res) => {
  // Redirigir al usuario a la página de proyectos después de la creación
  res.redirect('/proyectos');
});
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

