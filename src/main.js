/* =========================================
   🌴 MIRISSA — Interactive JavaScript
   ========================================= */

// ---------- Navbar Scroll Effect ----------
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ---------- Mobile Nav Toggle ----------
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---------- Active Nav Link on Scroll ----------
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-link');

const activateNavLink = () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkElements.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateNavLink);

// ---------- Scroll-Triggered Animations ----------
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1,
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => scrollObserver.observe(el));

// ---------- Counter Animation (Hero Stats) ----------
const counterElements = document.querySelectorAll('.stat-number[data-target]');

const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'), 10);
  const duration = 2000;
  const startTime = performance.now();

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = Math.round(easedProgress * target);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

// Observe counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

// ---------- Smooth Scroll for CTA Buttons ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// ---------- Parallax Effect on Hero Image ----------
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    const offset = window.scrollY * 0.4;
    heroImage.style.transform = `scale(1.05) translateY(${offset}px)`;
  }
});

// ---------- Gallery Lightbox Effect ----------
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption h4');

    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      cursor: zoom-out;
      animation: fadeIn 0.3s ease;
      padding: 2rem;
    `;

    const lightboxImg = document.createElement('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.style.cssText = `
      max-width: 90vw;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    if (caption) {
      const lightboxCaption = document.createElement('p');
      lightboxCaption.textContent = caption.textContent;
      lightboxCaption.style.cssText = `
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
        font-family: 'Outfit', sans-serif;
      `;
      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(lightboxCaption);
    } else {
      lightbox.appendChild(lightboxImg);
    }

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 1.2rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    `;
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    lightbox.appendChild(closeBtn);

    const closeLightbox = () => {
      lightbox.style.opacity = '0';
      lightbox.style.transition = 'opacity 0.3s';
      setTimeout(() => lightbox.remove(), 300);
    };

    lightbox.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    document.body.appendChild(lightbox);
  });
});

// Inject lightbox keyframes
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(lightboxStyles);

// ---------- Floating Particles Background ----------
const createParticles = () => {
  const hero = document.querySelector('.hero');
  const particleContainer = document.createElement('div');
  particleContainer.style.cssText = `
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
  `;
  hero.appendChild(particleContainer);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.4 + 0.1;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, ${opacity});
      border-radius: 50%;
      left: ${left}%;
      bottom: -10px;
      animation: particleFloat ${duration}s linear ${delay}s infinite;
    `;
    particleContainer.appendChild(particle);
  }

  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes particleFloat {
      0% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}50px) scale(0.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleStyle);
};

createParticles();

// ---------- Tilt Effect on Gallery Items ----------
galleryItems.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    item.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    item.style.transition = 'transform 0.5s ease';
  });

  item.addEventListener('mouseenter', () => {
    item.style.transition = 'none';
  });
});

console.log('🌴 Mirissa — Sri Lanka\'s Tropical Paradise loaded successfully!');
