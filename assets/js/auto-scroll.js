document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('.image-slider');

  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoPlayTick;

    // Función de Auto-Play
    const startAutoPlay = () => {
      autoPlayTick = setInterval(() => {
        // Si llega al final, vuelve al inicio, si no, avanza el ancho de una imagen
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
        }
      }, 4000); // Cambia cada 4 segundos
    };

    // Detener auto-play cuando el usuario interactúa
    const stopAutoPlay = () => clearInterval(autoPlayTick);

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    slider.addEventListener('touchstart', stopAutoPlay);

    // Iniciar el ciclo
    startAutoPlay();
  });
});