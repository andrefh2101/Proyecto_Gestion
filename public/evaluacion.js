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
let totalItems = 0;
let itemsCumplidos = 0;

// ==============================
// DOM READY
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});

// ==============================
// CARGAR MATRIZ
// ==============================
async function cargarDatos() {
    const res = await fetch(API);
    const data = await res.json();

    if (!res.ok || !Array.isArray(data.items)) {
        alert("❌ Error al cargar los datos de evaluación");
        console.error("Respuesta inválida:", data);
        return;
    }

    evaluacionesMap = data.evaluaciones || {};
    document.getElementById("contenedorTablas").innerHTML = "";

    totalItems = 0;
    itemsCumplidos = 0;

    generarTabla("Entradas", data.items.filter(i => i.tipo === "entrada"), "entrada");
    generarTabla("Herramientas / Técnicas", data.items.filter(i => i.tipo === "herramienta"), "herramienta");
    generarTabla("Salidas", data.items.filter(i => i.tipo === "salida"), "salida");

    actualizarPorcentaje();
}


// ==============================
// GENERAR TABLA
// ==============================
function generarTabla(titulo, lista, tipo) {
    if (!lista.length) return;

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
        totalItems++;

        const key = `${item.id}_${tipo}`;
        const ev = evaluacionesMap[key] || {};

        if (ev.cumplio == 1) itemsCumplidos++;

        html += `
            <tr data-id="${item.id}" data-tipo="${tipo}">
                <td>${item.nombre}</td>

                <td class="cumplio-cell">
                    ${ev.cumplio == 1 ? "✅ SÍ" : "❌ NO"}
                </td>

                <td><textarea data-field="descripcion">${ev.descripcion || ""}</textarea></td>
                <td><textarea data-field="observaciones">${ev.observaciones || ""}</textarea></td>

                <td class="fecha-cell">
                    ${ev.fecha_cumplimiento ? ev.fecha_cumplimiento.split("T")[0] : "-"}
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
        input.addEventListener("change", e => subirArchivo(e));
    });
}

// ==============================
// SUBIR ARCHIVO
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

    const formData = new FormData();
    formData.append("archivo", file);

    Object.entries(data).forEach(([k, v]) => {
        if (v !== null) formData.append(k, v);
    });

    await fetch("/api/evaluaciones/upload", {
        method: "POST",
        body: formData
    });

    // UI
    if (tr.querySelector(".cumplio-cell").innerText.includes("NO")) {
        itemsCumplidos++;
    }

    tr.querySelector(".cumplio-cell").innerText = "✅ SÍ";
    tr.querySelector(".fecha-cell").innerText = hoy;

    actualizarPorcentaje();
}

// ==============================
// PORCENTAJE
// ==============================
function actualizarPorcentaje() {
    const porcentaje = totalItems === 0
        ? 0
        : Math.round((itemsCumplidos / totalItems) * 100);

    const barra = document.getElementById("barraProgreso");
    barra.style.width = porcentaje + "%";
    barra.innerText = porcentaje + "%";
}
