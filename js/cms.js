// CMS System - Loads portfolio content from Supabase
// Initialized on every page to populate dynamic content

const SUPABASE_URL = 'https://cgzqnnssbijfpuymnoqe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnenFubnNzYmlqZnB1eW1ub3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjIyODEsImV4cCI6MjA4OTc5ODI4MX0.eUpWahjSdumf7nOLXemgi_Qc6JrXHdR6fPoLfd-0r60';

// Initialize Supabase client
let sb = null;

// Get current page slug from URL
function getCurrentPageSlug() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop();

  if (filename === '' || filename === 'index.html') {
    return 'home';
  } else if (filename === 'work.html') {
    return 'work';
  } else if (filename === 'about.html') {
    return 'about';
  } else if (filename === 'contact.html') {
    return 'contact';
  } else {
    return null;
  }
}

// Get project slug from cases/{slug}.html
function getProjectSlug() {
  const pathname = window.location.pathname;
  if (pathname.includes('/cases/')) {
    const match = pathname.match(/\/cases\/([^/]+)\.html/);
    return match ? match[1] : null;
  }
  return null;
}

// Helper to convert storage image URLs
function processImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('assets/')) {
    return url; // Local images stay as-is
  }
  if (url.startsWith('http')) {
    return url; // Already full URL
  }
  // Transform storage paths
  return `${SUPABASE_URL}/storage/v1/object/public/portfolio-images/${url}`;
}

// Initialize CMS on page load
async function initializeCMS() {
  try {
    // Only proceed if Supabase is available
    if (!window.supabase) {
      console.warn('Supabase JS not loaded, skipping CMS initialization');
      return;
    }

    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    document.body.classList.add('cms-loading');

    const pageSlug = getCurrentPageSlug();
    const projectSlug = getProjectSlug();

    // Load global content (all pages)
    await loadGlobalContent();

    // Load page-specific content
    if (projectSlug) {
      await loadCaseStudyPage(projectSlug);
    } else if (pageSlug === 'home') {
      await loadHomePage();
    } else if (pageSlug === 'work') {
      await loadWorkPage();
    } else if (pageSlug === 'about') {
      await loadAboutPage();
    } else if (pageSlug === 'contact') {
      await loadContactPage();
    }

    document.body.classList.remove('cms-loading');
  } catch (error) {
    console.error('CMS initialization error:', error);
    document.body.classList.remove('cms-loading');
  }
}

// Load global content (site settings, social links, footer)
async function loadGlobalContent() {
  try {
    // Fetch site settings
    const { data: settingsData } = await sb.from('site_settings').select('*');
    const settings = {};
    if (settingsData) {
      settingsData.forEach(item => {
        settings[item.key] = item.value;
      });
    }

    // Fetch social links
    const { data: socialLinks } = await sb
      .from('social_links')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    // Populate footer
    populateFooter(settings, socialLinks || []);
  } catch (error) {
    console.error('Error loading global content:', error);
  }
}

// Populate footer with settings and social links
function populateFooter(settings, socialLinks) {
  try {
    // Update copyright
    const copyrightElement = document.querySelector('[data-cms="copyright"]');
    if (copyrightElement && settings.copyright) {
      copyrightElement.textContent = settings.copyright;
    }

    // Populate social links
    const socialContainer = document.querySelector('[data-cms="social-links"]');
    if (socialContainer) {
      socialContainer.innerHTML = socialLinks
        .map(link => `<a href="${link.url}" title="${link.label}" target="_blank" rel="noopener noreferrer">${link.platform}</a>`)
        .join('');
    }
  } catch (error) {
    console.error('Error populating footer:', error);
  }
}

