/**
 * Premium Portfolio Site - Main JavaScript
 * Clean vanilla JS with modern features
 * No external dependencies required
 */

class PortfolioApp {
  constructor() {
    this.initializeProperties();
    this.initializeObservers();
    this.attachEventListeners();
    this.setupPageLoad();
  }

  initializeProperties() {
    // DOM elements with null checks
    this.nav = document.querySelector('nav');
    this.navToggle = document.querySelector('[data-nav-toggle]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.menuOverlay = document.querySelector('[data-menu-overlay]');
    this.body = document.body;
    this.backToTop = document.querySelector('[data-back-to-top]');
    this.filterButtons = document.querySelectorAll('[data-filter]');
    this.projectCards = document.querySelectorAll('[data-project]');
    this.countriesTicker = document.querySelector('[data-countries-ticker]');

    // State tracking
    this.lastScrollY = 0;
    this.navVisible = true;
    this.menuOpen = false;
    this.scrollDirection = 'down';
    this.scrollThreshold = 100;
    this.currentFilter = 'All';
  }

  initializeObservers() {
    // Scroll reveal observer with staggered delays
    this.revealObserver = new IntersectionObserver(
      (entries) => this.handleReveal(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Image lazy loading observer
    this.imageObserver = new IntersectionObserver(
      (entries) => this.handleImageLoad(entries),
      {
        threshold: 0.01,
        rootMargin: '50px'
      }
    );

    // Background image lazy loading observer
    this.bgImageObserver = new IntersectionObserver(
      (entries) => this.handleBgImageLoad(entries),
      {
        threshold: 0.01,
        rootMargin: '50px'
      }
    );

    // Observe reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
      this.revealObserver.observe(el);
    });

    // Observe lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.imageObserver.observe(img);
    });

