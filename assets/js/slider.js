const initSwiper = () => {
    const trandingSlider = new Swiper('.tranding-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
        },
        // Al hacer clic en una miniatura, el slider se mueve a ella
        slideToClickedSlide: true,

        on: {
            // Cada vez que el slide cambia (por clic o arrastre)
            slideChange: function () {
                updateMainViewer(this);
            },
            init: function () {
                updateMainViewer(this);
            }
        }
    });
};

function updateMainViewer(swiperInstance) {
    // Obtenemos el slide activo actualmente
    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];

    if (!activeSlide) return;

    // Extraemos la información de los atributos data
    const title = activeSlide.getAttribute('data-title');
    const tech = activeSlide.getAttribute('data-tech');
    const size = activeSlide.getAttribute('data-size');
    const year = activeSlide.getAttribute('data-year');
    const imgSrc = activeSlide.querySelector('img').getAttribute('src');

    // Referencias a los elementos del visor principal
    const displayImg = document.getElementById('display-img');
    const displayTitle = document.getElementById('display-title');
    const displayTech = document.getElementById('display-tech');
    const displaySize = document.getElementById('display-size');
    const displayYear = document.getElementById('display-year');

    // Aplicamos una transición suave de salida
    displayImg.style.opacity = 0;

    setTimeout(() => {
        // Actualizamos contenido
        displayImg.src = imgSrc;
        displayTitle.textContent = title;
        displayTech.textContent = tech;
        displaySize.textContent = size;
        displayYear.textContent = year;

        // Volvemos a mostrar con transición
        displayImg.style.opacity = 1;
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    const displayImg = document.getElementById('display-img');
    const displayTitle = document.getElementById('display-title');
    const displayTech = document.getElementById('display-tech');
    const displaySize = document.getElementById('display-size');
    const displayYear = document.getElementById('display-year');
    const artCounter = document.getElementById('art-counter');

    const swiper = new Swiper('.tranding-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: -10,
            depth: 150,
            modifier: 1,
            slideShadows: false,
        },
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                updateViewer(this);
            },
            slideChange: function () {
                updateViewer(this);
            }
        }
    });

    function updateViewer(instance) {
        const active = instance.slides[instance.activeIndex];
        if (!active) return;

        const data = {
            title: active.dataset.title,
            tech: active.dataset.tech,
            size: active.dataset.size,
            year: active.dataset.year,
            img: active.dataset.img
        };

        // Actualizar Contador
        artCounter.textContent = `Obra ${instance.activeIndex + 1} / ${instance.slides.length}`;

        // Transición Visor
        displayImg.style.opacity = '0';
        displayImg.style.transform = 'translateY(10px)';

        setTimeout(() => {
            displayTitle.textContent = data.title;
            displayTech.textContent = data.tech;
            displaySize.textContent = data.size;
            displayYear.textContent = data.year;
            displayImg.src = data.img;

            displayImg.style.opacity = '1';
            displayImg.style.transform = 'translateY(0)';
        }, 400);
    }
});