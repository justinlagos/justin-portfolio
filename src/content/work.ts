// All portfolio copy lives here. Edit this file to change the site.
// Image sizes come from image-sizes.json (run scripts/image_manifest.py after adding images).

export type Img = { src: string; alt: string; caption?: string }

export type Fact = { label: string; value: string; href?: string }

export type Work = {
  slug: string
  title: string
  kind: string
  years: string
  /** One line for the index. */
  line: string
  /** Opening paragraph on the case page. */
  summary: string
  /** Image that follows the cursor on the home page index. */
  preview: string
  facts: Fact[]
  brief: string
  did: string[]
  outcome: string
  images: Img[]
}

const p = (slug: string, file: string) => `/assets/projects/${slug}/${file}`

export const work: Work[] = [
  {
    slug: 'draw-in-the-air',
    title: 'Draw in the Air',
    kind: 'Own product',
    years: 'Live',
    line: 'Children learn by moving, tracked by a laptop webcam',
    summary:
      'A browser learning platform where children aged 3 to 7 trace letters, numbers and shapes in the air, tracked by an ordinary laptop webcam.',
    preview: p('draw-in-the-air', 'home.jpg'),
    facts: [
      { label: 'Role', value: 'Founder. Product, design and build' },
      { label: 'Studio', value: 'MotionPlay Labs' },
      { label: 'Status', value: 'Live, piloting in a Kent primary school' },
      { label: 'Visit', value: 'drawintheair.com', href: 'https://drawintheair.com' },
    ],
    brief:
      'Most screen time asks young children to sit still and tap glass. I wanted a laptop to get them moving while they learn, with nothing to install and no account to create.',
    did: [
      'I designed and built the whole product: the activities, the hand-tracking interaction, the brand and the website. Children pinch to draw, then pop, sort, spell and find by moving their hands.',
      'The camera feed is processed in the browser and no video leaves the device. Teachers get a class mode and a dashboard, and the activities follow the EYFS framework.',
    ],
    outcome:
      'Draw in the Air is approved on the Chrome Web Store and is piloting in a primary school in Kent, in ten to fifteen minute sessions on laptops the school already owns. A version that runs on a classroom TV through a Raspberry Pi is in development.',
    images: [
      { src: p('draw-in-the-air', 'home.jpg'), alt: 'Draw in the Air home page: They draw in the air. They learn.' },
      { src: p('draw-in-the-air', 'wave-to-start.jpg'), alt: 'The start screen asks the child to wave a hand at the camera', caption: 'Play starts with a wave, so a three-year-old needs no instructions.' },
      { src: p('draw-in-the-air', 'camera-consent.jpg'), alt: 'Camera permission screen explaining that frames never leave the device', caption: 'The camera request says what happens to the video before the browser asks.' },
      { src: p('draw-in-the-air', 'for-teachers.jpg'), alt: 'Teachers page: whole-class movement, zero setup' },
    ],
  },
  {
    slug: 'voidcanvas',
    title: 'Voidcanvas and Art Director Studio',
    kind: 'Own product',
    years: 'Live',
    line: 'My design workflow, packaged as free browser tools',
    summary:
      'Two browser tools that package the way I work, so other designers can use it: a layered editor, a brand guideline builder and a studio for client jobs.',
    preview: p('voidcanvas', 'effects-halftone.jpg'),
    facts: [
      { label: 'Role', value: 'Founder. Product, design and build' },
      { label: 'Studio', value: 'MotionPlay Labs' },
      { label: 'Status', value: 'Live and free' },
      { label: 'Visit', value: 'voidcanvas.app', href: 'https://voidcanvas.app' },
    ],
    brief:
      'Over the years I automated most of my own process: brand guidelines, layout, effects and export. I wanted that process to be usable by designers who are earlier in their careers, without a subscription or an upload.',
    did: [
      'Art Director Studio came first, built for designers working in Nigeria. Voidcanvas is its sequel.',
      'Voidcanvas has a layered editor that opens Photoshop files and PDFs, a studio that turns a client brief into every format the job needs, a brand guideline builder and 58 one-click effects. Everything runs in the browser and files never leave the device.',
    ],
    outcome:
      'Both tools are live and free, with no account needed. Young and working designers use them daily.',
    images: [
      { src: p('voidcanvas', 'home.jpg'), alt: 'Voidcanvas home page: from the brief to the finished file, in one tab' },
      { src: p('voidcanvas', 'effects-halftone.jpg'), alt: 'Halftone effect applied to a Polo Avenue campaign poster in Voidcanvas', caption: 'Effects running on one of my own campaign posters, entirely in the browser.' },
      { src: p('voidcanvas', 'effects-dither.jpg'), alt: 'Dither effect applied to the same poster' },
      { src: p('voidcanvas', 'editor-start.jpg'), alt: 'Voidcanvas editor start screen with social, screen and print sizes' },
    ],
  },
  {
    slug: 'take-back-the-mic',
    title: 'Take Back The Mic',
    kind: 'Festival and campaign',
    years: '2021–24',
    line: 'Interactive festival and campaigns across 50 countries',
    summary:
      'Brand, interactive festival platform and campaigns for a pan-African music competition that ran for three seasons across 50 countries.',
    preview: p('tbtm', 'nyc-billboard-05.jpg'),
    facts: [
      { label: 'Role', value: 'Brand and UI design lead' },
      { label: 'Client', value: 'Take Back The Mic, Dubai' },
      { label: 'Recognition', value: 'Webby Award nomination, 2023' },
      { label: 'Reach', value: '1.1 billion media impressions' },
    ],
    brief:
      'TBTM ran for three seasons across Africa, Europe, the USA and the Middle East. Each season needed one design system that could stretch from a Times Square billboard to a virtual festival with speakers, panels and partners.',
    did: [
      'I led the design system across every campaign and digital touchpoint, and designed the brand, UX and digital environments for the TBTM Interactive Festival.',
      'For 2022 I moved the palette from yellow and black to teal and green, tightened the grid for social, and built a schedule layout that works for one day or several without a redesign. I also designed the TBTM digital card used in the talks that secured a multi-year Mastercard partnership.',
    ],
    outcome:
      'The programme reached over 1.1 billion media impressions in 50 countries. The Interactive Festival platform was nominated for a Webby Award in 2023.',
    images: [
      { src: p('tbtm', 'festival-flyer-2021.jpg'), alt: 'Take Back The Mic Interactive Festival 2021 banner' },
      { src: p('tbtm', 'nyc-billboard-05.jpg'), alt: 'Festival billboard in New York' },
      { src: p('tbtm', 'nyc-billboard-08.jpg'), alt: 'Take Back The Mic Interactive Festival on a building screen in New York' },
      { src: p('tbtm', 'festival-tile-2022.jpg'), alt: '2022 festival key visual: Remixing the Renaissance' },
      { src: p('tbtm', 'festival-speakers-2022.jpg'), alt: '2022 speaker poster' },
      { src: p('tbtm', 'festival-schedule-2022.jpg'), alt: '2022 two-day schedule' },
      { src: p('tbtm', 'festival-partners-2022.jpg'), alt: '2022 partners: Forbes, TBTM and GSMA' },
      { src: p('tbtm', 'panel-culture-currency.jpg'), alt: 'Panel promotion: Turning culture into currency' },
      { src: p('tbtm', 'panel-innovation-africa.jpg'), alt: 'Panel promotion: Future of innovation in Africa' },
      { src: p('tbtm', 'webby-nomination-2.png'), alt: 'Webby People’s Voice voting post for the 2023 nomination' },
    ],
  },
  {
    slug: 'syntech-biofuel',
    title: 'Syntech Biofuel',
    kind: 'In-house brand',
    years: '2022–now',
    line: 'Sole designer for a UK biofuel maker',
    summary:
      'Sole designer for a UK renewable fuel maker, responsible for everything from tanker livery to a Department for Transport briefing note.',
    preview: p('syntech', 'artboard-social-2.jpg'),
    facts: [
      { label: 'Role', value: 'Sole designer, reporting to the CEO' },
      { label: 'Since', value: 'October 2022' },
      { label: 'Scope', value: 'Brand system, campaigns, reports, signage, digital tools' },
      { label: 'Sub-brands', value: 'BioCabby, Liquid Gold' },
    ],
    brief:
      'Syntech makes renewable fuel from waste oils in Kent. The brand has to work in a boardroom, at a trade stand, on a fleet and on a site sign, and it has to explain a technical product to people who buy diesel.',
    did: [
      'I evolved and now run the brand system for Syntech and its sub-brands: templates, asset libraries, an icon set developed from sketches, and a CMYK pipeline that holds the brand green from a LinkedIn ad to a large-format stand. I designed vehicle livery, site wayfinding and a concept forecourt.',
      'Recent work includes the Change the Fuel. Not the Fleet. campaign, the 1 Million Litres field trials report, a Department for Transport briefing note, and the Syntech Verify calculator, which compares Syntech ASB with diesel in real time.',
    ],
    outcome:
      'One system runs from social tiles to the office fascia. I also lead design for the Carbon Reduction Champion schools programme, which combines physical kits, digital learning and AI-assisted 3D characters.',
    images: [
      { src: p('syntech', 'pdf-logo.png'), alt: 'Syntech Biofuel logo on charcoal' },
      { src: p('syntech', 'artboard-social-1.jpg'), alt: 'Social post: We are producing too much carbon. We must decarbonise together.' },
      { src: p('syntech', 'artboard-social-2.jpg'), alt: 'Social post: Fossil fuel is dead, long live sustainability' },
      { src: p('syntech', 'pdf-strategy-doc.png'), alt: 'Unique selling point icons, from sketch to finished tiles', caption: 'Nine selling points, drawn by hand first and then built as a tile system.' },
      { src: p('syntech', 'pdf-biocabby.png'), alt: 'BioCabby sub-brand logo and London taxi livery' },
      { src: p('syntech', 'pdf-liquid-gold.png'), alt: 'Liquid Gold label design and photography' },
      { src: p('syntech', 'pdf-brochure.png'), alt: 'Tri-fold leave-behind brochure' },
      { src: p('syntech', 'brochure-cover-2.jpg'), alt: 'Staff handbook cover' },
      { src: p('syntech', 'brochure-spread.jpg'), alt: 'Brochure spread' },
      { src: p('syntech', 'pdf-petrol-station.png'), alt: 'Concept forecourt design' },
      { src: p('syntech', 'pdf-site-signs.png'), alt: 'Site wayfinding and sign system' },
      { src: p('syntech', 'pdf-social-campaign-2.png'), alt: 'Tanker and van livery' },
      { src: p('syntech', 'pdf-social-campaign-3.png'), alt: 'Office fascia, night and day' },
      { src: p('syntech', 'social-grid-1.png'), alt: 'Grid of social posts' },
    ],
  },
  {
    slug: 'route-to-zero',
    title: 'Route to Zero',
    kind: 'Brand system',
    years: '2024–now',
    line: 'Identity and website for a net zero policy organisation',
    summary:
      'Identity, website and event design for a business-led net zero organisation that works with Westminster and industry.',
    preview: p('route-to-zero', 'logo.png'),
    facts: [
      { label: 'Role', value: 'Brand and communications design' },
      { label: 'Scope', value: 'Identity, certification marks, guidelines, website, events' },
      { label: 'Website', value: 'routetozero.co.uk', href: 'https://www.routetozero.co.uk' },
    ],
    brief:
      'Route to Zero brings businesses and policymakers together on net zero. The brand had to read as credible in a parliamentary briefing, not like another green campaign.',
    did: [
      'I created the identity from first sketches: a wordmark where zero becomes a route, with three tiers of certification marks for members. I wrote the brand guidelines and published them online.',
      'I designed the website, reports, templates and merchandise, and I design the stage visuals and printed material for its events.',
    ],
    outcome:
      'The brand runs across all of Route to Zero’s communications, including events attended by MPs and senior policymakers at the Royal Institution of Chartered Surveyors and the Royal College of General Practitioners.',
    images: [
      { src: p('route-to-zero', 'img04_b71d9e79a2.jpg'), alt: 'Route to Zero wordmark' },
      { src: p('route-to-zero', 'img02_2b4f266ae1.jpg'), alt: 'First sketches of the Route to Zero mark', caption: 'The mark started as a pencil sketch: a zero that turns into a downward route.' },
      { src: p('route-to-zero', 'img03_55dedd27fb.jpg'), alt: 'Construction grid for the wordmark' },
      { src: p('route-to-zero', 'logo-branding.png'), alt: 'Three tiers of member certification marks and the colour palette' },
      { src: p('route-to-zero', 'stylescape.png'), alt: 'Route to Zero stylescape' },
      { src: p('route-to-zero', 'img11_9f9fbbbc01.jpg'), alt: 'Website on laptop and print' },
      { src: p('route-to-zero', 'web-1.png'), alt: 'Responsive website on tablet and phone' },
      { src: p('route-to-zero', 'img16_f62f6c4d51.jpg'), alt: 'Annual progress report cover' },
      { src: p('route-to-zero', 'img15_2d1459d41a.jpg'), alt: 'Business cards' },
      { src: p('route-to-zero', 'img19_4687f1c77c.jpg'), alt: 'Van livery' },
      { src: p('route-to-zero', 'img20_d364df4ce3.jpg'), alt: 'Merchandise' },
      { src: p('route-to-zero', 'img21_0ad29d2d15.jpg'), alt: 'Branded site helmet' },
    ],
  },
  {
    slug: 'access-bank',
    title: 'Access Bank',
    kind: 'Brand and campaigns',
    years: '2022–23',
    line: 'Guidelines, a sub-brand and campaigns after a bank merger',
    summary:
      'Brand guidelines, an agent banking sub-brand and national campaigns after the merger of Access Bank and Diamond Bank.',
    preview: p('access-bank', 'photo-02.jpg'),
    facts: [
      { label: 'Scope', value: 'Brand guidelines, sub-brand, press and outdoor campaigns' },
      { label: 'Market', value: 'Nigeria' },
    ],
    brief:
      'The merger of Access Bank and Diamond Bank was described as the largest in African banking. Diamond was a retail brand and Access a corporate bank, and the merged brand had to carry the customers of both.',
    did: [
      'I worked on “more than banking”, the guide to the merged brand: colour, type, tone of voice and photography. The merged mark carries Diamond’s geometric diamond into the Access identity.',
      'I then designed Access Closa, the agent banking sub-brand, and its national press and outdoor campaign, along with campaigns for the Visa World Cup cards and the Cashflow business loan.',
    ],
    outcome:
      'The guidelines set how the merged bank appears across its branches and communications.',
    images: [
      { src: p('access-bank', 'logo-mark.png'), alt: 'Access and Diamond merged logo' },
      { src: p('access-bank', 'pdf-merger-scope.png'), alt: 'Access plus Diamond equals Access' },
      { src: p('access-bank', 'brand-guide.png'), alt: 'Brand guide cover: more than banking' },
      { src: p('access-bank', 'guideline-1.png'), alt: 'Guideline spread: typefaces' },
      { src: p('access-bank', 'guideline-4.png'), alt: 'Guideline spread: our brand' },
      { src: p('access-bank', 'guideline-3.png'), alt: 'Guideline spread: icons' },
      { src: p('access-bank', 'photo-02.jpg'), alt: 'Access Closa campaign: Access Closa agent dey near you' },
      { src: p('access-bank', 'photo-03.jpg'), alt: 'Access Closa campaign: become an Access Closa super agent' },
      { src: p('access-bank', 'newspaper-mockup.jpg'), alt: 'Access Closa press advertisement' },
      { src: p('access-bank', 'photo-01.jpg'), alt: 'Visa World Cup campaign: Access your Visa to Qatar' },
      { src: p('access-bank', 'photo-05.jpg'), alt: 'Visa World Cup themed cards' },
      { src: p('access-bank', 'photo-04.jpg'), alt: 'Cashflow business loan advertisement' },
    ],
  },
  {
    slug: 'sparkle',
    title: 'Sparkle',
    kind: 'Brand identity',
    years: '2021–22',
    line: 'Positioning and identity for a Nigerian digital bank',
    summary: 'Positioning, identity and a 30-page brand guide for a Nigerian digital bank.',
    preview: p('sparkle', 'pdf-brand-overview.png'),
    facts: [
      { label: 'Scope', value: 'Positioning, identity, guidelines, app UI, website' },
      { label: 'Market', value: 'Nigeria' },
    ],
    brief:
      'Sparkle wanted to be a lifestyle proposition that happened to move money, not another banking app with a gradient logo. It also had to earn trust from people wary of new financial platforms.',
    did: [
      'I set the positioning, tone of voice and visual identity, then built a 30-page guide so any designer could stay on-system: logo construction, colour, photography, icons, infographics, signage and merchandise. The palette moves away from the blues and purples common in Nigerian fintech.',
      'I also designed the app’s login, dashboard and payment screens, and the website.',
    ],
    outcome:
      'Sparkle went on to raise $3 million. Its social following grew from zero to more than 10,000 at launch, and 12,320 accounts were opened in the first year.',
    images: [
      { src: p('sparkle', 'pdf-brand-overview.png'), alt: 'Sparkle brand system overview' },
      { src: p('sparkle', 'pdf-logo-construction.png'), alt: 'Sparkle logo construction' },
      { src: p('sparkle', 'pdf-brand-guidelines.png'), alt: 'Pages from the Sparkle brand guide' },
    ],
  },
  {
    slug: 'kavlr',
    title: 'Kavlr',
    kind: 'Cards and product',
    years: '2022–24',
    line: 'Visa cards, packaging and website for a UK fintech',
    summary:
      'Visa debit cards, packaging and the website for Kavlr, the consumer product of Tryba Finance, a UK multicurrency fintech.',
    preview: p('kavlr', 'pdf-visa-black.png'),
    facts: [
      { label: 'Role', value: 'Lead brand and product designer' },
      { label: 'Client', value: 'Tryba Finance, Birmingham' },
      { label: 'Scope', value: 'Cards, packaging, logo, website, product UI' },
    ],
    brief:
      'Fintech cards look interchangeable. Kavlr needed a physical card that felt premium and a website that earned trust from the first visit.',
    did: [
      'I started with the card: green personal, blue, and a black business card. The business card ships in a wallet with a “pull up the card” reveal, and the personal card comes in a tri-fold mailer with activation steps.',
      'I developed the logo from pencil sketches and designed the website and pre-order flow for desktop, tablet and mobile.',
    ],
    outcome:
      'Across Tryba and Kavlr I delivered over 200 brand, campaign and investor assets, including compliance-ready work for the Visa partnership, and a shared asset system that cut design time by about 30 percent.',
    images: [
      { src: p('kavlr', 'pdf-debit-cards.png'), alt: 'Kavlr green and blue debit cards' },
      { src: p('kavlr', 'card-black.png'), alt: 'Kavlr black business card in hand' },
      { src: p('kavlr', 'card-business.png'), alt: 'Business card wallet packaging' },
      { src: p('kavlr', 'card-debit-green.png'), alt: 'Personal card tri-fold activation mailer' },
      { src: p('kavlr', 'logo-construction.png'), alt: 'Logo sketches' },
      { src: p('kavlr', 'website-desktop-2.png'), alt: 'Website home page' },
      { src: p('kavlr', 'website-mobile.png'), alt: 'Website on mobile' },
      { src: p('kavlr', 'website-desktop-3.png'), alt: 'Website navigation' },
      { src: p('kavlr', 'dashboard.png'), alt: 'Booking dashboard' },
    ],
  },
  {
    slug: 'hashit',
    title: 'HashIT',
    kind: 'Brand and product',
    years: '2023–24',
    line: 'A fintech app taken from logo to waitlist to product',
    summary: 'Brand, waitlist, website and app design for a Nigerian fintech that combined banking, social and earning.',
    preview: p('hashit', 'pdf-social-media.png'),
    facts: [
      { label: 'Role', value: 'Head of product design' },
      { label: 'Scope', value: 'Identity, website, app, social, merchandise, pitch deck' },
    ],
    brief:
      'HashIT combined banking, social features, a marketplace and ways to earn. It needed everything at once: an identity people would remember, a waitlist, an app and merchandise to hand out.',
    did: [
      'I designed the h monogram and identity, the waitlist page in light and dark, the full website, the social launch, merchandise and the investor deck.',
      'I led product design for the app with a distributed product and engineering team, from user flows to the interface system.',
    ],
    outcome: 'The waitlist reached 700 people before launch.',
    images: [
      { src: p('hashit', 'pdf-logo.png'), alt: 'HashIT logo' },
      { src: p('hashit', 'pdf-social-media.png'), alt: 'Launch social posts' },
      { src: p('hashit', 'app.png'), alt: 'App dashboard in light and dark' },
      { src: p('hashit', 'pdf-app-ui.png'), alt: 'App UI screens' },
      { src: p('hashit', 'pdf-app-iteration.png'), alt: 'Before and after: a feature redesign', caption: 'A feature redesign shown beside the version it replaced.' },
      { src: p('hashit', 'pdf-waitlist.png'), alt: 'Waitlist page in dark and light' },
      { src: p('hashit', 'pdf-landing-page.png'), alt: 'Website' },
      { src: p('hashit', 'pdf-merch.png'), alt: 'T-shirts and caps' },
      { src: p('hashit', 'pdf-pitch-deck.png'), alt: 'Investor pitch deck' },
    ],
  },
  {
    slug: 'polo-luxury',
    title: 'Polo Luxury',
    kind: 'Campaigns',
    years: '2019–21',
    line: 'Omega 007 launch and seasonal luxury campaigns',
    summary:
      'Email and seasonal campaigns for a Nigerian luxury retailer, including the launch of the Omega Seamaster 007 Edition.',
    preview: p('polo-luxury', 'campaign-14.jpg'),
    facts: [
      { label: 'Scope', value: 'Email, seasonal campaigns, art direction' },
      { label: 'Market', value: 'Lagos, Nigeria' },
    ],
    brief:
      'Polo Luxury wanted sales and awareness for the Omega Seamaster Diver 300M 007 Edition, timed with the release of No Time to Die.',
    did: [
      'I built the launch on a red, black and silver story drawn from the Bond film, with an email designed for desktop and mobile.',
      'Seasonal work for Polo Avenue ran from Easter to Black Friday, pairing editorial fashion photography with angular framing.',
    ],
    outcome: 'The Omega email drove engagement and traffic to Polo Luxury’s website.',
    images: [
      { src: p('polo-luxury', 'pdf-omega-hero.png'), alt: 'Omega Seamaster 007 Edition campaign' },
      { src: p('polo-luxury', 'pdf-omega-layout.png'), alt: 'Omega email layout' },
      { src: p('polo-luxury', 'pdf-omega-newsletter.png'), alt: 'Omega email on desktop and mobile' },
      { src: p('polo-luxury', 'campaign-14.jpg'), alt: 'Black Friday campaign poster' },
      { src: p('polo-luxury', 'campaign-12.jpg'), alt: 'Stay home campaign poster' },
      { src: p('polo-luxury', 'campaign-stay-home.jpg'), alt: 'Stay home Easter campaign' },
      { src: p('polo-luxury', 'campaign-09.jpg'), alt: 'Happy Easter watch campaign' },
      { src: p('polo-luxury', 'campaign-15.jpg'), alt: 'Swarovski campaign' },
    ],
  },
]

export const getWork = (slug: string) => work.find((w) => w.slug === slug)
