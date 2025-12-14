
// controllers/projectController.js
const Project = require('../models/projectModel');
const crearEstructuraProyecto = require('../services/proyectoSetup');
const AreaConocimiento = require('../models/areaConocimientoModel');
const Subcategoria = require('../models/subcategoriaModel');

const projectController = {
  // Muestra la página principal con los proyectos
  showHomePage: async (req, res) => {
    try {
      const proyectos = await Project.getAll(); // Obtener todos los proyectos
      res.render('home', { proyectos }); // Pasar los proyectos a la vista 'home.ejs'
    } catch (err) {
      console.error(err);  // Ver el error en la consola si ocurre
      res.status(500).send('Error al obtener los proyectos');
    }
  },

  // Crea un nuevo proyecto
  // controllers/projectController.js
createProject: async (req, res) => {
  console.log('🔥 ENTRO AL createProject DEL CONTROLLER WEB');

  const { nombre } = req.body;

  try {
    const proyectoId = await Project.create(nombre, 0);
    await crearEstructuraProyecto(proyectoId);

    res.status(201).json({
      ok: true,
      proyectoId
    });

  } catch (error) {
    console.error('❌ Error al crear proyecto:', error);
    res.status(500).json({
      ok: false,
      message: 'Error al crear el proyecto'
    });
  }
}

};

module.exports = projectController;
