/**
 * navigation.js
 * Manejo de navegación interna y scroll reveal
 */

export function initNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".art-index a");

    // 1. Efecto Active Link al hacer Scroll
    const handleScroll = () => {
        let current = "";
        const scrollPosition = window.scrollY + 150; // Offset para detectar antes de llegar

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
            }
        });
    };

    // 2. Scroll Reveal Observer (El que ya tenías, integrado aquí)
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

    // Listeners
    window.addEventListener("scroll", handleScroll);
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", initNavigation);