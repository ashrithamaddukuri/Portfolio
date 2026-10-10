/* ==================== AOS INIT ==================== */
AOS.init({ duration: 800, once: false, mirror: true });

/* ==================== CURSOR GLOW ==================== */
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* ==================== SCROLL PROGRESS BAR ==================== */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

/* ==================== NAVBAR SCROLL BEHAVIOR ==================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 280;
    if (scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) navbar.style.background = 'rgba(8, 11, 16, 0.95)';
  else navbar.style.background = 'rgba(8, 11, 16, 0.8)';
});

/* ==================== SMOOTH SCROLL NAV ==================== */
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href').substring(1);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  });
});

/* ==================== HERO NAME LETTER-BY-LETTER ANIMATION ==================== */
function animateLetters(element, text, startDelay = 0) {
  element.innerHTML = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'letter';
    span.style.animationDelay = (startDelay + i * 0.05) + 's';
    element.appendChild(span);
  });
}
animateLetters(document.getElementById('firstName'), 'Ashritha', 0.2);
animateLetters(document.getElementById('lastName'), 'Maddukuri', 0.6);

/* ==================== COUNTER ANIMATION ==================== */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.decimal === 'true';
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutQuart
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = target * eased;

    if (isDecimal) {
      el.textContent = current.toFixed(2) + suffix;
    } else {
      el.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
    }
  }
  requestAnimationFrame(update);
}

/* Trigger counters when hero is in view */
const heroStats = document.querySelectorAll('.stat span[data-count]');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
heroStats.forEach(stat => heroObserver.observe(stat));

/* ==================== SECTION TITLE LINE ANIMATION ==================== */
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-line');
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-title').forEach(title => titleObserver.observe(title));

/* ==================== SKILL TAG STAGGERED REVEAL ==================== */
const tagObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.skill-tag');
      tags.forEach((tag, i) => {
        setTimeout(() => tag.classList.add('revealed'), i * 50);
      });
      tagObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-category').forEach(cat => tagObserver.observe(cat));

/* ==================== ACHIEVEMENT ITEMS STAGGERED REVEAL ==================== */
const achiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.achi-item');
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('revealed'), i * 100);
      });
      achiObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const achiGrid = document.getElementById('achievementsGrid');
if (achiGrid) achiObserver.observe(achiGrid);

/* ==================== PARALLAX HERO ON MOUSE MOVE ==================== */
const heroAvatar = document.querySelector('.hero-avatar');
const heroSection = document.getElementById('home');
if (heroSection && heroAvatar) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroAvatar.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroAvatar.style.transform = '';
  });
}
