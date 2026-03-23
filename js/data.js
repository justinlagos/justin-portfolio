/**
 * Portfolio Content Model
 * Hierarchy: Brands → Projects → Media
 * Each brand/client is a top-level entry; projects belong to a brand.
 * Projects are typed as "case-study" or "gallery".
 */

const PORTFOLIO_DATA = {

  /* ────────────────────────────────────────────
     BRANDS / CLIENTS
     ──────────────────────────────────────────── */
  brands: [
    {
      id: "tbtm",
      name: "Take Back The Mic",
      slug: "take-back-the-mic",
      description: "Pan-African music and cultural competition operating across 50 countries, backed by MTN and partnered with Mastercard.",
      longDescription: "Three seasons of brand, digital product, interactive festival, and campaign work spanning virtual environments, crypto rewards, and Mastercard partnership design.",
      logo: null,
      featuredImage: "assets/projects/tbtm/social-1.png",
      isFeatured: true,
      order: 1
    },
    {
      id: "route-to-zero",
      name: "Route to Zero",
      slug: "route-to-zero",
      description: "Business-led membership organisation operating at government level, engaging Westminster and industry leaders on net zero policy.",
      longDescription: "Complete brand identity, website, and communications design. The work shapes how the organisation engages government, industry leaders, and the public.",
      logo: "assets/projects/route-to-zero/logo.png",
      featuredImage: "assets/projects/route-to-zero/web-1.png",
      isFeatured: true,
      order: 2
    },
    {
      id: "kavlr",
      name: "Kavlr",
      slug: "kavlr",
      description: "Digital booking and management platform for the beauty and wellness industry.",
      longDescription: "End-to-end product design including booking flow, business dashboard, client management, and mobile-responsive design system.",
      logo: "assets/projects/kavlr/logo.png",
      featuredImage: "assets/projects/kavlr/landing-page.png",
      isFeatured: true,
      order: 3
    },
    {
      id: "syntech",
      name: "Syntech Biofuel",
      slug: "syntech-biofuel",
      description: "Sustainable biofuel company transforming waste into clean energy across Africa and the Middle East.",
      longDescription: "Brand identity and 3D campaign work positioning Syntech as a leader in sustainable biofuel production.",
      logo: "assets/projects/syntech/logo.png",
      featuredImage: "assets/projects/syntech/social-1.jpg",
      isFeatured: true,
      order: 4
    },
    {
      id: "tryba",
      name: "Tryba",
      slug: "tryba",
      description: "Digital payment and financial technology platform built for emerging markets.",
      longDescription: null,
      logo: null,
      featuredImage: "assets/projects/tryba/card-black.png",
      isFeatured: true,
      order: 5
    },
    {
      id: "hashit",
      name: "HashIT",
      slug: "hashit",
      description: "Fintech application for digital asset management, payments, and crypto exchange.",
      longDescription: null,
      logo: null,
      featuredImage: "assets/projects/hashit/app.png",
      isFeatured: false,
      order: 6
    },
    {
      id: "easyjet",
      name: "EasyJet",
      slug: "easyjet",
      description: "European low-cost airline. Campaign and visual design work.",
      longDescription: null,
      logo: null,
      featuredImage: null,
      heroColor: "#FF6600",
      isFeatured: false,
      order: 7
    },
    {
      id: "sparkle",
      name: "Sparkle",
      slug: "sparkle",
      description: "Digital banking platform for Nigerians, offering seamless financial services.",
      longDescription: null,
      logo: null,
      featuredImage: null,
      heroColor: "#4CAF50",
      isFeatured: false,
      order: 8
    },
    {
      id: "polo-luxury",
      name: "Polo Luxury",
      slug: "polo-luxury",
      description: "West Africa's leading luxury retail brand, representing the world's finest luxury houses.",
      longDescription: null,
      logo: null,
      featuredImage: null,
      heroColor: "#1a1a1a",
      isFeatured: false,
      order: 9
    },
    {
      id: "vulta",
      name: "Vulta",
      slug: "vulta",
      description: "Next-generation digital product for energy and utilities management.",
      longDescription: null,
      logo: null,
      featuredImage: null,
      heroColor: "#1a0a2e",
      isFeatured: false,
      order: 10
    }
  ],

  /* ────────────────────────────────────────────
     PROJECTS
     brandId links to brands[].id
     type: "case-study" | "gallery"
     ──────────────────────────────────────────── */
  projects: [
    // ── TBTM ──
    {
      id: "tbtm-brand-campaign",
      brandId: "tbtm",
      title: "Brand Identity & Campaign",
      slug: "tbtm-brand-campaign",
      type: "case-study",
      summary: "Complete brand identity, digital product, and interactive platform for Africa's largest music competition.",
      year: "2021–2024",
      services: ["Brand Identity", "Digital Product", "Campaign", "Interactive"],
      featuredImage: "assets/projects/tbtm/social-1.png",
      featured: true,
      externalLink: null,
      order: 1,
      caseStudy: {
        overview: "Take Back The Mic is a pan-African music and cultural competition operating across 50 countries, backed by MTN and partnered with Mastercard. It required a design system that could unify wildly different markets, from Lagos to Nairobi to Dubai, under one visual language while powering a complex digital ecosystem including virtual festival, crypto rewards system, and Mastercard-partnered digital card.",
        context: "The platform needed to feel equally at home on a Lagos billboard and in a Dubai boardroom. Three seasons of content, competition mechanics, and cultural storytelling had to be unified into a cohesive brand experience deployable simultaneously across dozens of countries.",
        objective: "Build a complete visual identity that works at billboard scale and app-icon scale. Design an interactive virtual festival platform. Create UX and visual design for a digital card product. Unify three seasons of content into one coherent brand system.",
        approach: "The brand system was built modular: a core identity kit that could flex across regions without losing coherence. Bold typography, high-contrast color, and visual language rooted in energy and cultural pride. The Kola crypto rewards system integrated blockchain mechanics into a familiar entertainment interface. The virtual festival was designed as an immersive digital environment.",
        execution: "Across three seasons, the design work included: complete brand identity system with logo, typography, color palette, and brand guidelines; interactive virtual festival platform (Webby-nominated); Kola crypto rewards interface and campaign materials in partnership with MTN; digital card product design that contributed to securing the Mastercard partnership; social media campaign assets deployed across 50+ countries; outdoor advertising, billboard designs, and environmental graphics; and complete UX flow for audience participation, voting, and rewards.",
        outcome: "1.1 billion media impressions across 50 countries, a Webby Award nomination in 2023 for the interactive festival, and a multi-year Mastercard partnership secured through the quality and ambition of the digital card product design. The brand became synonymous with pan-African cultural ambition.",
        metrics: [
          { value: "1.1B", label: "Media Impressions" },
          { value: "50+", label: "Countries Reached" },
          { value: "3", label: "Full Seasons" },
          { value: "Webby", label: "Award Nomination" }
        ]
      }
    },
    {
      id: "tbtm-access-bank",
      brandId: "tbtm",
      title: "Access Bank Partnership",
      slug: "tbtm-access-bank",
      type: "gallery",
      summary: "Brand collateral, debit card design, and social media campaign for the Access Bank x TBTM partnership.",
      year: "2022–2023",
      services: ["Card Design", "Brand Collateral", "Social Media"],
      featuredImage: "assets/projects/tbtm/access-branding.png",
      featured: false,
      order: 2
    },

    // ── Route to Zero ──
    {
      id: "rtz-brand-identity",
      brandId: "route-to-zero",
      title: "Brand Identity & Website",
      slug: "rtz-brand-identity",
      type: "case-study",
      summary: "Brand identity, website, and communications for a business-led membership organisation operating at government level.",
      year: "2024–Present",
      services: ["Brand Identity", "Web Design", "Communications"],
      featuredImage: "assets/projects/route-to-zero/web-1.png",
      featured: true,
      order: 1,
      caseStudy: {
        overview: "Route to Zero is a business-led membership organisation that engages Westminster, industry leaders, and the British public on net zero policy. It needed a complete brand identity and digital presence that would command authority in government and corporate boardrooms.",
        context: "Operating at the intersection of business and government policy, Route to Zero required design that communicates institutional authority while remaining accessible to a diverse audience spanning corporate executives, politicians, and the public.",
        objective: "Create a brand identity and website that establishes Route to Zero as a credible, authoritative voice in the UK net zero conversation. The design must work across government submissions, corporate communications, and public-facing campaigns.",
        approach: "The identity system was built around clarity and authority. Clean typography, a restrained color palette with environmental undertones, and precise layout systems. The website was designed as both a resource hub and a communications platform, with clear information hierarchy.",
        execution: "Delivered the complete brand identity including logo, typography system, and brand guidelines. Designed and built the responsive website with policy resources, membership information, and event listings. Created all communications collateral including business cards, email signatures, letterheads, and presentation templates.",
        outcome: "The brand shapes how Route to Zero engages Westminster, industry leaders, and the British public on net zero policy. The design system has been adopted across all organisational communications and government submissions."
      }
    },

    // ── Kavlr ──
    {
      id: "kavlr-platform",
      brandId: "kavlr",
      title: "Product Design & UX",
      slug: "kavlr-platform",
      type: "case-study",
      summary: "End-to-end product design for a digital booking and management platform in the beauty and wellness industry.",
      year: "2022–2024",
      services: ["Product Design", "UX/UI", "Design System"],
      featuredImage: "assets/projects/kavlr/landing-page.png",
      featured: true,
      order: 1,
      caseStudy: {
        overview: "Kavlr is a digital booking and management platform for the beauty and wellness industry. The product needed to serve both service providers and their clients with an intuitive, modern interface.",
        context: "The beauty and wellness industry lacked a purpose-built platform that understood the specific workflows of salons, barbers, and independent beauty professionals. Existing tools were either too generic or too complex.",
        objective: "Design a comprehensive platform that simplifies booking, client management, and business operations for beauty professionals while providing a seamless booking experience for end users.",
        approach: "Research-driven design process starting with practitioner interviews and workflow analysis. Built a component-based design system that scales across web and mobile. Focused on reducing friction in the booking flow to under 30 seconds.",
        execution: "Delivered end-to-end product design including: landing page and marketing site; booking flow and appointment management; business dashboard with analytics; client management system; mobile-responsive design across all touchpoints; and comprehensive design system with reusable components.",
        outcome: "The platform successfully launched and onboarded hundreds of beauty professionals. The streamlined booking flow achieved the target of under 30-second completion times."
      }
    },

    // ── Syntech ──
    {
      id: "syntech-brand",
      brandId: "syntech",
      title: "Brand & Campaign",
      slug: "syntech-brand",
      type: "case-study",
      summary: "Brand identity and campaign design for a sustainable biofuel company transforming waste into clean energy.",
      year: "2024",
      services: ["Brand Identity", "Campaign", "3D Visualisation"],
      featuredImage: "assets/projects/syntech/social-1.jpg",
      featured: true,
      order: 1,
      caseStudy: {
        overview: "Syntech Biofuel is transforming waste into clean energy across Africa and the Middle East. The company needed a brand that communicates both technological innovation and environmental responsibility.",
        context: "The clean energy sector in Africa is rapidly growing but faces perception challenges. Syntech needed to position itself as a credible, modern technology company while speaking to environmental impact.",
        objective: "Create a brand identity and campaign that positions Syntech as a leader in sustainable biofuel production, appealing to both investors and environmental stakeholders.",
        approach: "Developed a visual language that bridges industrial technology and environmental sustainability. Used 3D visualisation to bring the biofuel production process to life in marketing materials.",
        execution: "Delivered complete brand identity with logo, typography, and color system. Created 3D rendered campaign visuals showing the production process. Designed social media assets, vehicle livery, and corporate communications materials.",
        outcome: "The rebrand elevated Syntech's market position and provided a cohesive visual language for investor presentations, trade shows, and digital marketing campaigns."
      }
    },

    // ── Tryba ──
    {
      id: "tryba-product",
      brandId: "tryba",
      title: "Product & Brand Design",
      slug: "tryba-product",
      type: "gallery",
      summary: "Product design and brand identity for a digital payment platform in emerging markets.",
      year: "2022–2023",
      services: ["Product Design", "Brand Identity", "Campaign"],
      featuredImage: "assets/projects/tryba/card-black.png",
      featured: true,
      order: 1
    },

    // ── HashIT ──
    {
      id: "hashit-app",
      brandId: "hashit",
      title: "App Design & UX",
      slug: "hashit-app",
      type: "gallery",
      summary: "Product design for a fintech application covering digital asset management, payments, and crypto exchange.",
      year: "2023–2024",
      services: ["Product Design", "UX/UI", "Fintech"],
      featuredImage: "assets/projects/hashit/app.png",
      featured: true,
      order: 1
    },

    // ── EasyJet ──
    {
      id: "easyjet-campaign",
      brandId: "easyjet",
      title: "Campaign Design",
      slug: "easyjet-campaign",
      type: "gallery",
      summary: "Visual design and campaign work for the European airline.",
      year: "2024",
      services: ["Campaign", "Visual Design"],
      featuredImage: null,
      heroColor: "#FF6600",
      featured: false,
      order: 1
    },

    // ── Sparkle ──
    {
      id: "sparkle-brand",
      brandId: "sparkle",
      title: "Brand Design",
      slug: "sparkle-brand",
      type: "gallery",
      summary: "Brand design for a Nigerian digital banking platform.",
      year: "2021–2022",
      services: ["Brand Identity", "Digital Design"],
      featuredImage: null,
      heroColor: "#4CAF50",
      featured: false,
      order: 1
    },

    // ── Polo Luxury ──
    {
      id: "polo-luxury-brand",
      brandId: "polo-luxury",
      title: "Brand & Digital",
      slug: "polo-luxury-brand",
      type: "gallery",
      summary: "Brand and digital design for West Africa's leading luxury retail brand.",
      year: "2019–2021",
      services: ["Brand Identity", "Digital Design", "Campaign"],
      featuredImage: null,
      heroColor: "#1a1a1a",
      featured: false,
      order: 1
    },

    // ── Vulta ──
    {
      id: "vulta-product",
      brandId: "vulta",
      title: "Product Design",
      slug: "vulta-product",
      type: "gallery",
      summary: "Product design for an energy and utilities management platform.",
      year: "2025",
      services: ["Product Design", "UX/UI"],
      featuredImage: null,
      heroColor: "#1a0a2e",
      featured: false,
      order: 1
    }
  ],

  /* ────────────────────────────────────────────
     PROJECT MEDIA
     projectId links to projects[].id
     ──────────────────────────────────────────── */
  media: [
    // TBTM - Brand Campaign
    { projectId: "tbtm-brand-campaign", image: "assets/projects/tbtm/social-1.png", caption: "Campaign visuals for Season 3", order: 1, isCover: true },
    { projectId: "tbtm-brand-campaign", image: "assets/projects/tbtm/social-2.png", caption: "Social media design system", order: 2, isCover: false },
    { projectId: "tbtm-brand-campaign", image: "assets/projects/tbtm/social-3.png", caption: "Outdoor advertising concepts", order: 3, isCover: false },
    { projectId: "tbtm-brand-campaign", image: "assets/projects/tbtm/social-design.png", caption: "Social media templates", order: 4, isCover: false },
    { projectId: "tbtm-brand-campaign", image: "assets/projects/tbtm/debit-cards.png", caption: "Mastercard-partnered digital card", order: 5, isCover: false },
    { projectId: "tbtm-brand-campaign", image: "assets/projects/tbtm/reachout.png", caption: "Reachout campaign creative", order: 6, isCover: false },

    // TBTM - Access Bank
    { projectId: "tbtm-access-bank", image: "assets/projects/tbtm/access-branding.png", caption: "Access Bank co-branded assets", order: 1, isCover: true },
    { projectId: "tbtm-access-bank", image: "assets/projects/tbtm/access-logo.png", caption: "Access Bank partnership logo", order: 2, isCover: false },
    { projectId: "tbtm-access-bank", image: "assets/projects/tbtm/debit-cards.png", caption: "Co-branded debit card design", order: 3, isCover: false },

    // Route to Zero
    { projectId: "rtz-brand-identity", image: "assets/projects/route-to-zero/web-1.png", caption: "Website homepage design", order: 1, isCover: true },
    { projectId: "rtz-brand-identity", image: "assets/projects/route-to-zero/web-2.png", caption: "Interior page layout", order: 2, isCover: false },
    { projectId: "rtz-brand-identity", image: "assets/projects/route-to-zero/web-3.png", caption: "Resource hub design", order: 3, isCover: false },
    { projectId: "rtz-brand-identity", image: "assets/projects/route-to-zero/logo.png", caption: "Brand identity mark", order: 4, isCover: false },
    { projectId: "rtz-brand-identity", image: "assets/projects/route-to-zero/business-card.png", caption: "Business card design", order: 5, isCover: false },
    { projectId: "rtz-brand-identity", image: "assets/projects/route-to-zero/email-sig.png", caption: "Email signature", order: 6, isCover: false },
    { projectId: "rtz-brand-identity", image: "assets/projects/route-to-zero/newspaper.jpg", caption: "Press coverage", order: 7, isCover: false },

    // Kavlr
    { projectId: "kavlr-platform", image: "assets/projects/kavlr/landing-page.png", caption: "Landing page design", order: 1, isCover: true },
    { projectId: "kavlr-platform", image: "assets/projects/kavlr/dashboard.png", caption: "Business dashboard", order: 2, isCover: false },
    { projectId: "kavlr-platform", image: "assets/projects/kavlr/desktop-1.png", caption: "Desktop interface", order: 3, isCover: false },
    { projectId: "kavlr-platform", image: "assets/projects/kavlr/desktop-2.png", caption: "Booking management view", order: 4, isCover: false },
    { projectId: "kavlr-platform", image: "assets/projects/kavlr/booking-1.png", caption: "Booking flow", order: 5, isCover: false },
    { projectId: "kavlr-platform", image: "assets/projects/kavlr/mobile.png", caption: "Mobile responsive design", order: 6, isCover: false },
    { projectId: "kavlr-platform", image: "assets/projects/kavlr/logo.png", caption: "Brand mark", order: 7, isCover: false },

    // Syntech
    { projectId: "syntech-brand", image: "assets/projects/syntech/social-1.jpg", caption: "Campaign visual, sustainability", order: 1, isCover: true },
    { projectId: "syntech-brand", image: "assets/projects/syntech/social-2.jpg", caption: "Campaign visual, technology", order: 2, isCover: false },
    { projectId: "syntech-brand", image: "assets/projects/syntech/logo.png", caption: "Brand identity mark", order: 3, isCover: false },
    { projectId: "syntech-brand", image: "assets/projects/syntech/truck.png", caption: "Vehicle livery design", order: 4, isCover: false },

    // Tryba
    { projectId: "tryba-product", image: "assets/projects/tryba/card-black.png", caption: "Card design, black edition", order: 1, isCover: true },
    { projectId: "tryba-product", image: "assets/projects/tryba/card-green.png", caption: "Card design, green edition", order: 2, isCover: false },

    // HashIT
    { projectId: "hashit-app", image: "assets/projects/hashit/app.png", caption: "App interface design", order: 1, isCover: true },
    { projectId: "hashit-app", image: "assets/projects/hashit/navigation.png", caption: "Navigation system", order: 2, isCover: false },
    { projectId: "hashit-app", image: "assets/projects/hashit/crowdpool.png", caption: "Crowdpool feature", order: 3, isCover: false },
    { projectId: "hashit-app", image: "assets/projects/hashit/appstore-1.png", caption: "App Store listing", order: 4, isCover: false },
    { projectId: "hashit-app", image: "assets/projects/hashit/appstore-2.png", caption: "App Store screenshots", order: 5, isCover: false }
  ]
};

