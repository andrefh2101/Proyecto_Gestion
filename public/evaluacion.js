// ==============================
// CAPTURA DE PARÁMETROS
// ==============================
const params = new URLSearchParams(window.location.search);
const proyecto_id = Number(params.get("proyecto"));
const subcategoria_id = Number(params.get("subcategoria"));

if (!proyecto_id || !subcategoria_id) {
    alert("❌ Faltan parámetros en la URL");
    throw new Error("Parámetros incompletos");
}

const API = `/api/evaluaciones/${proyecto_id}/${subcategoria_id}`;
let evaluacionesMap = {};

// ==============================
// DOM READY
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    console.log("🟢 Evaluación cargada");
    cargarDatos();
});

// ==============================
// CARGAR MATRIZ
// ==============================
async function cargarDatos() {
    const res = await fetch(API);
    const data = await res.json();

    console.log("📦 DATA:", data);

    evaluacionesMap = data.evaluaciones || {};

    generarTabla("Entradas", data.items.filter(i => i.tipo === "entrada"), "entrada");
    generarTabla("Herramientas / Técnicas", data.items.filter(i => i.tipo === "herramienta"), "herramienta");
    generarTabla("Salidas", data.items.filter(i => i.tipo === "salida"), "salida");
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

                <td class="cumplio-cell">
                    ${ev.cumplio == 1 ? "✅ SÍ" : "❌ NO"}
                </td>

                <td><textarea data-field="descripcion">${ev.descripcion || ""}</textarea></td>
                <td><textarea data-field="observaciones">${ev.observaciones || ""}</textarea></td>

                <td class="fecha-cell">
                    ${ev.fecha_cumplimiento || "Ingrese un archivo"}
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

    // ==============================
    // EVENTO ARCHIVO
    // ==============================
    document.querySelectorAll(".input-file").forEach(input => {
        input.addEventListener("change", e => subirArchivo(e));
    });
}

// ==============================
// SUBIR ARCHIVO (AUTO)
// ==============================
async function subirArchivo(e) {
    const tr = e.target.closest("tr");
    const file = e.target.files[0];
    if (!file) return;

    const hoy = new Date().toISOString().split("T")[0];

    const data = {
        proyecto_id,
        subcategoria_id,
        item_id: Number(tr.dataset.id),
        tipo: tr.dataset.tipo,
        cumplio: 1,
        descripcion: tr.querySelector('[data-field="descripcion"]').value || null,
        observaciones: tr.querySelector('[data-field="observaciones"]').value || null,
        fecha_cumplimiento: hoy
    };

    console.log("⬆️ Subiendo evaluación:", data);

    const formData = new FormData();
    formData.append("archivo", file);

    Object.entries(data).forEach(([k, v]) => {
        if (v !== null) formData.append(k, v);
    });

    const res = await fetch("/api/evaluaciones/upload", {
        method: "POST",
        body: formData
    });

    const result = await res.json();
    console.log("✅ Respuesta:", result);

    // 🔄 Actualizar UI
    tr.querySelector(".cumplio-cell").innerText = "✅ SÍ";
    tr.querySelector(".fecha-cell").innerText = hoy;

    alert("✅ Evidencia guardada correctamente");
}
