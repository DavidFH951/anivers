// 1. Lógica para abrir y cerrar la carta
const envelope = document.getElementById('envelopeToggle');

envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
});

// 2. Lógica para el carrusel de fotos
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita conflictos de clics
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita conflictos de clics
        showSlide(currentSlide - 1);
    });
}
