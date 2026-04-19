document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // 📦 ELEMENTOS
  // =========================
  const form = document.getElementById("pedidoForm");
  const formStep = document.getElementById("form-step");
  const resumenStep = document.getElementById("resumen-step");
  const exitoStep = document.getElementById("exito-step");

  const resumenContenido = document.getElementById("resumen-contenido");

  const pedidoSection = document.getElementById("pedido");

  const editarBtn = document.getElementById("editarBtn");
  const confirmarBtn = document.getElementById("confirmarBtn");

  const header = document.querySelector(".header");

  // =========================
  // 🧠 LABELS BONITOS
  // =========================
  function formatearLabel(label) {
    const labels = {
      nombre: "Nombre",
      telefono: "Teléfono",
      correo: "Correo electrónico",
      producto: "Producto",
      sabor: "Sabor(es)",
      tamano: "Tamaño / Porciones",
      relleno: "Relleno",
      diseno: "Diseño / Temática",
      mensaje: "Mensaje",
      cantidad: "Cantidad",
      fecha: "Fecha de entrega",
      hora: "Hora",
      notas: "Notas adicionales",
      kit_galletas: "Tipo de kit",
      zona_entrega: "Zona de entrega",
      punto_entrega: "Punto de entrega",
      galletas_extra: "Galletas extra"
    };
    return labels[label] || label;
  }

  // =========================
  // 🚀 ABRIR FORMULARIO
  // =========================
  const abrirFormularioBtn = document.getElementById("abrirFormulario");

if (abrirFormularioBtn) {
  abrirFormularioBtn.addEventListener("click", function () {
    window.scrollTo({
      top: pedidoSection.offsetTop - 80,
      behavior: "smooth"
    });
  });
}

  // =========================
  // 📜 HEADER SCROLL
  // =========================
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 40);

    const pedidoTop = pedidoSection.offsetTop - 120;
    const pedidoBottom = pedidoTop + pedidoSection.offsetHeight;

    if (window.scrollY >= pedidoTop && window.scrollY < pedidoBottom) {
      header.classList.add("rosa");
    } else {
      header.classList.remove("rosa");
    }
  });

  // =========================
  // 🧾 GENERAR RESUMEN
  // =========================
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    let resumenHTML = "";

    const sabores = [];
    document.querySelectorAll('input[name="sabor"]:checked').forEach(el => {
      sabores.push(el.value);
    });

    if (sabores.length > 0) {
      resumenHTML += `
        <div class="resumen-item">
          <span class="resumen-label">Sabor(es)</span>
          <span class="resumen-valor">${sabores.join(", ")}</span>
        </div>
      `;
    }

    formData.forEach((value, key) => {

  // ❌ ignorar campos internos
  if (
    key.startsWith("_") || 
    key === "sabor" || 
    key === "mensajeFinal"
  ) return;

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
  });

  // =========================
  // ✏️ EDITAR
  // =========================
  editarBtn.addEventListener("click", () => {
    resumenStep.style.display = "none";
    formStep.style.display = "block";
  });

  // =========================
  // ✅ CONFIRMAR
  // =========================
  confirmarBtn.addEventListener("click", () => {

    document.getElementById("mensajeFinal").value =
      resumenContenido.innerText;

    form.submit();

    resumenStep.style.display = "none";
    formStep.style.display = "none";
    exitoStep.style.display = "block";

    window.scrollTo({
      top: pedidoSection.offsetTop - 80,
      behavior: "smooth"
    });
  });

  // =========================
  // 📱 MENU MOBILE
  // =========================
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // =========================
  // 🎂 CAMBIO PRODUCTO
  // =========================
  const productoSelect = document.getElementById("productoSelect");
  const opcionesPastel = document.getElementById("opciones-pastel");
  const opcionesGalletas = document.getElementById("opciones-galletas");

  productoSelect.addEventListener("change", function () {

    if (this.value === "Galletas decoradas") {
      opcionesPastel.style.display = "none";
      opcionesGalletas.style.display = "block";
    } else {
      opcionesPastel.style.display = "block";
      opcionesGalletas.style.display = "none";
    }

  });

  // =========================
  // 🍪 KIT GALLETAS
  // =========================
  const radiosKit = document.querySelectorAll('input[name="kit_galletas"]');
  const descripcionKit = document.getElementById("descripcion-kit");
  const textoKit = document.getElementById("texto-kit");

  radiosKit.forEach(radio => {
    radio.addEventListener("change", function () {

      descripcionKit.style.display = "block";

      if (this.value === "Caja normal") {
        textoKit.textContent = "Incluye galletas decoradas listas para regalar 🎁";
      }

      if (this.value === "Kit personalizado") {
        textoKit.textContent = "Incluye caja de madera, pinturas, pincel y galletas para decorar 🎨";
      }

    });
  });

  // =========================
  // 📍 ZONA ENTREGA
  // =========================
  const zonaEntrega = document.getElementById("zonaEntrega");
  const puntoEntrega = document.getElementById("puntoEntrega");

  const puntos = {
    "Centro": ["Los Portales", "Alameda", "Catedral"],
    "Calzada Pacífico": ["Oxxo Pacífico", "Bodega Aurrera"],
    "Cacalomacán": ["Centro Cacalomacán", "Iglesia principal"]
  };

  zonaEntrega.addEventListener("change", function () {

    const zona = this.value;

    puntoEntrega.innerHTML =
      '<option value="">Selecciona punto de entrega</option>';

    if (puntos[zona]) {
      puntoEntrega.disabled = false;

      puntos[zona].forEach(punto => {
        const option = document.createElement("option");
        option.value = punto;
        option.textContent = punto;
        puntoEntrega.appendChild(option);
      });

    } else {
      puntoEntrega.disabled = true;
    }

  });

});