// Load homepage content
async function loadHomePage() {
  try {
    // Fetch home page content
    const { data: pageData } = await sb
      .from('pages')
      .select('*')
      .eq('slug', 'home')
      .single();

    if (pageData) {
      populatePageHero(pageData);
    }

    // Fetch and populate stats
    const { data: statsData } = await sb
      .from('stats')
      .select('*')
      .order('sort_order', { ascending: true });

    populateStats(statsData || []);

    // Fetch and populate clients
    const { data: clientsData } = await sb
      .from('clients')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    populateClients(clientsData || []);

    // Fetch and populate featured projects
    const { data: projectsData } = await sb
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    populateWorkGrid(projectsData || [], '.work-grid');

    // Fetch and populate countries for ticker
    const { data: countriesData } = await sb
      .from('countries')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    populateCountriesTicker(countriesData || []);

    // Fetch contact page for CTA section
    const { data: contactPageData } = await sb
      .from('pages')
      .select('*')
      .eq('slug', 'contact')
      .single();

    if (contactPageData && contactPageData.content) {
      populateContactCTA(contactPageData.content);
    }
  } catch (error) {
    console.error('Error loading home page:', error);
  }
}

// Populate page hero section
function populatePageHero(pageData) {
  try {
    const heroEyebrow = document.querySelector('[data-cms="hero-eyebrow"]');
    const heroTitle = document.querySelector('[data-cms="hero-title"]');
    const heroSubtitle = document.querySelector('[data-cms="hero-subtitle"]');
    const heroBio = document.querySelector('[data-cms="hero-bio"]');

    if (heroEyebrow && pageData.hero_eyebrow) {
      heroEyebrow.textContent = pageData.hero_eyebrow;
    }
    if (heroTitle && pageData.hero_title) {
      heroTitle.textContent = pageData.hero_title;
    }
    if (heroSubtitle && pageData.hero_subtitle) {
      heroSubtitle.textContent = pageData.hero_subtitle;
    }
    if (heroBio && pageData.hero_bio) {
      heroBio.textContent = pageData.hero_bio;
    }
  } catch (error) {
    console.error('Error populating page hero:', error);
  }
}

// Populate stats grid
function populateStats(statsData) {
  try {
    const statsContainer = document.querySelector('[data-cms="stats-grid"]');
    if (!statsContainer) return;

    statsContainer.innerHTML = statsData
      .map(stat => `
        <div class="stat-block">
          <div class="stat-number">${stat.number}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `)
      .join('');
  } catch (error) {
    console.error('Error populating stats:', error);
  }
}

// Populate clients section
function populateClients(clientsData) {
  try {
    const clientsContainer = document.querySelector('[data-cms="clients-container"]');
    if (!clientsContainer) return;

    clientsContainer.innerHTML = clientsData
      .map(client => {
        const logoUrl = processImageUrl(client.logo_url);
        return `<span class="client" title="${client.name}"><img src="${logoUrl}" alt="${client.name}" loading="lazy"></span>`;
      })
      .join('');
  } catch (error) {
    console.error('Error populating clients:', error);
  }
}

// Populate work grid
function populateWorkGrid(projectsData, selector) {
  try {
    const workContainer = document.querySelector(selector);
    if (!workContainer) return;

    workContainer.innerHTML = projectsData
      .map(project => {
        const cardImage = processImageUrl(project.card_image);
        const categoryDisplay = project.category || '';
        const yearDisplay = project.year || '';

        return `
          <a href="cases/${project.slug}.html" class="work-card" data-project="${project.category}">
            <div class="card-image">
              <img src="${cardImage}" alt="${project.title}" loading="lazy">
            </div>
            <div class="card-content">
              <h3>${project.title}</h3>
              <p class="card-meta">${categoryDisplay}${yearDisplay ? ` . ${yearDisplay}` : ''}</p>
            </div>
          </a>
        `;
      })
      .join('');
  } catch (error) {
    console.error('Error populating work grid:', error);
  }
}

// Populate countries ticker
function populateCountriesTicker(countriesData) {
  try {
    const tickerContent = document.querySelector('[data-cms="ticker-content"]');
    if (!tickerContent) return;

    const countryItems = countriesData
      .map(country => `<div class="ticker-item">${country.name}</div>`)
      .join('');

    // Repeat for continuous scroll effect
    tickerContent.innerHTML = countryItems + countryItems;
  } catch (error) {
    console.error('Error populating countries ticker:', error);
  }
}

