// models/evaluacionModel.js
const db = require("../config/db");

const Evaluacion = {

    // 🔍 Obtener evaluaciones previas
    async getBySubcategoria(proyecto_id, subcategoria_id) {
        const sql = `
            SELECT *
            FROM evaluaciones
            WHERE proyecto_id = ? AND subcategoria_id = ?
        `;

        const rows = await db.query(sql, [proyecto_id, subcategoria_id]);
        return rows;
    },

    // 📝 Guardar o Actualizar TODO (cumplio, descripcion, observaciones, fecha, evidencia)
    async saveOrUpdate(data) {

        // Verificar si ya existe el registro
        const checkSql = `
            SELECT id 
            FROM evaluaciones
            WHERE proyecto_id = ? AND subcategoria_id = ? AND item_id = ? AND tipo = ?
        `;

        const rows = await db.query(checkSql, [
            data.proyecto_id,
            data.subcategoria_id,
            data.item_id,
            data.tipo
        ]);

        // Si existe → UPDATE
        if (rows.length > 0) {
            const updateSql = `
                UPDATE evaluaciones
                SET cumplio = ?, descripcion = ?, observaciones = ?, fecha_cumplimiento = ?, evidencia_path = ?
                WHERE id = ?
            `;

            await db.query(updateSql, [
                data.cumplio,
                data.descripcion,
                data.observaciones,
                data.fecha_cumplimiento || null,
                data.evidencia_path || null,
                rows[0].id
            ]);

            return { updated: true };
        }

        // Si no existe → INSERT
        const insertSql = `
            INSERT INTO evaluaciones
            (proyecto_id, subcategoria_id, item_id, tipo, cumplio, descripcion, observaciones, fecha_cumplimiento, evidencia_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(insertSql, [
            data.proyecto_id,
            data.subcategoria_id,
            data.item_id,
            data.tipo,
            data.cumplio,
            data.descripcion,
            data.observaciones,
            data.fecha_cumplimiento || null,
            data.evidencia_path || null
        ]);

        return { inserted: true };
    },

    // 📂 Guardar SOLO archivo de evidencia (ON DUPLICATE KEY UPDATE)
   async saveFile({ 
    proyecto_id, 
    subcategoria_id, 
    item_id, 
    tipo, 
    evidencia_path,
    cumplio,
    descripcion,
    observaciones,
    fecha_cumplimiento
}) {

    const query = `
        INSERT INTO evaluaciones 
        (proyecto_id, subcategoria_id, item_id, tipo, evidencia_path, cumplio, descripcion, observaciones, fecha_cumplimiento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            evidencia_path = VALUES(evidencia_path),
            cumplio = VALUES(cumplio),
            descripcion = VALUES(descripcion),
            observaciones = VALUES(observaciones),
            fecha_cumplimiento = VALUES(fecha_cumplimiento)
    `;

    await db.query(query, [
        proyecto_id,
        subcategoria_id,
        item_id,
        tipo,
        evidencia_path,
        cumplio,
        descripcion,
        observaciones,
        fecha_cumplimiento
    ]);

    return { success: true, evidencia_path };
}
,

    // 🟦 Guardar evaluación SIN archivo (ON DUPLICATE)
    async save(data) {
        const query = `
        INSERT INTO evaluaciones 
        (proyecto_id, subcategoria_id, item_id, tipo, cumplio, descripcion, observaciones, fecha_cumplimiento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            cumplio = VALUES(cumplio),
            descripcion = VALUES(descripcion),
            observaciones = VALUES(observaciones),
            fecha_cumplimiento = VALUES(fecha_cumplimiento)
        `;

        await db.query(query, [
            data.proyecto_id,
            data.subcategoria_id,
            data.item_id,
            data.tipo,
            data.cumplio,
            data.descripcion,
            data.observaciones,
            data.fecha_cumplimiento
        ]);
    }

};

module.exports = Evaluacion;
