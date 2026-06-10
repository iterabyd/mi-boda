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
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }
);
document.querySelectorAll(".fade-up, .fade-image").forEach((el) => {
  observer.observe(el);
});

/* CUENTA REGRESIVA */
const targetDate = new Date("2026-08-01T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* SLIDE DE FOTOS */
const items = document.querySelectorAll(".carousel-item");

let current = 0;

function updateCarousel() {

  items.forEach(item => {
    item.classList.remove(
      "active",
      "prev",
      "next",
      "hidden"
    );
  });

  const prev =
    (current - 1 + items.length) %
    items.length;

  const next =
    (current + 1) %
    items.length;

  items[current].classList.add("active");
  items[prev].classList.add("prev");
  items[next].classList.add("next");

  items.forEach((item, index) => {

    if (
      index !== current &&
      index !== prev &&
      index !== next
    ) {
      item.classList.add("hidden");
    }

  });

}

updateCarousel();

setInterval(() => {

  current =
    (current + 1) %
    items.length;

  updateCarousel();

}, 3500);


/* SWIPE PARA MÓVILES */

let startX = 0;

const carousel = document.getElementById("carousel");

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {

  const endX = e.changedTouches[0].clientX;
  const distance = startX - endX;

  if (distance > 50) {
    nextSlide(); // deslizó a la izquierda
  }

  if (distance < -50) {
    prevSlide(); // deslizó a la derecha
  }

});

function nextSlide() {
  current = (current + 1) % items.length;
  updateCarousel();
}

function prevSlide() {
  current = (current - 1 + items.length) % items.length;
  updateCarousel();
}

/* SCROLL AUTOMATICO AL INCIO */
const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    btnTop.classList.remove("hidden");
  } else {
    btnTop.classList.add("hidden");
  }
});