// Populate contact CTA section
function populateContactCTA(contactContent) {
  try {
    const contactCTA = document.querySelector('[data-cms="contact-cta"]');
    if (!contactCTA) return;

    const email = contactContent.email || '';
    const ctaTitle = contactContent.cta_title || '';
    const ctaSubtitle = contactContent.cta_subtitle || '';

    let html = '';
    if (ctaTitle) {
      html += `<h2>${ctaTitle}</h2>`;
    }
    if (ctaSubtitle) {
      html += `<p>${ctaSubtitle}</p>`;
    }
    if (email) {
      html += `<a href="mailto:${email}" class="cta-button">Get in touch</a>`;
    }

    contactCTA.innerHTML = html;
  } catch (error) {
    console.error('Error populating contact CTA:', error);
  }
}

// Load work page
async function loadWorkPage() {
  try {
    // Fetch work page content
    const { data: pageData } = await sb
      .from('pages')
      .select('*')
      .eq('slug', 'work')
      .single();

    if (pageData) {
      populatePageHero(pageData);
    }

    // Fetch all visible projects
    const { data: projectsData } = await sb
      .from('projects')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (projectsData && projectsData.length > 0) {
      populateWorkGrid(projectsData, '[data-cms="work-grid"]');

      // Build filter buttons from unique categories
      const categories = [...new Set(projectsData.map(p => p.category).filter(Boolean))];
      buildFilterButtons(categories);

      // Wire up filter logic
      wireUpFilters();
    }
  } catch (error) {
    console.error('Error loading work page:', error);
  }
}

// Build filter buttons dynamically
function buildFilterButtons(categories) {
  try {
    const filterContainer = document.querySelector('[data-cms="filter-buttons"]');
    if (!filterContainer) return;

    let html = '<button class="filter-btn active" data-filter="all">All Work</button>';
    html += categories
      .map(category => `<button class="filter-btn" data-filter="${category}">${category}</button>`)
      .join('');

    filterContainer.innerHTML = html;
  } catch (error) {
    console.error('Error building filter buttons:', error);
  }
}

// Wire up filter functionality
function wireUpFilters() {
  try {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('[data-cms="work-grid"] .work-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Show/hide cards
        workCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            card.style.display = card.getAttribute('data-project') === filter ? '' : 'none';
          }
        });
      });
    });
  } catch (error) {
    console.error('Error wiring up filters:', error);
  }
}

// Load about page
async function loadAboutPage() {
  try {
    // Fetch about page content
    const { data: pageData } = await sb
      .from('pages')
      .select('*')
      .eq('slug', 'about')
      .single();

    if (pageData) {
      populatePageHero(pageData);

      // Populate intro paragraphs
      if (pageData.content && pageData.content.intro_paragraphs) {
        const introContainer = document.querySelector('[data-cms="intro-text"]');
        if (introContainer) {
          introContainer.innerHTML = pageData.content.intro_paragraphs
            .map(para => `<p>${para}</p>`)
            .join('');
        }
      }

      // Populate story section
      if (pageData.content && pageData.content.story_title) {
        const storyTitle = document.querySelector('[data-cms="story-title"]');
        if (storyTitle) {
          storyTitle.textContent = pageData.content.story_title;
        }
      }

      if (pageData.content && pageData.content.story_paragraphs) {
        const storyText = document.querySelector('[data-cms="story-text"]');
        if (storyText) {
          storyText.innerHTML = pageData.content.story_paragraphs
            .map(para => `<p>${para}</p>`)
            .join('');
        }
      }
    }

    // Fetch and populate credentials
    const { data: credentialsData } = await sb
      .from('credentials')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    populateCredentials(credentialsData || []);

    // Fetch and populate products
    const { data: productsData } = await sb
      .from('products')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    populateProducts(productsData || []);
  } catch (error) {
    console.error('Error loading about page:', error);
  }
}

