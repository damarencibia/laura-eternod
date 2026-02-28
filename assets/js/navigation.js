/**
 * navigation.js
 * Manejo de navegación interna, active link con auto-scroll y carousel unificado.
 */

function initNavigation() {
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
        const scrollPosition = window.scrollY + 160;

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
                // Eliminamos el "window.innerWidth <= 768" para que funcione en DESKTOP también
                if (scrollContainer) {
                    link.scrollIntoView({
                        behavior: "smooth",
                        inline: "center", // Mantiene el link centrado en la barra
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
       3. NAV CAROUSEL (MANUAL) - UNIFICADO
    =============================== */
    if (scrollContainer && btnLeft && btnRight) {
        
        const moveScroll = (direction) => {
            // Aumentamos el step para desktop (opcional) o lo dejamos dinámico
            const step = direction === 'left' ? -250 : 250;
            
            scrollContainer.scrollBy({
                left: step,
                behavior: 'smooth'
            });
        };

        btnLeft.addEventListener("click", (e) => {
            e.preventDefault();
            moveScroll('left');
        });

        btnRight.addEventListener("click", (e) => {
            e.preventDefault();
            moveScroll('right');
        });

        // OPCIONAL: Ocultar/Mostrar flechas según la posición del scroll
        const toggleChevrons = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            // Si quieres que desaparezcan cuando no hay más scroll:
            btnLeft.style.opacity = scrollLeft <= 0 ? "0.3" : "1";
            btnRight.style.opacity = scrollLeft >= maxScroll - 1 ? "0.3" : "1";
        };

        scrollContainer.addEventListener("scroll", toggleChevrons);
        window.addEventListener("resize", toggleChevrons);
    }
}

document.addEventListener("DOMContentLoaded", initNavigation);