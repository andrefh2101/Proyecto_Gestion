const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
  cargarTitulo();
  cargarEntradas();
  cargarHerramientas();
  cargarSalidas();
});

function cargarTitulo() {
  fetch(`/api/subcategorias/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("titulo").textContent = data.nombre;
    });
}

function cargarEntradas() {
  fetch(`/api/subcategorias/${id}/entradas`)
    .then(res => res.json())
    .then(lista => {
      const tbody = document.querySelector("#tablaEntradas tbody");
      tbody.innerHTML = "";

      lista.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${item.nombre}</td>`;
        tbody.appendChild(tr);
      });
    });
}

function cargarHerramientas() {
  fetch(`/api/subcategorias/${id}/herramientas`)
    .then(res => res.json())
    .then(lista => {
      const tbody = document.querySelector("#tablaHerramientas tbody");
      tbody.innerHTML = "";

      lista.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${item.nombre}</td>`;
        tbody.appendChild(tr);
      });
    });
}

function cargarSalidas() {
  fetch(`/api/subcategorias/${id}/salidas`)
    .then(res => res.json())
    .then(lista => {
      const tbody = document.querySelector("#tablaSalidas tbody");
      tbody.innerHTML = "";

      lista.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${item.nombre}</td>`;
        tbody.appendChild(tr);
      });
    });
}
