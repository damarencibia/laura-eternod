document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15 // El efecto se dispara cuando el 15% del elemento es visible
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añade la clase que activa la animación
        entry.target.classList.add("active");
        // Una vez animado, dejamos de observarlo para mejorar el rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Seleccionamos todos los elementos con la clase 'reveal'
  const elementsToReveal = document.querySelectorAll(".reveal");
  elementsToReveal.forEach(el => revealOnScroll.observe(el));
});