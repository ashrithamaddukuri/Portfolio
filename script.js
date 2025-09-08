// Typewriter effect for header title
document.addEventListener("DOMContentLoaded", () => {
    const text = "Passionate Developer | Problem Solver";
    let i = 0;
    const speed = 70;
    const pElement = document.querySelector("p");

    function typeWriter() {
        if (i < text.length) {
            pElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    pElement.innerHTML = ""; // Clear existing
    typeWriter();

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.skills-container, .project, table');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = 0;
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