/* ────────────────────────────────────────────
   HELPER FUNCTIONS
   ──────────────────────────────────────────── */

function getBrands() {
  return PORTFOLIO_DATA.brands.slice().sort((a, b) => a.order - b.order);
}

function getFeaturedBrands() {
  return PORTFOLIO_DATA.brands
    .filter(b => b.isFeatured)
    .sort((a, b) => a.order - b.order);
}

function getBrandBySlug(slug) {
  return PORTFOLIO_DATA.brands.find(b => b.slug === slug) || null;
}

function getBrandById(id) {
  return PORTFOLIO_DATA.brands.find(b => b.id === id) || null;
}

function getProjectsForBrand(brandId) {
  return PORTFOLIO_DATA.projects
    .filter(p => p.brandId === brandId)
    .sort((a, b) => a.order - b.order);
}

function getProjectBySlug(slug) {
  return PORTFOLIO_DATA.projects.find(p => p.slug === slug) || null;
}

function getMediaForProject(projectId) {
  return PORTFOLIO_DATA.media
    .filter(m => m.projectId === projectId)
    .sort((a, b) => a.order - b.order);
}

function getFeaturedProjects() {
  return PORTFOLIO_DATA.projects
    .filter(p => p.featured)
    .sort((a, b) => {
      const brandA = getBrandById(a.brandId);
      const brandB = getBrandById(b.brandId);
      return (brandA?.order || 99) - (brandB?.order || 99);
    });
}

function getCoverImage(projectId) {
  const media = getMediaForProject(projectId);
  const cover = media.find(m => m.isCover);
  return cover ? cover.image : (media[0]?.image || null);
}

/* URL param helpers */
function getUrlParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}
