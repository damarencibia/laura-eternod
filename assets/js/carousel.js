document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".carousel").forEach(carousel => {

    // Elementos principales
    const track = carousel.querySelector(".carousel-track");
    const images = track.querySelectorAll("img");

    // Indicadores (hermanos del carrusel)
    const indicators = carousel
      .closest(".carousel-card")
      .querySelectorAll(".indicator");

    // Botones
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    // Índice actual
    let currentIndex = 0;

    // Ancho del slide
    const slideWidth = track.clientWidth;

    // Función para actualizar indicadores
    const updateIndicators = () => {
      indicators.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    };

    // Ir a una imagen concreta
    const goToSlide = (index) => {
      currentIndex = Math.max(0, Math.min(index, images.length - 1));

      track.scrollTo({
        left: slideWidth * currentIndex,
        behavior: "smooth"
      });

      updateIndicators();
    };

    // Botón siguiente
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });

    // Botón anterior
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });

    // Detectar swipe / scroll manual
    track.addEventListener("scroll", () => {
      const index = Math.round(track.scrollLeft / slideWidth);
      if (index !== currentIndex) {
        currentIndex = index;
        updateIndicators();
      }
    });

  });

});
