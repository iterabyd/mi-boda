const musicBtn = document.getElementById('music-btn');
const music = document.getElementById('music');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

function showInvitation() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("invitation-content").classList.remove("hidden");

    // Mostrar botón
    musicBtn.style.display = 'flex';

    music.play();

    // Mostrar pause, ocultar play
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
}

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        music.pause();
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
    }
});

function getDispositivo() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = width / height;

  // Si la relación ancho/alto es mayor a 1.2 es landscape
  const isLandscape = ratio > 1.2;

  if (isLandscape) {
    if (width >= 1024) return 'laptop';
    if (width >= 768) return 'tablet';
    return 'laptop'; // ventana pequeña landscape = tratar como laptop
  } else {
    if (width >= 768) return 'tablet';
    return 'movil';
  }
}

function aplicarTodasLasFotos() {
  const imagenes = document.querySelectorAll('[data-movil]');
  const dispositivo = getDispositivo();

  imagenes.forEach(el => {
    if (dispositivo === 'movil') {
      el.src = el.dataset.movil;
    } else if (dispositivo === 'tablet') {
      el.src = el.dataset.tablet;
    } else {
      el.src = el.dataset.laptop;
    }
  });

  console.log('Dispositivo:', dispositivo, window.innerWidth + 'x' + window.innerHeight);
}



aplicarTodasLasFotos();
window.addEventListener('resize', aplicarTodasLasFotos);



//para animar las secciones al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".fade-up").forEach((el) => {
  observer.observe(el);
});