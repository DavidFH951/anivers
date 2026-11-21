const $ = s => document.querySelector(s);
const song = $('#song');

// Cambia tus frases aquí
const frases = [
    'Eres mi lugar favorito en el mundo ❤️',
    'Contigo hasta el infinito y más allá ✨',
    'Cada día a tu lado es mi día favorito 💖',
    'Te elegiría una y mil veces más 💍',
    'Mi corazón es tuyo, Kiara 💘',
    'Gracias por existir y por quedarte conmigo 🌹'
];

// 1. Corazones que suben por el fondo
function corazonFlotante() {
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.textContent = '❤';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = 10 + Math.random() * 18 + 'px';
    h.style.animationDuration = 8 + Math.random() * 8 + 's';
    h.style.setProperty('--rot', (Math.random() * 120 - 60) + 'deg');
    h.addEventListener('animationend', () => h.remove());
    $('#hearts').appendChild(h);
}
setInterval(corazonFlotante, 900);

// 2. Explosión de corazones donde toques
function explosion(x, y, n) {
    for (let i = 0; i < n; i++) {
        const b = document.createElement('span');
        const ang = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 80;
        b.className = 'burst';
        b.textContent = '❤';
        b.style.left = x + 'px';
        b.style.top = y + 'px';
        b.style.fontSize = 10 + Math.random() * 14 + 'px';
        b.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
        b.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
        b.addEventListener('animationend', () => b.remove());
        document.body.appendChild(b);
    }
}
document.addEventListener('pointerdown', e => explosion(e.clientX, e.clientY, 6));

// 3. Escenas: una pantalla a la vez
const scenes = [...document.querySelectorAll('.scene')];
const navBtns = [...document.querySelectorAll('.nav button')];
let actual = 0;

function ir(i) {
    actual = (i + scenes.length) % scenes.length;
    scenes.forEach((s, k) => s.classList.toggle('active', k === actual));
    navBtns.forEach((b, k) => b.classList.toggle('active', k === actual));
    document.querySelectorAll('video').forEach(v => v.pause());
}
navBtns.forEach(b => b.addEventListener('click', () => ir(+b.dataset.go)));
document.addEventListener('keydown', e => {
    if ($('#paper').classList.contains('show')) return;
    if (e.key === 'ArrowRight') ir(actual + 1);
    if (e.key === 'ArrowLeft') ir(actual - 1);
});

// 4. Portada: el corazón abre todo y empieza la música
$('#introHeart').addEventListener('click', () => {
    explosion(innerWidth / 2, innerHeight / 2, 30);
    $('#intro').classList.add('open');
    song.play().catch(() => {}); // si aún no subes cancion.mp3, no pasa nada
});

// 5. Carta: romper el sello, abrir el sobre y desplegar la carta
const envelope = $('#envelope');
const paper = $('#paper');
$('#seal').addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
        paper.classList.add('show');
        $('#closeLetter').focus({ preventScroll: true });
    }, 1500);
});
$('#closeLetter').addEventListener('click', () => {
    paper.classList.remove('show');
    setTimeout(() => envelope.classList.remove('open'), 400);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && paper.classList.contains('show')) $('#closeLetter').click(); });

// 6. Fotos: pila de polaroids, la de arriba sale volando al tocarla
const fotos = [...document.querySelectorAll('.polaroid')];
const total = fotos.length;
let vistas = 0;
fotos.forEach(p => p.style.setProperty('--r', (Math.random() * 14 - 7) + 'deg'));
const ordenar = () => fotos.forEach((p, i) => p.style.zIndex = total - i);
ordenar();

function siguienteFoto() {
    const top = fotos[0];
    if (top.classList.contains('fly')) return;
    top.style.setProperty('--fx', (vistas % 2 ? -140 : 140) + '%');
    top.classList.add('fly');
    setTimeout(() => {
        fotos.push(fotos.shift());
        ordenar();
        top.classList.remove('fly');
        vistas++;
        $('#photoCount').textContent = (vistas % total) + 1 + ' / ' + total;
    }, 500);
}
$('#photos').addEventListener('click', siguienteFoto);
$('#photos').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); siguienteFoto(); } });

// 7. Música: tocadiscos + botón flotante
const minutos = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
const alternar = () => song.paused ? song.play().catch(() => {}) : song.pause();
$('#playBtn').addEventListener('click', alternar);
$('#musicBtn').addEventListener('click', alternar);

const syncPlay = () => {
    document.body.classList.toggle('playing', !song.paused);
    $('#playBtn').textContent = song.paused ? '▶' : '❚❚';
};
song.addEventListener('play', syncPlay);
song.addEventListener('pause', syncPlay);
song.addEventListener('timeupdate', () => {
    if (!song.duration) return;
    $('#progress').value = song.currentTime / song.duration * 100;
    $('#time').textContent = minutos(song.currentTime);
});
$('#progress').addEventListener('input', e => {
    if (song.duration) song.currentTime = e.target.value / 100 * song.duration;
});
song.addEventListener('error', () => { $('#songName').textContent = 'Falta subir cancion.mp3'; });

// Si pone un video, pausamos la canción para que no se mezclen
document.querySelectorAll('video').forEach(v => v.addEventListener('play', () => song.pause()));

// 8. Frases: tarjetas que se voltean
frases.forEach(f => {
    const c = document.createElement('button');
    c.className = 'card';
    c.setAttribute('aria-label', 'Voltear tarjeta');
    c.innerHTML = '<div class="card-inner"><div class="card-face card-front">❤</div><div class="card-face card-back"></div></div>';
    c.querySelector('.card-back').textContent = f;
    c.addEventListener('click', () => c.classList.toggle('flipped'));
    $('#cards').appendChild(c);
});
