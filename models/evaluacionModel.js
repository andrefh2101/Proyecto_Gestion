// models/evaluacionModel.js
const db = require("../config/db");

const Evaluacion = {

    // ===============================
    // 🔍 OBTENER EVALUACIONES
    // ===============================
    async getBySubcategoria(proyecto_id, subcategoria_id) {
        const sql = `
            SELECT *
            FROM evaluaciones
            WHERE proyecto_id = ? AND subcategoria_id = ?
        `;

        const [rows] = await db.query(sql, [proyecto_id, subcategoria_id]);
        return rows;
    },

    // ===============================
    // 📝 GUARDAR O ACTUALIZAR
    // ===============================
    async saveOrUpdate(data) {

        const checkSql = `
            SELECT id 
            FROM evaluaciones
            WHERE proyecto_id = ? 
              AND subcategoria_id = ? 
              AND item_id = ? 
              AND tipo = ?
        `;

        const [rows] = await db.query(checkSql, [
            data.proyecto_id,
            data.subcategoria_id,
            data.item_id,
            data.tipo
        ]);

        // 🔁 UPDATE
        if (rows.length > 0) {
            const updateSql = `
                UPDATE evaluaciones
                SET 
                    cumplio = ?,
                    descripcion = ?,
                    observaciones = ?,
                    fecha_cumplimiento = ?,
                    evidencia_path = ?
                WHERE id = ?
            `;

            await db.query(updateSql, [
                data.cumplio ?? null,
                data.descripcion ?? null,
                data.observaciones ?? null,
                data.fecha_cumplimiento ?? null,
                data.evidencia_path ?? null,
                rows[0].id
            ]);

            return { updated: true };
        }

        // ➕ INSERT
        const insertSql = `
            INSERT INTO evaluaciones
            (
                proyecto_id,
                subcategoria_id,
                item_id,
                tipo,
                cumplio,
                descripcion,
                observaciones,
                fecha_cumplimiento,
                evidencia_path
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(insertSql, [
            data.proyecto_id,
            data.subcategoria_id,
            data.item_id,
            data.tipo,
            data.cumplio ?? null,
            data.descripcion ?? null,
            data.observaciones ?? null,
            data.fecha_cumplimiento ?? null,
            data.evidencia_path ?? null
        ]);

        return { inserted: true };
    },

    async getPorcentaje(proyecto_id, subcategoria_id) {
    const sql = `
        SELECT 
            COUNT(*) AS total,
            SUM(cumplio = 1) AS cumplidos
        FROM evaluaciones
        WHERE proyecto_id = ? AND subcategoria_id = ?
    `;

    const [rows] = await db.query(sql, [proyecto_id, subcategoria_id]);

    const total = rows[0].total || 0;
    const cumplidos = rows[0].cumplidos || 0;

    const porcentaje = total === 0 ? 0 : Math.round((cumplidos / total) * 100);

    return porcentaje;
},

async getProgresoSubcategoria(proyecto_id, subcategoria_id) {
    const sql = `
        SELECT 
            COUNT(*) AS total,
            SUM(cumplio = 1) AS cumplidos
        FROM evaluaciones
        WHERE proyecto_id = ?
        AND subcategoria_id = ?
    `;

    const [rows] = await db.query(sql, [proyecto_id, subcategoria_id]);

    const total = rows[0].total || 0;
    const cumplidos = rows[0].cumplidos || 0;
    const porcentaje = total === 0 ? 0 : Math.round((cumplidos / total) * 100);

    return { total, cumplidos, porcentaje };
},

    // ===============================
    // 📂 GUARDAR ARCHIVO
    // ===============================
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

        const sql = `
            INSERT INTO evaluaciones
            (
                proyecto_id,
                subcategoria_id,
                item_id,
                tipo,
                evidencia_path,
                cumplio,
                descripcion,
                observaciones,
                fecha_cumplimiento
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                evidencia_path = VALUES(evidencia_path),
                cumplio = VALUES(cumplio),
                descripcion = VALUES(descripcion),
                observaciones = VALUES(observaciones),
                fecha_cumplimiento = VALUES(fecha_cumplimiento)
        `;

        await db.query(sql, [
            proyecto_id,
            subcategoria_id,
            item_id,
            tipo,
            evidencia_path,
            cumplio ?? null,
            descripcion ?? null,
            observaciones ?? null,
            fecha_cumplimiento ?? null
        ]);

        return { success: true, evidencia_path };
    }


    
};


module.exports = Evaluacion;
