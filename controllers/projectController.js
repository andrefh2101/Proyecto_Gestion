
// controllers/projectController.js
const Project = require('../models/projectModel');

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
  createProject: async (req, res) => {
    const { nombre } = req.body;
    const porcentaje_avance = 0; // El porcentaje de avance es siempre 0

    try {
      await Project.create(nombre, porcentaje_avance); // Crear el proyecto
      res.redirect('/proyectos'); // Redirigir a la página de proyectos después de crear el proyecto
    } catch (err) {
      console.error(err); // Ver el error en la consola si ocurre
      res.status(500).send('Error al crear el proyecto');
    }
  }
};

module.exports = projectController;
