const AreaConocimiento = require('../models/areaConocimientoModel');
const Subcategoria = require('../models/subcategoriaModel');
const Entrada = require('../models/entradaModel');
const Herramienta = require('../models/herramientaModel');
const Salida = require('../models/salidaModel');

const templates = require('../helpers/subcategoriaTemplates');

const crearEstructuraProyecto = async (proyectoId) => {

  console.log('🟢 Creando estructura para proyecto:', proyectoId);

  const areaId = await AreaConocimiento.create(5, proyectoId);
  console.log('🟢 Área creada ID:', areaId);

  const subcategorias = [1, 2, 3, 4, 5, 6];

  for (const nombreSubId of subcategorias) {

    const subcategoriaId = await Subcategoria.create(areaId, nombreSubId);
    console.log(`  🟡 Subcategoría creada ID: ${subcategoriaId}`);

    const template = templates[nombreSubId];
    if (!template) {
      console.warn('⚠️ No hay template para', nombreSubId);
      continue;
    }

    for (const entrada of template.entradas) {
      await Entrada.create(subcategoriaId, entrada);
      console.log('    ➕ Entrada:', entrada);
    }

    for (const herramienta of template.herramientas) {
      await Herramienta.create(subcategoriaId, herramienta);
      console.log('    🛠️ Herramienta:', herramienta);
    }

    for (const salida of template.salidas) {
      await Salida.create(subcategoriaId, salida);
      console.log('    📤 Salida:', salida);
    }
  }

  console.log('✅ Estructura creada correctamente');
};


module.exports = crearEstructuraProyecto;
