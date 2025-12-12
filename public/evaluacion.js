// ==============================
// CAPTURA DE PARÁMETROS
// ==============================
const params = new URLSearchParams(window.location.search);
const proyecto_id = params.get("proyecto");
const subcategoria_id = params.get("subcategoria");

if (!proyecto_id || !subcategoria_id) {
    alert("Faltan parámetros en la URL");
}

const API = `/api/evaluaciones/${proyecto_id}/${subcategoria_id}`;

// Guardará todas las evaluaciones para acceso global
let evaluacionesMap = {};

document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});

// ==============================
// CARGAR MATRIZ
// ==============================
async function cargarDatos() {
    const res = await fetch(API);
    const data = await res.json();

    console.log("DATA RECIBIDA:", data);

    evaluacionesMap = data.evaluaciones;

    const entradas = data.items.filter(i => i.tipo === "entrada");
    const herramientas = data.items.filter(i => i.tipo === "herramienta");
    const salidas = data.items.filter(i => i.tipo === "salida");

    generarTabla("Entradas", entradas, "entrada");
    generarTabla("Herramientas / Técnicas", herramientas, "herramienta");
    generarTabla("Salidas", salidas, "salida");
}



// ==============================
// GENERAR TABLA
// ==============================
function generarTabla(titulo, lista, tipo) {
    if (!lista || lista.length === 0) return;

    let html = `
        <h3>${titulo}</h3>
        <table>
            <tr>
                <th>Ítem</th>
                <th>Cumplió</th>
                <th>Descripción</th>
                <th>Observaciones</th>
                <th>Fecha</th>
                <th>Evidencia</th>
            </tr>
    `;

    lista.forEach(item => {
        const key = `${item.id}_${item.tipo || tipo}`;

        const ev = evaluacionesMap[key] || {};

        html += `
            <tr data-id="${item.id}" data-tipo="${tipo}">
                <td>${item.nombre}</td>

                <td>
                    <select class="input-auto" data-field="cumplio">
                        <option value="">--</option>
                        <option value="1" ${ev.cumplio == 1 ? "selected" : ""}>Sí</option>
                        <option value="0" ${ev.cumplio == 0 ? "selected" : ""}>No</option>
                    </select>
                </td>

                <td>
                    <textarea class="input-auto" data-field="descripcion">${ev.descripcion || ""}</textarea>
                </td>

                <td>
                    <textarea class="input-auto" data-field="observaciones">${ev.observaciones || ""}</textarea>
                </td>

                <td>
                    <input 
                        type="date" 
                        class="input-auto" 
                        data-field="fecha_cumplimiento"
                        value="${ev.fecha_cumplimiento || ""}">
                </td>

                <td>
                    <input 
                        type="file" 
                        class="input-file" 
                        accept=".pdf,.png,.jpg,.jpeg">

                    ${
                        ev.evidencia_path
                        ? `<a href="${ev.evidencia_path}" target="_blank" style="display:block;color:green;">Ver evidencia</a>`
                        : ""
                    }
                </td>
            </tr>
        `;
    });

    html += `</table>`;
    document.getElementById("contenedorTablas").innerHTML += html;

    document.querySelectorAll(".input-auto").forEach(el => {
        el.addEventListener("change", guardarFila);
    });

    document.querySelectorAll(".input-file").forEach(el => {
        el.addEventListener("change", guardarArchivo);
    });
}



// ==============================
// GUARDAR INFORMACIÓN (TEXTOS)
// ==============================
async function guardarFila(e) {
    const tr = e.target.closest("tr");

    const data = {
        proyecto_id,
        subcategoria_id,
        item_id: tr.dataset.id,
        tipo: tr.dataset.tipo,
        cumplio: tr.querySelector('[data-field="cumplio"]').value,
        descripcion: tr.querySelector('[data-field="descripcion"]').value,
        observaciones: tr.querySelector('[data-field="observaciones"]').value,
        fecha_cumplimiento: tr.querySelector('[data-field="fecha_cumplimiento"]').value
    };

    await fetch("/api/evaluaciones/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}



// ==============================
// GUARDAR ARCHIVO (UPLOAD)
// ==============================
async function guardarArchivo(e) {
    const tr = e.target.closest("tr");
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("archivo", file);

    // IDs
    formData.append("proyecto_id", proyecto_id);
    formData.append("subcategoria_id", subcategoria_id);
    formData.append("item_id", tr.dataset.id);
    formData.append("tipo", tr.dataset.tipo);

    // Campos adicionales de la fila
    formData.append("cumplio", tr.querySelector('[data-field="cumplio"]').value || null);
    formData.append("descripcion", tr.querySelector('[data-field="descripcion"]').value || null);
    formData.append("observaciones", tr.querySelector('[data-field="observaciones"]').value || null);
    formData.append("fecha_cumplimiento", tr.querySelector('[data-field="fecha_cumplimiento"]').value || null);

    try {
        const res = await fetch("/api/evaluaciones/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (data.evidencia_path) {
            tr.querySelector("td:last-child").innerHTML +=
                `<a href="${data.evidencia_path}" target="_blank" style="display:block;color:green;">Ver evidencia</a>`;
        }

        console.log("Guardado completo:", data);

    } catch (error) {
        console.error("Error subiendo archivo:", error);
    }
}




// ==============================
// GUARDAR TODO (OPCIONAL)
// ==============================
async function guardarTodo() {
    const rows = document.querySelectorAll("tr[data-id]");

    for (const tr of rows) {
        const data = {
            proyecto_id,
            subcategoria_id,
            item_id: tr.dataset.id,
            tipo: tr.dataset.tipo,
            cumplio: tr.querySelector('[data-field="cumplio"]').value,
            descripcion: tr.querySelector('[data-field="descripcion"]').value,
            observaciones: tr.querySelector('[data-field="observaciones"]').value,
            fecha_cumplimiento: tr.querySelector('[data-field="fecha_cumplimiento"]').value
        };

        await fetch("/api/evaluaciones/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    alert("Guardado correctamente");
}