/* ============================================================
   MAIN SCRIPT — Modern Portfolio
   ============================================================ */

// ─── Dynamic Year ──────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Theme Toggle ──────────────────────────────────────────
(function initTheme() {
  const body        = document.body;
  const toggleBtn   = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');

  const LIGHT_CLASS  = 'light';
  const STORAGE_KEY  = 'aa-theme';
  const DEFAULT_THEME = 'light'; // ← change to 'dark' to flip the default

  function applyTheme(isLight, animate) {
    if (animate) {
      body.classList.add('theme-transitioning');
      setTimeout(() => body.classList.remove('theme-transitioning'), 400);
    }
    body.classList.toggle(LIGHT_CLASS, isLight);

    if (isLight) {
      themeIcon.className = 'bx bx-moon';
      toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      themeIcon.className = 'bx bx-sun';
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  // Load saved preference, fall back to DEFAULT_THEME
  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme((saved ?? DEFAULT_THEME) === 'light', false);

  toggleBtn.addEventListener('click', () => {
    const goingLight = !body.classList.contains(LIGHT_CLASS);
    localStorage.setItem(STORAGE_KEY, goingLight ? 'light' : 'dark');
    applyTheme(goingLight, true);
  });
})();

// ─── Dynamic Experience Years ──────────────────────────────────────────
const startYear = 2020;
const currentYear = new Date().getFullYear();
const experienceYears = currentYear - startYear;
document.getElementById('NumOfExpYears').textContent = `+${experienceYears}`;

// ─── Navbar scroll effect ─────────────────────────────────
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back-to-top button
  if (scrollY > 500) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }

  // AOS (scroll reveal)
  revealElements();
}, { passive: true });

// ─── Back to top ──────────────────────────────────────────
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Hamburger / Mobile Menu ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ─── AOS — Scroll Reveal ──────────────────────────────────
function revealElements() {
  const elements = document.querySelectorAll('[data-aos]');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 80) {
      el.classList.add('aos-animate');
    }
  });
}
// Fire once on load
window.addEventListener('load', revealElements);

// ─── Particle Canvas ──────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => {
    resize();
    initParticleArray();
  }, { passive: true });

  const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#a78bfa'];

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.18, 0.18),
      radius: randomBetween(1, 2.5),
      alpha: randomBetween(0.15, 0.55),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function initParticleArray() {
    const count = Math.floor((canvas.width * canvas.height) / 14000);
    particles = Array.from({ length: count }, createParticle);
  }
  initParticleArray();

  function drawLines() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLines();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    animFrame = requestAnimationFrame(animate);
  }

  animate();
})();

// ─── Disable context menu (right-click) ───────────────────
window.addEventListener('contextmenu', e => e.preventDefault());
