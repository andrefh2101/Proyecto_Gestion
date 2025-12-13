// ==============================
// CAPTURA DE PARÁMETROS
// ==============================
const params = new URLSearchParams(window.location.search);
const proyecto_id = Number(params.get("proyecto"));
const subcategoria_id = Number(params.get("subcategoria"));

const archivosPendientes = {};

if (!proyecto_id || !subcategoria_id) {
    alert("❌ Faltan parámetros en la URL");
    throw new Error("Parámetros incompletos");
}

const API = `/api/evaluaciones/${proyecto_id}/${subcategoria_id}`;
let evaluacionesMap = {};

document.addEventListener("DOMContentLoaded", () => {
    console.log("🟢 DOM cargado");
    cargarDatos();

    // 🔥 BOTÓN GUARDAR (CRÍTICO)
    const btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar) {
        btnGuardar.addEventListener("click", guardarTodo);
        console.log("🟢 Botón Guardar conectado");
    } else {
        console.error("❌ NO existe el botón btnGuardar");
    }
});

// ==============================
// CARGAR MATRIZ
// ==============================
async function cargarDatos() {
    console.log("📥 Cargando datos...");

    const res = await fetch(API);
    const data = await res.json();

    console.log("📦 DATA RECIBIDA:", data);

    evaluacionesMap = data.evaluaciones || {};

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
    if (!lista.length) return;

    let html = `
        <h3>${titulo}</h3>
        <table border="1">
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
        const key = `${item.id}_${tipo}`;
        const ev = evaluacionesMap[key] || {};

        html += `
            <tr data-id="${item.id}" data-tipo="${tipo}">
                <td>${item.nombre}</td>

                <td>
                    <select data-field="cumplio">
                        <option value="">--</option>
                        <option value="1" ${ev.cumplio == 1 ? "selected" : ""}>Sí</option>
                        <option value="0" ${ev.cumplio == 0 ? "selected" : ""}>No</option>
                    </select>
                </td>

                <td><textarea data-field="descripcion">${ev.descripcion || ""}</textarea></td>
                <td><textarea data-field="observaciones">${ev.observaciones || ""}</textarea></td>

                <td>
                    <input type="date" data-field="fecha_cumplimiento"
                        value="${ev.fecha_cumplimiento || ""}">
                </td>

                <td>
                    <input type="file" class="input-file" accept=".pdf,.png,.jpg,.jpeg">
                    ${ev.evidencia_path ? `<br><a href="${ev.evidencia_path}" target="_blank">Ver evidencia</a>` : ""}
                </td>
            </tr>
        `;
    });

    html += "</table>";
    document.getElementById("contenedorTablas").innerHTML += html;

    document.querySelectorAll(".input-file").forEach(input => {
        input.addEventListener("change", e => {
            const tr = e.target.closest("tr");
            const key = `${tr.dataset.id}_${tr.dataset.tipo}`;
            archivosPendientes[key] = e.target.files[0];
            console.log("📎 Archivo seleccionado:", key);
        });
    });
}

// ==============================
// GUARDAR TODO (DEBUG TOTAL)
// ==============================
async function guardarTodo() {
    console.log("🔥 guardarTodo() EJECUTADO");

    const filas = document.querySelectorAll("tr[data-id]");
    console.log("📄 Filas detectadas:", filas.length);

    for (const tr of filas) {
        const cumplioValue = tr.querySelector('[data-field="cumplio"]').value;

        if (cumplioValue === "") continue;

        const data = {
            proyecto_id,
            subcategoria_id,
            item_id: Number(tr.dataset.id),
            tipo: tr.dataset.tipo,
            cumplio: Number(cumplioValue),
            descripcion: tr.querySelector('[data-field="descripcion"]').value || null,
            observaciones: tr.querySelector('[data-field="observaciones"]').value || null,
            fecha_cumplimiento:
                tr.querySelector('[data-field="fecha_cumplimiento"]').value || null
        };

        console.log("➡️ Enviando TEXTO:", data);

        // 🔹 TEXTO
        const res = await fetch("/api/evaluaciones/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        console.log("⬅️ Respuesta save:", res.status);

        // 🔹 ARCHIVO
        const key = `${data.item_id}_${data.tipo}`;
        const archivo = archivosPendientes[key];

        if (archivo) {
            console.log("⬆️ Subiendo archivo:", key);

            const formData = new FormData();
            formData.append("archivo", archivo);
            Object.entries(data).forEach(([k, v]) => v !== null && formData.append(k, v));

            const resFile = await fetch("/api/evaluaciones/upload", {
                method: "POST",
                body: formData
            });

            console.log("⬅️ Respuesta upload:", resFile.status);
        }
    }

    alert("✅ Evaluaciones guardadas correctamente");
}