// Populate credentials list
function populateCredentials(credentialsData) {
  try {
    const credentialsList = document.querySelector('[data-cms="credentials-list"]');
    if (!credentialsList) return;

    credentialsList.innerHTML = credentialsData
      .map(cred => `
        <div class="credential-item">
          <h4>${cred.title}</h4>
          <p>${cred.description}</p>
        </div>
      `)
      .join('');
  } catch (error) {
    console.error('Error populating credentials:', error);
  }
}

// Populate products grid
function populateProducts(productsData) {
  try {
    const productsGrid = document.querySelector('[data-cms="products-grid"]');
    if (!productsGrid) return;

    productsGrid.innerHTML = productsData
      .map(product => {
        const iconUrl = processImageUrl(product.icon);
        return `
          <div class="product-item">
            <a href="${product.url}" target="_blank" rel="noopener noreferrer">
              <img src="${iconUrl}" alt="${product.title}" loading="lazy" class="product-icon">
              <h4>${product.title}</h4>
              <p>${product.description}</p>
            </a>
          </div>
        `;
      })
      .join('');
  } catch (error) {
    console.error('Error populating products:', error);
  }
}

// Load contact page
async function loadContactPage() {
  try {
    // Fetch contact page content
    const { data: pageData } = await sb
      .from('pages')
      .select('*')
      .eq('slug', 'contact')
      .single();

    if (pageData) {
      populatePageHero(pageData);

      // Populate contact details from content
      if (pageData.content) {
        const email = pageData.content.email;
        const phone = pageData.content.phone;
        const address = pageData.content.address;

        if (email) {
          const emailElement = document.querySelector('[data-cms="contact-email"]');
          if (emailElement) {
            emailElement.innerHTML = `<a href="mailto:${email}">${email}</a>`;
          }
        }

        if (phone) {
          const phoneElement = document.querySelector('[data-cms="contact-phone"]');
          if (phoneElement) {
            phoneElement.innerHTML = `<a href="tel:${phone}">${phone}</a>`;
          }
        }

        if (address) {
          const addressElement = document.querySelector('[data-cms="contact-address"]');
          if (addressElement) {
            addressElement.textContent = address;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error loading contact page:', error);
  }
}

// Load case study page
async function loadCaseStudyPage(projectSlug) {
  try {
    // Fetch project by slug
    const { data: projectData } = await sb
      .from('projects')
      .select('*')
      .eq('slug', projectSlug)
      .single();

    if (!projectData) {
      console.error('Project not found:', projectSlug);
      return;
    }

    // Populate case hero
    populateCaseHero(projectData);

    // Populate case meta sidebar
    populateCaseMeta(projectData);

    // Fetch and populate project sections
    const { data: sectionsData } = await sb
      .from('project_sections')
      .select('*')
      .eq('project_id', projectData.id)
      .order('sort_order', { ascending: true });

    populateCaseContent(sectionsData || []);

    // Fetch and populate project nav
    const { data: navData } = await sb
      .from('project_nav')
      .select('*')
      .eq('project_id', projectData.id)
      .single();

    if (navData) {
      await populateCaseNav(navData);
    }

    // Set hero image and color
    if (projectData.hero_image) {
      const heroImage = processImageUrl(projectData.hero_image);
      const caseHero = document.querySelector('[data-cms="case-hero"]');
      if (caseHero) {
        caseHero.style.backgroundImage = `url('${heroImage}')`;
      }
    }

    if (projectData.hero_color) {
      const caseHero = document.querySelector('[data-cms="case-hero"]');
      if (caseHero) {
        caseHero.style.backgroundColor = projectData.hero_color;
      }
    }
  } catch (error) {
    console.error('Error loading case study page:', error);
  }
}

// Populate case hero section
function populateCaseHero(projectData) {
  try {
    const heroEyebrow = document.querySelector('[data-cms="case-eyebrow"]');
    const heroTitle = document.querySelector('[data-cms="case-title"]');
    const heroSubtitle = document.querySelector('[data-cms="case-subtitle"]');

    if (heroEyebrow && projectData.category) {
      heroEyebrow.textContent = projectData.category;
    }
    if (heroTitle && projectData.title) {
      heroTitle.textContent = projectData.title;
    }
    if (heroSubtitle && projectData.subtitle) {
      heroSubtitle.textContent = projectData.subtitle;
    }
  } catch (error) {
    console.error('Error populating case hero:', error);
  }
}

// Populate case meta sidebar
function populateCaseMeta(projectData) {
  try {
    const metaContainer = document.querySelector('[data-cms="case-meta"]');
    if (!metaContainer) return;

    let html = '';

    if (projectData.client) {
      html += `<div class="meta-item"><h4>Client</h4><p>${projectData.client}</p></div>`;
    }
    if (projectData.role) {
      html += `<div class="meta-item"><h4>Role</h4><p>${projectData.role}</p></div>`;
    }
    if (projectData.year) {
      html += `<div class="meta-item"><h4>Year</h4><p>${projectData.year}</p></div>`;
    }
    if (projectData.scope) {
      html += `<div class="meta-item"><h4>Scope</h4><p>${projectData.scope}</p></div>`;
    }

    metaContainer.innerHTML = html;
  } catch (error) {
    console.error('Error populating case meta:', error);
  }
}

// Populate case content sections
function populateCaseContent(sectionsData) {
  try {
    const contentContainer = document.querySelector('[data-cms="case-content"]');
    if (!contentContainer) return;

    let html = '';

    sectionsData.forEach(section => {
      if (section.section_type === 'text') {
        html += `
          <section class="case-section">
            <h2>${section.title}</h2>
            <p>${section.body}</p>
          </section>
        `;
      } else if (section.section_type === 'image') {
        const imageUrl = processImageUrl(section.image_url);
        html += `
          <figure class="case-figure">
            <img src="${imageUrl}" alt="${section.image_alt || ''}" loading="lazy">
            ${section.image_caption ? `<figcaption>${section.image_caption}</figcaption>` : ''}
          </figure>
        `;
      } else if (section.section_type === 'metrics') {
        if (section.metrics) {
          html += '<div class="case-metrics">';
          section.metrics.forEach(metric => {
            html += `
              <div class="metric">
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
              </div>
            `;
          });
          html += '</div>';
        }
      } else if (section.section_type === 'gallery') {
        if (section.metrics && Array.isArray(section.metrics)) {
          html += '<div class="case-grid">';
          section.metrics.forEach(item => {
            const imgUrl = processImageUrl(item.image);
            html += `<img src="${imgUrl}" alt="${item.alt || ''}" loading="lazy">`;
          });
          html += '</div>';
        }
      } else if (section.section_type === 'quote') {
        html += `<blockquote class="about-pullquote">${section.body}</blockquote>`;
      }
    });

    contentContainer.innerHTML = html;
  } catch (error) {
    console.error('Error populating case content:', error);
  }
}

// Populate case navigation
async function populateCaseNav(navData) {
  try {
    const navContainer = document.querySelector('[data-cms="case-nav"]');
    if (!navContainer) return;

    let html = '';

    // Fetch previous project
    if (navData.prev_project_id) {
      const { data: prevProject } = await sb
        .from('projects')
        .select('slug, title')
        .eq('id', navData.prev_project_id)
        .single();

      if (prevProject) {
        html += `
          <a href="cases/${prevProject.slug}.html" class="nav-link prev-link">
            <span class="nav-label">Previous</span>
            <span class="nav-title">${prevProject.title}</span>
          </a>
        `;
      }
    }

    // Fetch next project
    if (navData.next_project_id) {
      const { data: nextProject } = await sb
        .from('projects')
        .select('slug, title')
        .eq('id', navData.next_project_id)
        .single();

      if (nextProject) {
        html += `
          <a href="cases/${nextProject.slug}.html" class="nav-link next-link">
            <span class="nav-label">Next</span>
            <span class="nav-title">${nextProject.title}</span>
          </a>
        `;
      }
    }

    navContainer.innerHTML = html;
  } catch (error) {
    console.error('Error populating case nav:', error);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCMS);
} else {
  initializeCMS();
}