    // Observe background images
    document.querySelectorAll('[data-bg]').forEach(el => {
      this.bgImageObserver.observe(el);
    });
  }

  attachEventListeners() {
    // Navigation toggle with aria attributes
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Menu overlay click
    if (this.menuOverlay) {
      this.menuOverlay.addEventListener('click', () => this.closeMobileMenu());
    }

    // Close mobile menu on link click
    const mobileNavLinks = document.querySelectorAll('[data-mobile-menu] a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Scroll events with nav behavior
    window.addEventListener('scroll', () => this.handleScroll());

    // Back to top button
    if (this.backToTop) {
      this.backToTop.addEventListener('click', () => this.scrollToTop());
    }

    // Project filtering
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilter(e));
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => this.handleSmoothScroll(e));
    });

    // Initialize countries ticker animation
    this.initializeCountriesTicker();
  }

  // ============ SCROLL REVEAL ============
  handleReveal(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = index * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }

  // ============ IMAGE LAZY LOADING ============
  handleImageLoad(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');

        if (src) {
          img.src = src;
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          this.imageObserver.unobserve(img);
        }
      }
    });
  }

  // ============ BACKGROUND IMAGE LAZY LOADING ============
  handleBgImageLoad(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bgSrc = entry.target.getAttribute('data-bg');

        if (bgSrc) {
          entry.target.style.backgroundImage = `url('${bgSrc}')`;
          entry.target.classList.add('loaded');
          this.bgImageObserver.unobserve(entry.target);
        }
      }
    });
  }

  // ============ NAVIGATION ============
  handleScroll() {
    const currentScrollY = window.scrollY;

    // Add .scrolled class when scrollY > 50
    if (this.nav) {
      if (currentScrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    }

    // Determine scroll direction
    if (currentScrollY > this.lastScrollY) {
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }

    // Hide/show nav based on scroll direction
    if (this.nav) {
      if (this.scrollDirection === 'down' && currentScrollY > this.scrollThreshold) {
        this.nav.classList.add('nav-hidden');
        this.navVisible = false;
      } else {
        this.nav.classList.remove('nav-hidden');
        this.navVisible = true;
      }
    }

    // Update active nav links
    this.updateActiveNavLinks();

    // Show/hide back to top button
    if (this.backToTop) {
      if (currentScrollY > 500) {
        this.backToTop.classList.add('visible');
      } else {
        this.backToTop.classList.remove('visible');
      }
    }

    this.lastScrollY = currentScrollY;
  }

  updateActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // ============ MOBILE MENU ============
  toggleMobileMenu() {
    if (this.menuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.menuOpen = true;
    if (this.mobileMenu) {
      this.mobileMenu.classList.add('open');
      this.mobileMenu.setAttribute('aria-expanded', 'true');
    }
    if (this.menuOverlay) {
      this.menuOverlay.classList.add('visible');
      this.menuOverlay.setAttribute('aria-hidden', 'false');
    }
    if (this.navToggle) {
      this.navToggle.setAttribute('aria-expanded', 'true');
    }
    this.lockScroll();
  }

  closeMobileMenu() {
    this.menuOpen = false;
    if (this.mobileMenu) {
      this.mobileMenu.classList.remove('open');
      this.mobileMenu.setAttribute('aria-expanded', 'false');
    }
    if (this.menuOverlay) {
      this.menuOverlay.classList.remove('visible');
      this.menuOverlay.setAttribute('aria-hidden', 'true');
    }
    if (this.navToggle) {
      this.navToggle.setAttribute('aria-expanded', 'false');
    }
    this.unlockScroll();
  }

  lockScroll() {
    this.body.style.overflow = 'hidden';
    this.body.style.paddingRight = this.getScrollbarWidth() + 'px';
  }

  unlockScroll() {
    this.body.style.overflow = '';
    this.body.style.paddingRight = '';
  }

  getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);
    return scrollbarWidth;
  }

  // ============ SMOOTH SCROLLING ============
  handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');

    if (!href || !href.startsWith('#') || href === '#') {
      return;
    }

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const targetPosition = target.offsetTop - (this.nav?.offsetHeight || 0);

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      if (this.menuOpen) {
        this.closeMobileMenu();
      }
    }
  }

  // ============ BACK TO TOP ============
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ============ PROJECT FILTERING ============
  handleFilter(e) {
    const category = e.target.getAttribute('data-filter');
    if (!category) return;

    // Update active button state
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    this.currentFilter = category;
    this.filterProjects(category);
  }

  filterProjects(category) {
    this.projectCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-project');
      if (!cardCategory) return;

      // Fix: Use includes/contains match instead of exact match
      const isVisible = category === 'All' || cardCategory.toLowerCase().includes(category.toLowerCase());

      // Stagger animation
      card.style.transitionDelay = `${index * 50}ms`;

      if (isVisible) {
        card.classList.remove('hidden');
        card.classList.add('visible');
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });
  }

  // ============ PAGE LOAD ANIMATION ============
  setupPageLoad() {
    // Stagger fade-in of hero elements
    const heroElements = document.querySelectorAll('.hero-animate');

    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.8s ease-out';
      el.style.transitionDelay = `${index * 150}ms`;

      // Trigger animation on next frame
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  // ============ COUNTRIES TICKER ============
  initializeCountriesTicker() {
    if (!this.countriesTicker) return;

    const tickerContent = this.countriesTicker.querySelector('[data-ticker-content]');
    if (!tickerContent) return;

    // Clone content for seamless infinite scroll
    const originalContent = tickerContent.innerHTML;
    tickerContent.innerHTML = originalContent + originalContent;

    // Add animation
    this.countriesTicker.style.overflow = 'hidden';
    tickerContent.style.display = 'flex';
    tickerContent.style.animation = 'scroll-ticker 30s linear infinite';

    // Ensure animation is defined in CSS
    this.ensureTickerAnimation();
  }

  ensureTickerAnimation() {
    let style = document.getElementById('ticker-animation');

    if (!style) {
      style = document.createElement('style');
      style.id = 'ticker-animation';
      style.textContent = `
        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============ CURSOR EFFECTS ============
  initializeCursorEffects() {
    const workCards = document.querySelectorAll('[data-work-card]');

    workCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.cursor = 'none';
        this.createCustomCursor(card);
      });

      card.addEventListener('mouseleave', () => {
        card.style.cursor = 'auto';
      });

      card.addEventListener('mousemove', (e) => {
        this.updateCustomCursor(e, card);
      });
    });
  }

  createCustomCursor(card) {
    if (card.querySelector('.custom-cursor')) {
      return;
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid currentColor;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.6;
      transition: all 0.15s ease-out;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    `;
    document.body.appendChild(cursor);

    card._customCursor = cursor;
  }

  updateCustomCursor(e, card) {
    const cursor = card._customCursor;
    if (!cursor) return;

    cursor.style.left = (e.clientX - 20) + 'px';
    cursor.style.top = (e.clientY - 20) + 'px';
  }
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new PortfolioApp();

  // Initialize cursor effects if work cards exist
  if (document.querySelector('[data-work-card]')) {
    window.portfolio.initializeCursorEffects();
  }
});

// Expose utilities for external use
window.PortfolioUtils = {
  /**
   * Programmatically scroll to a section
   * @param {string} sectionId - The ID of the section to scroll to
   */
  scrollToSection(sectionId) {
    const link = document.querySelector(`a[href="#${sectionId}"]`);
    if (link) link.click();
  },

  /**
   * Filter projects by category
   * @param {string} category - The category to filter by
   */
  filterProjects(category) {
    const button = document.querySelector(`[data-filter="${category}"]`);
    if (button) button.click();
  },

  /**
   * Programmatically toggle mobile menu
   */
  toggleMenu() {
    if (window.portfolio) {
      window.portfolio.toggleMobileMenu();
    }
  },

  /**
   * Check if mobile menu is currently open
   * @returns {boolean}
   */
  isMenuOpen() {
    return window.portfolio ? window.portfolio.menuOpen : false;
  }
};

// Performance monitoring (optional)
if (window.performance && window.performance.mark) {
  window.performance.mark('portfolio-js-loaded');
  window.addEventListener('load', () => {
    window.performance.mark('portfolio-fully-loaded');
    window.performance.measure('portfolio-load-time', 'portfolio-js-loaded', 'portfolio-fully-loaded');
  });
}
