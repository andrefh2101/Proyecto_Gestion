
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
  createProject: async (req, res) => {
    const { nombre } = req.body;
    const porcentaje_avance = 0;

    try {
      // 1. Crear proyecto
      const proyectoId = await Project.create(nombre, porcentaje_avance);

      // 2. Crear automáticamente área de conocimiento tipo 5
      const tipo_id = 5;
      const areaResult = await AreaConocimiento.create(tipo_id, proyectoId);
      const areaId = areaResult.insertId;

      // 3. Crear automáticamente subcategorías del 1 al 6
      const subcategoriasAuto = [1, 2, 3, 4, 5, 6];

      for (let nombre_subcategoria_id of subcategoriasAuto) {
        await Subcategoria.create(areaId, nombre_subcategoria_id);
      }

      console.log("Área de conocimiento y subcategorías creadas automáticamente");

      res.redirect('/proyectos');

    } catch (err) {
      console.error(err);
      res.status(500).send('Error al crear el proyecto');
    }
  }
};

module.exports = projectController;
