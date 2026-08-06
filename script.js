/* ============================================
   Sujan Singh — Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Typing Animation ──────────────────────────
  const typingPhrases = [
    'Aspiring Data Analyst',
    'B.Tech CSE (AI & ML)',
    'Python Enthusiast',
    'Problem Solver',
    'Data Visualization Lover'
  ];

  const typingEl = document.getElementById('typingText');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 1800;
  const pauseStart = 400;

  function typeLoop() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (!isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseEnd);
        return;
      }
      setTimeout(typeLoop, typeSpeed);
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        setTimeout(typeLoop, pauseStart);
        return;
      }
      setTimeout(typeLoop, deleteSpeed);
    }
  }

  typeLoop();

  // ── Navbar scroll effect ───────────────────────
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Active nav link highlight ──────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ── Hamburger menu ─────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('open');
  });

  // Close menu on link click
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinksEl.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    }
  });

  // ── Scroll Reveal with IntersectionObserver ────
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Contact form handling (frontend only) ──────
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  });

  // ── Smooth scroll for all anchor links ─────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Parallax orbs on mouse move (desktop) ──────
  const orbs = document.querySelectorAll('.bg-orb');

  if (window.matchMedia('(min-width: 768px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 8;
        orb.style.transform = `translate(${xRatio * speed}px, ${yRatio * speed}px)`;
      });
    });
  }

});
