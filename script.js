const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 650);
});

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 90, 240)}ms`;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

revealElements.forEach((element) => observer.observe(element));

const slides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.getElementById('prevTestimonial');
const nextButton = document.getElementById('nextTestimonial');
const dotsContainer = document.getElementById('testimonialDots');
let currentSlide = 0;
let testimonialInterval;

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot';
  dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
  dot.addEventListener('click', () => {
    showSlide(index);
    restartAutoplay();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function showSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startAutoplay() {
  testimonialInterval = setInterval(nextSlide, 5000);
}

function restartAutoplay() {
  clearInterval(testimonialInterval);
  startAutoplay();
}

prevButton.addEventListener('click', () => {
  prevSlide();
  restartAutoplay();
});

nextButton.addEventListener('click', () => {
  nextSlide();
  restartAutoplay();
});

showSlide(0);
startAutoplay();

const parallaxItems = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0.08);
    item.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
  });
}, { passive: true });

const cursor = document.getElementById('customCursor');

if (window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (event) => {
    cursor.classList.add('active');
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .magnetic').forEach((item) => {
    item.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}
