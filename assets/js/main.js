document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("pedidoForm");
  const formStep = document.getElementById("form-step");
  const resumenStep = document.getElementById("resumen-step");
  const exitoStep = document.getElementById("exito-step");
  const resumenContenido = document.getElementById("resumen-contenido");
  const editarBtn = document.getElementById("editarBtn");
  const confirmarBtn = document.getElementById("confirmarBtn");
  const pedidoSection = document.getElementById("pedido");


  function formatearLabel(label) {
    const labelsBonitos = {
      nombre: "Nombre",
      telefono: "Teléfono",
      correo: "Correo electrónico",
      producto: "Producto",
      sabor: "Sabor(es)",
      tamano: "Tamaño / Porciones",
      relleno: "Relleno",
      diseno: "Diseño / Temática",
      mensaje: "Mensaje en el pastel",
      cantidad: "Cantidad",
      fecha: "Fecha de entrega",
      hora: "Hora",
      zona_entrega: "Zona de entrega",
punto_entrega: "Punto de entrega",
      notas: "Notas adicionales",
    };

    return labelsBonitos[label] || label;
  }

  const abrirFormularioBtn = document.getElementById("abrirFormulario");

  abrirFormularioBtn.addEventListener("click", function () {

  pedidoSection.classList.add("activo");

  formStep.style.display = "block";
  resumenStep.style.display = "none";
  exitoStep.style.display = "none";

  pedidoSection.scrollIntoView({
    behavior: "smooth"
  });

});

  const zonaSelect = document.getElementById("zonaEntrega");
const puntoSelect = document.getElementById("puntoEntrega");

const puntosEntrega = {
  "Centro": [
    "Cosmovitral",
    "Portales",
    "Rectoría",
    "Grand Plaza"
  ],
  "Calzada Pacífico": [
    "Retorno Capultitlán"
  ],
  "Cacalomacán": [
    "Capilla",
    "Parroquia Asunción",
    "Kiosko",
    "Campo #1",
    "3B antes Adelita"
  ]
};

zonaSelect.addEventListener("change", function () {
  const zona = this.value;

  puntoSelect.innerHTML = "";
  
  if (!zona) {
    puntoSelect.innerHTML = `<option value="">Selecciona primero la zona</option>`;
    puntoSelect.disabled = true;
    return;
  }

  puntoSelect.disabled = false;

  puntoSelect.innerHTML = `<option value="">Selecciona punto de entrega</option>`;

  puntosEntrega[zona].forEach(punto => {
    const option = document.createElement("option");
    option.value = punto;
    option.textContent = punto;
    puntoSelect.appendChild(option);
  });
});

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", function () {
  const pedidoTop = pedidoSection.offsetTop - 120;
  const pedidoBottom = pedidoTop + pedidoSection.offsetHeight;

  if (window.scrollY >= pedidoTop && window.scrollY < pedidoBottom) {
    header.classList.add("rosa");
  } else {
    header.classList.remove("rosa");
  }
});
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = form.querySelector('[name="nombre"]').value;
const producto = form.querySelector('[name="producto"]').value;

const subjectInput = document.getElementById("dynamicSubject");
subjectInput.value = `🍰 Nuevo pedido - ${producto} - ${nombre}`;
    const formData = new FormData(form);

    const telefono = form.querySelector('[name="telefono"]').value;
const sabores = [...form.querySelectorAll('[name="sabor"]:checked')]
  .map(el => el.value)
  .join(", ") || "No especificado";
const tamano = form.querySelector('[name="tamano"]').value;
const relleno = form.querySelector('[name="relleno"]').value;
const diseno = form.querySelector('[name="diseno"]').value;
const mensaje = form.querySelector('[name="mensaje"]').value;
const zonaEntrega = form.querySelector('[name="zona_entrega"]').value;
const puntoEntrega = form.querySelector('[name="punto_entrega"]').value;

const mensajeCompleto = `
Nuevo pedido Momomi 🍰

👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
🧁 Producto: ${producto}
🍫 Sabor(es): ${sabores}
📏 Tamaño: ${tamano}
🍓 Relleno: ${relleno}
🎨 Diseño: ${diseno}
💬 Mensaje: ${mensaje}

Enviado desde la página web.
`;

document.getElementById("mensajeFinal").value = mensajeCompleto;

    let resumenHTML = "";

    formData.forEach((value, key) => {

  // Ignorar campos internos de FormSubmit
  if (key.startsWith("_")) return;

  if (value.trim() !== "") {
    resumenHTML += `
      <div class="resumen-item">
        <span class="resumen-label">${formatearLabel(key)}</span>
        <span class="resumen-valor">${value}</span>
      </div>
    `;
  }
});
    resumenContenido.innerHTML = resumenHTML;

    formStep.style.display = "none";
    resumenStep.style.display = "block";
    exitoStep.style.display = "none";
  });

  editarBtn.addEventListener("click", function () {
    resumenStep.style.display = "none";
    formStep.style.display = "block";
    exitoStep.style.display = "none";
  });

  confirmarBtn.addEventListener("click", function () {

  form.requestSubmit();

});
  
  form.requestSubmit();

});

});
