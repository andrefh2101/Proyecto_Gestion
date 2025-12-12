
// controllers/evaluacionController.js
const evaluacionModel = require("../models/evaluacionModel");
const itemsModel = require("../models/itemsModel");
const path = require("path");
const fs = require("fs");

// =======================================================
// 1) OBTENER MATRIZ COMPLETA
// =======================================================
exports.getBySubcategoria = async (req, res) => {
    try {
        const { proyecto_id, subcategoria_id } = req.params;

        // Items (entradas, herramientas, salidas)
        const items = await itemsModel.getBySubcategoria(subcategoria_id);

        // Evaluaciones previas
        const evaluaciones = await evaluacionModel.getBySubcategoria(
            proyecto_id,
            subcategoria_id
        );

        // Mapeo clave item_id_tipo
        const evaluacionesMap = {};
        evaluaciones.forEach(ev => {
            const key = `${ev.item_id}_${ev.tipo}`;
            evaluacionesMap[key] = ev;
        });

        res.json({ items, evaluaciones: evaluacionesMap });

    } catch (error) {
        console.error("Error en getBySubcategoria:", error);
        res.status(500).json({ error: "Error al obtener datos" });
    }
};



// =======================================================
// 2) GUARDAR O ACTUALIZAR EVALUACIÓN (sin archivos)
// =======================================================
exports.save = async (req, res) => {
    try {
        const data = req.body;

        if (!data.proyecto_id || !data.subcategoria_id || !data.item_id || !data.tipo) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const result = await evaluacionModel.saveOrUpdate(data);
        res.json({ message: "Guardado correctamente", result });

    } catch (error) {
        console.error("Error en save:", error);
        res.status(500).json({ error: "Error al guardar" });
    }
};



// =======================================================
// 3) UPLOAD DE ARCHIVO DE EVIDENCIA
// =======================================================
exports.upload = async (req, res) => {
    try {
        const { 
            proyecto_id, 
            subcategoria_id, 
            item_id, 
            tipo,
            cumplio,
            descripcion,
            observaciones,
            fecha_cumplimiento
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "No se envió archivo" });
        }

        const evidencia_path = `/uploads/evaluaciones/${req.file.filename}`;

        await evaluacionModel.saveFile({
            proyecto_id,
            subcategoria_id,
            item_id,
            tipo,
            evidencia_path,
            cumplio,
            descripcion,
            observaciones,
            fecha_cumplimiento
        });

        res.json({
            message: "Archivo subido",
            evidencia_path
        });

    } catch (error) {
        console.error("Error en upload:", error);
        res.status(500).json({ error: "Error al subir archivo" });
    }
};

