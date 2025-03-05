function iniciarVideo() {
  const videoAtual = document.querySelector(".galeria-video-item.ativo video");
  if (videoAtual) {
    videoAtual.play();
  }
  const videoAnterior = document.querySelector(
    ".galeria-video-item:not(.ativo) video"
  );
  if (videoAnterior) {
    videoAnterior.pause();
  }
}

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

  new ModalController();

  // Funções para mover fotos
  let indiceFotos = 0;

  function moverFotos(direcao) {
    const fotos = document.querySelectorAll(".galeria-foto-item");
    const totalFotos = fotos.length;
    indiceFotos += direcao;

    if (indiceFotos < 0) {
      indiceFotos = 0; // Volta para o primeiro conjunto
    } else if (indiceFotos >= totalFotos) {
      indiceFotos = totalFotos - 3; // Volta para o último conjunto
    }

    atualizarVisibilidade();
  }

  function atualizarVisibilidade() {
    const fotos = document.querySelectorAll(".galeria-foto-item");
    fotos.forEach((foto, index) => {
      if (index >= indiceFotos && index < indiceFotos + 3) {
        foto.style.display = "block";
      } else {
        foto.style.display = "none";
      }
    });
  }

  atualizarVisibilidade(); // Inicializa a visibilidade

  // Adiciona eventos de clique às setas
  document
    .querySelector(".seta-esquerda-fotos")
    .addEventListener("click", () => {
      moverFotos(-1);
    });

  document
    .querySelector(".seta-direita-fotos")
    .addEventListener("click", () => {
      moverFotos(1);
    });

  // Adiciona evento de clique para abrir o formulário
  document
    .getElementById("botao-abrir-formulario")
    .addEventListener("click", function () {
      document.getElementById("formulario").style.display = "block";
    });

  // Adiciona evento de clique para fechar o formulário
  document
    .getElementById("fechar-formulario")
    .addEventListener("click", function () {
      document.getElementById("formulario").style.display = "none";
    });

  // Form Validation
  const formValidation = () => {
    const form = document.getElementById("form-orcamento");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const servicos = document.getElementById("servicos").value;
        const tipoConstrucao = document.getElementById("tipo-construcao").value;
        const areaObra = document.getElementById("area-obra").value;
        const descricaoObra = document.getElementById("descricao-obra").value;

        const mensagem = `Olá, eu sou ${nome} e estou interessado em obter um orçamento para uma obra. Meu telefone é ${telefone} e o endereço da obra é ${endereco}. Os serviços desejados são: ${servicos}. O tipo de construção é ${tipoConstrucao} e a área da obra é de ${areaObra}m². A descrição da obra é: ${descricaoObra}.`;

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

  formValidation();

  // Botão de Voltar ao Topo
  const voltarParaTopo = document.createElement("button");
  voltarParaTopo.id = "voltar-para-o-topo";
  voltarParaTopo.title = "Voltar para o topo";
  voltarParaTopo.textContent = "Voltar ao Topo";
  voltarParaTopo.innerHTML +=
    '<i class="fa fa-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(voltarParaTopo);

  // Exibir o botão de voltar ao topo ao rolar a página
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      voltarParaTopo.style.display = "block";
    } else {
      voltarParaTopo.style.display = "none";
    }
  });

  // Ação do botão de voltar ao topo
  voltarParaTopo.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });
});

let indiceVideo = 0;
const galeriaVideoItems = document.querySelectorAll(".galeria-video-item");
const setaEsquerda = document.querySelector(".seta-esquerda-videos");
const setaDireita = document.querySelector(".seta-direita-videos");

function moverVideo(direcao) {
  indiceVideo += direcao * 3;
  if (indiceVideo < 0) {
    indiceVideo = galeriaVideoItems.length - 3;
  } else if (indiceVideo >= galeriaVideoItems.length) {
    indiceVideo = 0;
  }
  atualizarVisibilidade();
}

function atualizarVisibilidade() {
  galeriaVideoItems.forEach((item, index) => {
    if (index >= indiceVideo && index < indiceVideo + 3) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

setaEsquerda.addEventListener("click", () => {
  moverVideo(-1);
});

setaDireita.addEventListener("click", () => {
  moverVideo(1);
});

galeriaVideoItems[0].classList.add("ativo");

// Adiciona evento de clique para abrir o formulário
document
  .getElementById("botao-agendamento")
  .addEventListener("click", function () {
    console.log("Evento de clique disparado");
    // Verifica se o formulário está carregado
    if (document.getElementById("formulario")) {
      // Abre o formulário de agendamento
      document.getElementById("formulario").style.display = "block";
    } else {
      // Se o formulário não está carregado, aguarda 500ms e tenta novamente
      setTimeout(function () {
        document.getElementById("botao-agendamento").click();
      }, 500);
    }
  });

console.log(document.getElementById("formulario"));
