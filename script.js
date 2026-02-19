// ===== Lessgooo AI — Interactive Script =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ===== Mobile Nav Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Setting Chips Toggle =====
  document.querySelectorAll('.setting-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // ===== Access Modal Logic =====
  const accessModal = document.getElementById('accessModal');
  const accessModalClose = document.getElementById('accessModalClose');

  function showAccessModal(e) {
    e.preventDefault();
    e.stopPropagation();
    if (accessModal) {
      accessModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function hideAccessModal() {
    if (accessModal) {
      accessModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Intercept all generator launch buttons
  document.querySelectorAll('.btn-launch').forEach(btn => {
    btn.addEventListener('click', showAccessModal);
  });

  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', showAccessModal);
  }

  // Close modal
  if (accessModalClose) {
    accessModalClose.addEventListener('click', hideAccessModal);
  }

  if (accessModal) {
    accessModal.addEventListener('click', (e) => {
      if (e.target === accessModal) hideAccessModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideAccessModal();
    });
  }

  // ===== Hero Progress Bar Animation =====
  const heroProgress = document.getElementById('heroProgress');
  if (heroProgress) {
    let progress = 35;
    let direction = 1;

    setInterval(() => {
      progress += direction * 0.5;
      if (progress >= 65) direction = -1;
      if (progress <= 25) direction = 1;
      heroProgress.style.width = progress + '%';
    }, 100);
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ===== Textarea Auto-resize =====
  const promptInput = document.getElementById('promptInput');
  if (promptInput) {
    promptInput.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.max(120, this.scrollHeight) + 'px';
    });
  }

  // ===== Ambient Floating Particles =====
  function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = '-10px';
      particle.style.background = Math.random() > 0.5
        ? 'rgba(79, 143, 255, 0.6)'
        : 'rgba(155, 92, 255, 0.6)';
      particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 8) + 's';
      hero.appendChild(particle);
    }
  }

  createParticles();

  // ===== Typing Effect for Prompt Placeholder =====
  const placeholderTexts = [
    'A futuristic city at sunset with flying cars...',
    'A lone astronaut walking on Mars with Earth in the sky...',
    'Ocean waves crashing in slow motion during golden hour...',
    'A cyberpunk street scene with neon signs and rain...',
    'Northern lights dancing over snow-covered mountains...'
  ];

  let placeholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typePlaceholder() {
    if (!promptInput || document.activeElement === promptInput) {
      setTimeout(typePlaceholder, 1000);
      return;
    }

    const currentText = placeholderTexts[placeholderIndex];

    if (!isDeleting) {
      promptInput.placeholder = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typePlaceholder, 2000);
        return;
      }
    } else {
      promptInput.placeholder = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        placeholderIndex = (placeholderIndex + 1) % placeholderTexts.length;
      }
    }

    const speed = isDeleting ? 30 : 50;
    setTimeout(typePlaceholder, speed);
  }

  setTimeout(typePlaceholder, 2000);

});
