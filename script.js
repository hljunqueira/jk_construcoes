document.addEventListener("DOMContentLoaded", () => {
  // Configurações globais
  const config = {
    scrollOffset: 100,
    animationDuration: 300,
    carouselSettings: {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    },
  };

  // Galeria de Fotos
  const galeriaFotos = document.querySelector(".galeria-fotos");
  const galeriaFotoItems = document.querySelectorAll(".galeria-foto-item");
  let currentFoto = 0;

  setInterval(() => {
    galeriaFotoItems[currentFoto].classList.remove("ativo");
    currentFoto = (currentFoto + 1) % galeriaFotoItems.length;
    galeriaFotoItems[currentFoto].classList.add("ativo");
  }, 3000);

  // Modal Controller
  class ModalController {
    constructor() {
      this.modal = document.getElementById("modal-imagem");
      this.modalImg = document.getElementById("imagem-modal");
      this.galeriaItems = document.querySelectorAll(".galeria-item");
      this.initModal();
    }

    initModal() {
      this.galeriaItems.forEach((item) => {
        const media = item.querySelector("img, video");
        if (media) {
          media.addEventListener("click", () => this.openModal(media));
        }
      });

      if (document.getElementById("fechar-modal")) {
        document
          .getElementById("fechar-modal")
          .addEventListener("click", () => this.closeModal());
      }
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    openModal(media) {
      if (media.tagName === "IMG") {
        this.modalImg.src = media.src;
      } else {
        this.modalImg.innerHTML = media.outerHTML;
      }
      this.modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }

    closeModal() {
      this.modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // Smooth Scroll
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  };

  // Form Validation
  const formValidation = () => {
    const form = document.getElementById("form-orcamento");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;

        const mensagem = `Olá, eu sou ${nome} e estou interessado em obter um orçamento para uma obra. Meu telefone é ${telefone} e o endereço da obra é ${endereco}.`;

        const url = `https://api.whatsapp.com/send?phone=5548996155378&text=${encodeURIComponent(
          mensagem
        )}`;

        window.open(url, "_blank");
        document.getElementById("mensagem-envio").style.display =
          "inline-block";
        setTimeout(function () {
          window.location.href = "index.html";
        }, 2000);
      });
    }
  };

  // Inicialização dos módulos
  new ModalController();
  smoothScroll();
  formValidation();

  // Abertura do formulário
  document
    .querySelector(".btn-abrir-formulario")
    .addEventListener("click", function () {
      var formulario = document.getElementById("formulario");
      if (formulario.style.display === "none") {
        formulario.style.display = "block";
        formulario.scrollTop = 0;
      } else {
        formulario.style.display = "none";
        window.location.href = "index.html";
      }
    });

  // Botão fechar
  document
    .querySelector(".btn-fechar-formulario")
    .addEventListener("click", function () {
      var formulario = document.getElementById("formulario");
      formulario.style.display = "none";
      window.location.href = "#botao-abrir-formulario";
    });
});
