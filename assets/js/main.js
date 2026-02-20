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
      notas: "Notas adicionales"
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

    const formData = new FormData(form);

    let resumenHTML = "";

    formData.forEach((value, key) => {
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

    resumenStep.style.display = "none";
    formStep.style.display = "none";
    exitoStep.style.display = "block";

    window.scrollTo({
      top: document.getElementById("pedido").offsetTop - 80,
      behavior: "smooth"
    });

    const confirmarBtn = document.getElementById("confirmarBtn");
const pedidoForm = document.getElementById("pedidoForm");

confirmarBtn.addEventListener("click", function () {
  pedidoForm.submit(); // ENVÍA el formulario real
});

  });

});

<input type="hidden" name="_next" value="https://tudominio.com/#exito"></input>
