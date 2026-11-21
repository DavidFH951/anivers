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

// 3. Portada: al tocar el corazón se abre la página y suena la música
const intro = document.getElementById('intro');
const song = document.getElementById('song');
const musicBtn = document.getElementById('musicBtn');

function toggleMusic(play) {
    if (play) song.play().catch(() => {}); // si no hay cancion.mp3, no rompe nada
    else song.pause();
    musicBtn.classList.toggle('playing', play);
}

document.getElementById('introHeart').addEventListener('click', () => {
    intro.classList.add('open');
    toggleMusic(true);
});

musicBtn.addEventListener('click', () => toggleMusic(song.paused));

// 4. Frases: cambia tus frases aquí
const frases = [
    'Eres mi lugar favorito en el mundo ❤️',
    'Contigo hasta el infinito y más allá ✨',
    'Cada día a tu lado es mi día favorito 💖',
    'Te elegiría una y mil veces más 💍',
    'Mi corazón es tuyo, Kiara 💘',
    'Gracias por existir y por quedarte conmigo 🌹'
];
const phrase = document.getElementById('phrase');
let fraseActual = -1;

document.getElementById('phraseBtn').addEventListener('click', () => {
    fraseActual = (fraseActual + 1) % frases.length;
    phrase.style.opacity = 0;
    setTimeout(() => {
        phrase.textContent = frases[fraseActual];
        phrase.style.opacity = 1;
    }, 400);
});
