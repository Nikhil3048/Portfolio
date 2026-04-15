/**
 * main.js — Core initialization: navigation, scroll, custom cursor, page loader
 */

// =============================================
// PAGE LOADER
// =============================================
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadclassList.add('hidden');
      document.body.style.overflow = '';
    }, 1600);
  });

  document.body.style.overflow = 'hidden';
}

// =============================================
// NAVIGATION
// =============================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link:not(.nav-cta)');

  if (!navbar) return;

  // Scroll detection for navbar background
  let lastScrollY = 0;
  const scrollHandler = () => {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
    updateActiveNavLink();
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler(); // Initial run

  // Hamburger menu
  if (hamburger && navLinks) {
    hamburgaddEventListener('click', () => {
      hamburgclassList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu on nav link click
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburgclassList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburgclassList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  // Active link tracking
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (navLink) {
        if (scrollPos >= top && scrollPos < bottom) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }
}

// =============================================
// SMOOTH SCROLL
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height'), 10) || 70;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    });
  });
}

// =============================================
// CUSTOM CURSOR (Desktop)
// =============================================
function initCustomCursor() {
  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  if (!cursor || !cursorRing) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function updateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(updateRing);
  }
  updateRing();

  // Hover effects
  const hoverables = document.querySelectorAll(
    'a, button, .project-card, .skill-item, .blog-card, .social-link, .filter-btn'
  );

  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorRing.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorRing.classList.remove('hover');
    });
  });
}

// =============================================
// RIPPLE EFFECT ON BUTTONS
// =============================================
function initRipple() {
  document.querySelectorAll('.btn, .filter-btn').forEach(btn => {
    btn.classList.add('ripple-container');
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
      btn.style.transform = 'translateY(10px)';
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =============================================
// ACTIVE SECTION HIGHLIGHT (progress bar optional)
// =============================================
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrolled / max) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });
}

// =============================================
// COPY EMAIL TO CLIPBOARD
// =============================================
function initCopyEmail() {
  const emailBtns = document.querySelectorAll('[data-copy-email]');
  emailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-copy-email');
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! 📋', 'success');
      }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Email copied! 📋', 'success');
      });
    });
  });
}

// Toast helper (also used by contact.js)
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${message}`;
  containappendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// =============================================
// INIT ALL
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initSmoothScroll();
  initCustomCursor();
  initRipple();
  initBackToTop();
  initScrollProgress();
  initCopyEmail();
});
