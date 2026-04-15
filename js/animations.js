/**
 * animations.js — Scroll-based reveal animations using IntersectionObserver
 */

class ScrollAnimator {
  constructor() {
    this.observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    };

    this.skillsObserverOptions = {
      threshold: 0.3,
    };

    this.init();
  }

  init() {
    this.setupRevealObserver();
    this.setupSkillBarsObserver();
    this.setupCounterObserver();
    this.setupTimelineObserver();
  }

  // ——— Reveal Observer ———
  setupRevealObserver() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after first reveal for performance
          revealObservunobserve(entry.target);
        }
      });
    }, this.observerOptions);

    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    revealElements.forEach(el => revealObservobserve(el));
  }

  // ——— Skill Bars Observer ———
  setupSkillBarsObserver() {
    const skillBarsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach((fill, idx) => {
            const targetWidth = fill.getAttribute('data-width');
            setTimeout(() => {
              fill.style.width = targetWidth + '%';
            }, idx * 120);
          });
          skillBarsObservunobserve(entry.target);
        }
      });
    }, this.skillsObserverOptions);

    const skillCategories = document.querySelectorAll('.skills-category');
    skillCategories.forEach(cat => skillBarsObservobserve(cat));
  }

  // ——— Counter Observer (hero stats) ———
  setupCounterObserver() {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach(counter => this.animateCounter(counter));
          counterObservunobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) counterObservobserve(statsEl);
  }

  animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  // ——— Timeline Observer ———
  setupTimelineObserver() {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, idx * 150);
          timelineObservunobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.classList.add('reveal');
      timelineObservobserve(item);
    });
  }
}

// Typewriter effect
class TypeWriter {
  constructor(element, strings, options = {}) {
    this.element = element;
    this.strings = strings;
    this.typeSpeed = options.typeSpeed || 80;
    this.deleteSpeed = options.deleteSpeed || 50;
    this.pauseEnd = options.pauseEnd || 2000;
    this.pauseStart = options.pauseStart || 400;
    this.currentString = 0;
    this.currentChar = 0;
    this.isDeleting = false;
    this.loop();
  }

  loop() {
    const current = this.strings[this.currentString];

    if (this.isDeleting) {
      this.currentChar--;
    } else {
      this.currentChar++;
    }

    this.element.textContent = current.substring(0, this.currentChar);

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    // At full string — pause before deleting
    if (!this.isDeleting && this.currentChar === current.length) {
      delay = this.pauseEnd;
      this.isDeleting = true;
    }
    // Fully deleted — move to next string
    else if (this.isDeleting && this.currentChar === 0) {
      this.isDeleting = false;
      this.currentString = (this.currentString + 1) % this.strings.length;
      delay = this.pauseStart;
    }

    setTimeout(() => this.loop(), delay);
  }
}

// Project card filter
class ProjectFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        this.filter(filter);
      });
    });
  }

  filter(category) {
    this.projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      const shouldShow = category === 'all' || categories.includes(category);

      if (shouldShow) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimator();
  new ProjectFilter();

  // Typewriter for hero
  const typewriterEl = document.querySelector('.typewriter-text');
  if (typewriterEl) {
    new TypeWriter(typewriterEl, [
      'Building AI-powered solutions ✨',
      'Exploring Data Science 📊',
      'Crafting ML Models 🤖',
      'Learning every day 🚀',
      'Open to opportunities 💼',
    ]);
  }
});
