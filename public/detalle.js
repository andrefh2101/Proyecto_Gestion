const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
  cargarTitulo();
  cargarEntradas();
  cargarHerramientas();
  cargarSalidas();
  cargarEvaluaciones();
});

function cargarTitulo() {
  fetch(`/api/subcategorias/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("titulo").textContent =
        data.nombre || data.nombre_subcategoria;
    })
    .catch(err => console.error("Error cargando título:", err));
}

// ----------------------
// FUNCIONES GENERALES
// ----------------------
function agregarFila(tbody, item) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.nombre}</td>

    <td>
      <select class="campo-cumplio">
        <option value="NO" selected>NO</option>
        <option value="SI">SI</option>
      </select>
    </td>

    <td>
      <textarea class="campo-descripcion" rows="2">${item.descripcion || ""}</textarea>
    </td>

    <td>
      <input type="date" class="campo-fecha" value="${item.fecha || ""}">
    </td>

    <td>
      <input type="file" class="campo-evidencia">
    </td>

    <td>
      <textarea class="campo-observaciones" rows="2">${item.observaciones || ""}</textarea>
    </td>
  `;

  tbody.appendChild(tr);
}

function vaciarYAgregar(tbody, lista) {
  tbody.innerHTML = "";
  lista.forEach(item => agregarFila(tbody, item));
}

// ----------------------
// Cargar Entradas
// ----------------------
function cargarEntradas() {
  fetch(`/api/subcategorias/${id}/entradas`)
    .then(res => res.json())
    .then(lista => {
      const tbody = document.querySelector("#tablaEntradas tbody");

      const listaConTipo = lista.map(i => ({ ...i, tipo: "entrada" }));

      vaciarYAgregar(tbody, listaConTipo);
    })
    .catch(err => console.error("Error cargando Entradas:", err));
}

// ----------------------
// Cargar Herramientas
// ----------------------
function cargarHerramientas() {
  fetch(`/api/subcategorias/${id}/herramientas`)
    .then(res => res.json())
    .then(lista => {
      const tbody = document.querySelector("#tablaHerramientas tbody");

      const listaConTipo = lista.map(i => ({ ...i, tipo: "herramienta" }));

      vaciarYAgregar(tbody, listaConTipo);
    })
    .catch(err => console.error("Error cargando Herramientas:", err));
}

// ----------------------
// Cargar Salidas
// ----------------------
function cargarSalidas() {
  fetch(`/api/subcategorias/${id}/salidas`)
    .then(res => res.json())
    .then(lista => {
      const tbody = document.querySelector("#tablaSalidas tbody");

      const listaConTipo = lista.map(i => ({ ...i, tipo: "salida" }));

      vaciarYAgregar(tbody, listaConTipo);
    })
    .catch(err => console.error("Error cargando Salidas:", err));
}

// ----------------------
// Cargar Evaluaciones
// ----------------------
function cargarEvaluaciones() {
  const proyectoId = localStorage.getItem("proyectoSeleccionado");

  if (!proyectoId) {
    console.warn("No hay proyecto seleccionado en localStorage");
    return;
  }

  fetch(`/api/evaluaciones/subcategoria/${id}?proyecto=${proyectoId}`)
    .then(res => res.json())
    .then(lista => {
      colocarEvaluaciones(lista);
    })
    .catch(err => console.error("Error cargando evaluaciones:", err));
}

function colocarEvaluaciones(evaluaciones) {
  evaluaciones.forEach(ev => {
    let selector;

    if (ev.tipo === "entrada") selector = "#tablaEntradas tbody";
    if (ev.tipo === "herramienta") selector = "#tablaHerramientas tbody";
    if (ev.tipo === "salida") selector = "#tablaSalidas tbody";

    const tbody = document.querySelector(selector);

    agregarFila(tbody, ev);
  });
}
