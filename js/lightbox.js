/**
 * PortfolioLightbox - Production-Quality Image Gallery Lightbox
 *
 * Features:
 * - Click to open gallery images
 * - Keyboard navigation (Arrow keys, Escape)
 * - Touch swipe support for mobile
 * - Pinch-to-zoom on mobile devices
 * - Image preloading for smooth transitions
 * - Image counter and captions
 * - Smooth fade transitions
 * - Body scroll prevention when open
 * - Auto-initialization on DOMContentLoaded
 */

class PortfolioLightbox {
  constructor() {
    this.isOpen = false;
    this.currentIndex = 0;
    this.images = [];
    this.currentGallery = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    this.init();
  }

  /**
   * Initialize the lightbox - inject CSS and set up event listeners
   */
  init() {
    this.injectStyles();
    this.scanForGalleries();
    this.setupEventListeners();
  }

  /**
   * Inject all required CSS into the document
   */
  injectStyles() {
    const styles = `
      /* Lightbox Container */
      .portfolio-lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .portfolio-lightbox.active {
        display: flex;
        opacity: 1;
      }

      /* Main Container */
      .lightbox-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      /* Image Container */
      .lightbox-image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
      }

      .lightbox-image-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 90vw;
        max-height: 85vh;
        overflow: hidden;
      }

      .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.4s ease;
        cursor: grab;
        user-select: none;
        touch-action: pinch-zoom;
      }

      .lightbox-image.loaded {
        opacity: 1;
      }

      .lightbox-image.dragging {
        cursor: grabbing;
      }

      /* Close Button */
      .lightbox-close {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 28px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        z-index: 10001;
        font-family: 'DM Sans', sans-serif;
        font-weight: 300;
        line-height: 1;
      }

      .lightbox-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }

      .lightbox-close:active {
        transform: scale(0.95);
      }

      /* Navigation Arrows */
      .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        height: 60px;
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: #ffffff;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        z-index: 10001;
        font-family: 'DM Sans', sans-serif;
        font-weight: 300;
      }

      .lightbox-nav:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) scale(1.1);
      }

      .lightbox-nav:active {
        transform: translateY(-50%) scale(0.95);
      }

      .lightbox-prev {
        left: 30px;
      }

      .lightbox-next {
        right: 30px;
      }

      /* Counter */
      .lightbox-counter {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        color: #ffffff;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 10001;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 8px 16px;
        border-radius: 20px;
        letter-spacing: 0.5px;
      }

      /* Caption */
      .lightbox-caption {
        position: absolute;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        max-width: 600px;
        text-align: center;
        color: #ffffff;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 400;
        line-height: 1.5;
        z-index: 10001;
        padding: 0 30px;
        animation: fadeIn 0.4s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      /* Backdrop */
      .lightbox-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
      }

      /* Responsive - Tablet and Mobile */
      @media (max-width: 768px) {
        .lightbox-close {
          width: 44px;
          height: 44px;
          font-size: 24px;
          top: 20px;
          right: 20px;
        }

        .lightbox-nav {
          width: 50px;
          height: 50px;
          font-size: 20px;
        }

        .lightbox-prev {
          left: 15px;
        }

        .lightbox-next {
          right: 15px;
        }

        .lightbox-counter {
          bottom: 20px;
          font-size: 13px;
          padding: 6px 12px;
        }

        .lightbox-caption {
          bottom: 80px;
          font-size: 14px;
          padding: 0 20px;
        }

        .lightbox-image-container {
          max-width: 95vw;
          max-height: 80vh;
        }
      }

      @media (max-width: 480px) {
        .lightbox-close {
          width: 40px;
          height: 40px;
          font-size: 20px;
          top: 15px;
          right: 15px;
        }

        .lightbox-nav {
          width: 44px;
          height: 44px;
          font-size: 18px;
        }

        .lightbox-prev {
          left: 10px;
        }

        .lightbox-next {
          right: 10px;
        }

        .lightbox-counter {
          bottom: 15px;
          font-size: 12px;
          padding: 5px 10px;
        }

        .lightbox-caption {
          bottom: 70px;
          font-size: 13px;
          padding: 0 15px;
        }

        .lightbox-image-container {
          max-width: 100vw;
          max-height: 75vh;
        }
      }

      /* Prevent body scroll when lightbox is open */
      body.lightbox-open {
        overflow: hidden;
      }

      /* Loading state */
      .lightbox-image.loading {
        opacity: 0.5;
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  /**
   * Scan the DOM for gallery containers and set up click handlers
   */
  scanForGalleries() {
    // Look for images with .gallery-image class or inside .project-gallery containers
    const galleryImages = document.querySelectorAll(
      '.gallery-image, .project-gallery img, [data-lightbox] img'
    );

    galleryImages.forEach((img) => {
      // Skip if already processed
      if (img.hasAttribute('data-lightbox-ready')) return;

      img.setAttribute('data-lightbox-ready', 'true');
      img.style.cursor = 'pointer';

      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openLightbox(img);
      });
    });
  }

  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextImage();
          break;
        case 'Escape':
          e.preventDefault();
          this.closeLightbox();
          break;
      }
    });

    // Touch swipe and pinch-zoom
    document.addEventListener('touchstart', (e) => {
      if (!this.isOpen) return;
      this.handleTouchStart(e);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!this.isOpen) return;
      this.handleTouchMove(e);
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (!this.isOpen) return;
      this.handleTouchEnd(e);
    }, { passive: true });

    // Re-scan for new galleries when DOM changes
    const observer = new MutationObserver(() => {
      this.scanForGalleries();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Open the lightbox with the clicked image
   */
  openLightbox(imgElement) {
    // Find the gallery container
    const container = imgElement.closest('[data-lightbox]') || imgElement.closest('.project-gallery');
    const gallery = container || imgElement.parentElement;

    // Get all images in the gallery
    this.images = Array.from(
      gallery.querySelectorAll('img.gallery-image, img')
    ).filter((img) => {
      return img.closest('[data-lightbox]') === container || img.closest('.project-gallery') === gallery;
    });

    // Find current image index
    this.currentIndex = this.images.indexOf(imgElement);
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
    }

    this.currentGallery = gallery;
    this.isOpen = true;

    // Create and show lightbox
    this.createLightbox();
    this.displayImage(this.currentIndex);

    // Prevent body scroll
    document.body.classList.add('lightbox-open');

    // Preload adjacent images
    this.preloadAdjacentImages();
  }

  /**
   * Create the lightbox DOM structure
   */
  createLightbox() {
    // Check if lightbox already exists
    let lightbox = document.getElementById('portfolio-lightbox');
    if (lightbox) {
      lightbox.classList.add('active');
      return;
    }

    lightbox = document.createElement('div');
    lightbox.id = 'portfolio-lightbox';
    lightbox.className = 'portfolio-lightbox active';

    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">✕</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
        <button class="lightbox-nav lightbox-next" aria-label="Next image">›</button>

        <div class="lightbox-image-wrapper">
          <div class="lightbox-backdrop"></div>
          <div class="lightbox-image-container">
            <img class="lightbox-image" alt="Gallery image" />
          </div>
        </div>

        <div class="lightbox-caption" style="display: none;"></div>
        <div class="lightbox-counter"></div>
      </div>
    `;

    document.body.appendChild(lightbox);

    // Set up lightbox event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      this.closeLightbox();
    });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
      this.previousImage();
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
      this.nextImage();
    });

    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', () => {
      this.closeLightbox();
    });

    // Mouse drag for zoom/pan
    const imgElement = lightbox.querySelector('.lightbox-image');
    imgElement.addEventListener('mousedown', (e) => {
      if (this.zoomLevel <= 1) return;
      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
      imgElement.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging || this.zoomLevel <= 1) return;
      this.panX = e.clientX - this.dragStartX;
      this.panY = e.clientY - this.dragStartY;
      this.updateImageTransform();
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      imgElement.classList.remove('dragging');
    });

    // Mouse wheel zoom
    lightbox.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        this.zoomLevel = Math.max(1, Math.min(3, this.zoomLevel + delta));
        this.updateImageTransform();
      }
    });
  }

  /**
   * Display image at the given index
   */
  displayImage(index) {
    if (!this.images[index]) return;

    const lightbox = document.getElementById('portfolio-lightbox');
    const imgElement = lightbox.querySelector('.lightbox-image');
    const captionElement = lightbox.querySelector('.lightbox-caption');
    const counterElement = lightbox.querySelector('.lightbox-counter');

    // Reset zoom and pan
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;

    // Load image
    const srcImage = this.images[index];
    const src = srcImage.src || srcImage.getAttribute('data-src');
    const caption = srcImage.getAttribute('data-caption') || '';

    imgElement.classList.remove('loaded');
    imgElement.classList.add('loading');

    // Handle image loading
    const newImg = new Image();
    newImg.onload = () => {
      imgElement.src = src;
      setTimeout(() => {
        imgElement.classList.remove('loading');
        imgElement.classList.add('loaded');
      }, 10);
    };
    newImg.onerror = () => {
      imgElement.src = src;
      imgElement.classList.remove('loading');
      imgElement.classList.add('loaded');
    };
    newImg.src = src;

    // Update caption
    if (caption) {
      captionElement.textContent = caption;
      captionElement.style.display = 'block';
    } else {
      captionElement.style.display = 'none';
    }

    // Update counter
    counterElement.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
  }

  /**
   * Update image transform for zoom and pan
   */
  updateImageTransform() {
    const lightbox = document.getElementById('portfolio-lightbox');
    const imgElement = lightbox.querySelector('.lightbox-image');

    imgElement.style.transform = `scale(${this.zoomLevel}) translate(${this.panX}px, ${this.panY}px)`;
  }

  /**
   * Show next image
   */
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.displayImage(this.currentIndex);
    this.preloadAdjacentImages();
  }

  /**
   * Show previous image
   */
  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.displayImage(this.currentIndex);
    this.preloadAdjacentImages();
  }

  /**
   * Close the lightbox
   */
  closeLightbox() {
    const lightbox = document.getElementById('portfolio-lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    this.isOpen = false;
    document.body.classList.remove('lightbox-open');

    setTimeout(() => {
      if (lightbox && lightbox.parentElement) {
        lightbox.remove();
      }
    }, 300);
  }

  /**
   * Preload adjacent images for smooth transitions
   */
  preloadAdjacentImages() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;

    [nextIndex, prevIndex].forEach((index) => {
      if (this.images[index]) {
        const src = this.images[index].src || this.images[index].getAttribute('data-src');
        const img = new Image();
        img.src = src;
      }
    });
  }

  /**
   * Handle touch start - detect swipe and pinch
   */
  handleTouchStart(e) {
    if (e.touches.length === 2) {
      // Pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      this.touchStartX = distance;
    } else if (e.touches.length === 1) {
      // Swipe or single touch drag
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  }

  /**
   * Handle touch move - handle pinch zoom and drag
   */
  handleTouchMove(e) {
    if (e.touches.length === 2) {
      // Pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (this.touchStartX > 0) {
        const scale = distance / this.touchStartX;
        this.zoomLevel = Math.max(1, Math.min(3, this.zoomLevel * scale));
        this.touchStartX = distance;
        this.updateImageTransform();
      }
    } else if (e.touches.length === 1 && this.zoomLevel > 1) {
      // Single touch pan when zoomed
      const lightbox = document.getElementById('portfolio-lightbox');
      const imgElement = lightbox.querySelector('.lightbox-image');
      const rect = imgElement.getBoundingClientRect();
      const maxPan = (this.zoomLevel - 1) * 100;

      const deltaX = e.touches[0].clientX - this.touchStartX;
      const deltaY = e.touches[0].clientY - this.touchStartY;

      this.panX = Math.max(-maxPan, Math.min(maxPan, this.panX + deltaX * 0.1));
      this.panY = Math.max(-maxPan, Math.min(maxPan, this.panY + deltaY * 0.1));

      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;

      this.updateImageTransform();
    }
  }

  /**
   * Handle touch end - detect swipe direction
   */
  handleTouchEnd(e) {
    if (e.touches.length > 0) return;

    const lightbox = document.getElementById('portfolio-lightbox');
    if (!lightbox) return;

    // Only detect swipe if not zoomed
    if (this.zoomLevel === 1) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = this.touchStartX - touchEndX;
      const deltaY = Math.abs(this.touchStartY - touchEndY);

      // Detect swipe (horizontal movement > 50px and vertical < horizontal)
      if (Math.abs(deltaX) > 50 && deltaY < 40) {
        if (deltaX > 0) {
          this.nextImage();
        } else {
          this.previousImage();
        }
      }
    } else {
      // Reset touch tracking when zoomed
      this.touchStartX = 0;
      this.touchStartY = 0;
    }
  }
}

// Auto-initialize the lightbox on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioLightbox();
});

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PortfolioLightbox();
  });
} else {
  new PortfolioLightbox();
}
