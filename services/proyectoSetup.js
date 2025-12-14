const AreaConocimiento = require('../models/areaConocimientoModel');
const Subcategoria = require('../models/subcategoriaModel');
const Entrada = require('../models/entradaModel');
const Herramienta = require('../models/herramientaModel');
const Salida = require('../models/salidaModel');

const templates = require('../helpers/subcategoriaTemplates');

const crearEstructuraProyecto = async (proyectoId) => {


  const areaId = await AreaConocimiento.create(5, proyectoId);

  const subcategorias = [1, 2, 3, 4, 5, 6];

  for (const nombreSubId of subcategorias) {

    const subcategoriaId = await Subcategoria.create(areaId, nombreSubId);

    const template = templates[nombreSubId];
    if (!template) {
      console.warn('⚠️ No hay template para', nombreSubId);
      continue;
    }

    for (const entrada of template.entradas) {
      await Entrada.create(subcategoriaId, entrada);
    }

    for (const herramienta of template.herramientas) {
      await Herramienta.create(subcategoriaId, herramienta);
    }

    for (const salida of template.salidas) {
      await Salida.create(subcategoriaId, salida);
    }
  }
};


module.exports = crearEstructuraProyecto;
