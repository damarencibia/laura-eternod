document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".carousel").forEach(carousel => {

        // Elementos principales
        const track = carousel.querySelector(".carousel-track");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");

        // Ancho de una imagen (100% del carrusel)
        const slideWidth = track.clientWidth;

        // Botón siguiente
        nextBtn.addEventListener("click", () => {
            track.scrollBy({
                left: slideWidth,
                behavior: "smooth"
            });
        });

        // Botón anterior
        prevBtn.addEventListener("click", () => {
            track.scrollBy({
                left: -slideWidth,
                behavior: "smooth"
            });
        });

    });

});
