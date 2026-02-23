/**
 * navigation.js
 * Manejo de navegación interna, active link con auto-scroll y carousel.
 */

export function initNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".art-index a");
    const scrollContainer = document.querySelector(".nav-scroll");
    const btnLeft = document.querySelector(".nav-chevron.left");
    const btnRight = document.querySelector(".nav-chevron.right");

    /* ===============================
       1. ACTIVE LINK + AUTO-SCROLL NAV
    =============================== */
    const handleScroll = () => {
        let current = "";
        const scrollPosition = window.scrollY + 160; // Offset para detección temprana

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active-link");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active-link");

                // AUTO-SCROLL DEL MENÚ:
                // Solo si el contenedor existe y estamos en vista móvil/tablet
                if (scrollContainer && window.innerWidth <= 768) {
                    link.scrollIntoView({
                        behavior: "smooth",
                        inline: "center", // Centra el link activo en el navbar
                        block: "nearest"
                    });
                }
            }
        });
    };

    window.addEventListener("scroll", handleScroll);

    /* ===============================
       2. SCROLL REVEAL
    =============================== */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    /* ===============================
       3. NAV CAROUSEL MÓVIL (MANUAL)
    =============================== */
    if (scrollContainer && btnLeft && btnRight) {
        const moveScroll = (direction) => {
            const step = 150;
            if (direction === 'left') {
                scrollContainer.scrollLeft -= step;
            } else {
                scrollContainer.scrollLeft += step;
            }
        };

        btnLeft.addEventListener("click", (e) => {
            e.preventDefault();
            moveScroll('left');
        });

        btnRight.addEventListener("click", (e) => {
            e.preventDefault();
            moveScroll('right');
        });
    }
}

/* Ejecutar al cargar */
document.addEventListener("DOMContentLoaded", initNavigation);