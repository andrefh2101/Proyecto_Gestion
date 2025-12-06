// controllers/areaConocimientoController.js
const AreaConocimiento = require('../models/areaConocimientoModel');

const areaConocimientoController = {

  // Obtener áreas del proyecto
  getAreasByProject: async (req, res) => {
    try {
      const proyecto_id = req.params.proyectoId;
      const areas = await AreaConocimiento.getByProjectId(proyecto_id);
      res.json(areas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las áreas del proyecto");
    }
  },

  // Crear área de conocimiento con tipo_id
  createArea: async (req, res) => {
    try {
      const { tipo_id, proyecto_id } = req.body;
      await AreaConocimiento.create(tipo_id, proyecto_id);
      res.status(201).send({ message: "Área creada con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear el área de conocimiento");
    }
  },

  // Obtener tipos de área disponibles para un proyecto
  getAvailableAreas: async (req, res) => {
    try {
      const proyecto_id = req.params.proyectoId;

      const existentes = await AreaConocimiento.getTipoIdsByProjectId(proyecto_id);

      const disponibles = await AreaConocimiento.getTiposDisponibles(existentes);

      res.json(disponibles);

    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener áreas disponibles");
    }
  }

};

module.exports = areaConocimientoController;
