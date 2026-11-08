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
    line: 'A learning game children play by moving their hands',
    summary: 'A learning platform for children aged 3 to 7. They trace letters, numbers and shapes in the air, and an ordinary laptop camera follows their hand.',
    preview: p('draw-in-the-air', 'home.jpg'),
    facts: [
      { label: 'Role', value: 'Founder. Product, design and build' },
      { label: 'Studio', value: 'MotionPlay Labs' },
      { label: 'Status', value: 'Live, piloting in a Kent primary school' },
      { label: 'Visit', value: 'drawintheair.com', href: 'https://drawintheair.com' },
    ],
    brief: 'Most screen time asks young children to sit still and tap a screen. I wanted a laptop to get them moving while they learn, with nothing to install and no account to make.',
    did: [
      'I designed and built all of it: the activities, the way the camera reads a hand, the brand and the website. Children pinch their fingers to draw, then pop, sort, spell and find things by moving.',
      'The camera picture is processed inside the browser and never leaves the device. Teachers get a class mode and a simple dashboard, and the activities follow the early years curriculum (EYFS).',
    ],
    outcome: 'It is approved on the Chrome Web Store and is being trialled in a primary school in Kent, in ten to fifteen minute sessions on laptops the school already has. A version that plays on a classroom TV is in development.',
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
    line: 'Free design tools that run in a web browser',
    summary: 'Two free tools that package the way I work, so other designers can use it in a browser tab.',
    preview: p('voidcanvas', 'effects-halftone.jpg'),
    facts: [
      { label: 'Role', value: 'Founder. Product, design and build' },
      { label: 'Studio', value: 'MotionPlay Labs' },
      { label: 'Status', value: 'Live and free' },
      { label: 'Visit', value: 'voidcanvas.app', href: 'https://voidcanvas.app' },
    ],
    brief: 'Over the years I turned most of my own process into shortcuts: brand guidelines, layouts, image effects and exporting files. I wanted designers earlier in their careers to have the same shortcuts, without paying for software or uploading their files.',
    did: [
      'Art Director Studio came first, made for designers working in Nigeria. Voidcanvas is the next step.',
      'Voidcanvas opens Photoshop files and PDFs, turns a client brief into every size the job needs, builds a brand guideline from a logo, and has 58 one-click image effects. It all runs in the browser, so files stay on your own computer.',
    ],
    outcome: 'Both tools are live and free, with no sign-up. Young and working designers use them every day.',
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
    line: 'Billboards, an online festival and a Webby nomination',
    summary: 'The look, the campaigns and an online festival for a pan-African music competition that ran for three seasons in 50 countries.',
    preview: p('tbtm', 'nyc-billboard-05.jpg'),
    facts: [
      { label: 'Role', value: 'Brand and UI design lead' },
      { label: 'Client', value: 'Take Back The Mic, Dubai' },
      { label: 'Recognition', value: 'Webby Award nomination, 2023' },
      { label: 'Reach', value: '1.1 billion media impressions' },
    ],
    brief: 'Take Back The Mic ran across Africa, Europe, the US and the Middle East. Each season needed one look that worked everywhere, from a billboard in Times Square to an online festival full of speakers and partners.',
    did: [
      'I led the design across every campaign and screen, and designed the brand and the online spaces for the TBTM Interactive Festival.',
      'For the 2022 festival I changed the colours from yellow and black to green and teal, made the social posts easier to read, and designed a schedule that works for one day or several. I also designed the TBTM payment card shown in the meetings that led to a multi-year partnership with Mastercard.',
    ],
    outcome: 'The programme was seen over 1.1 billion times across 50 countries. The Interactive Festival was nominated for a Webby Award in 2023.',
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
    line: 'The only designer at a UK renewable fuel maker',
    summary: 'Since 2022 I have been the only designer at a renewable fuel maker in Kent, designing everything from the side of a tanker to a briefing for the Department for Transport.',
    preview: p('syntech', 'artboard-social-2.jpg'),
    facts: [
      { label: 'Role', value: 'Sole designer, reporting to the CEO' },
      { label: 'Since', value: 'October 2022' },
      { label: 'Scope', value: 'Brand system, campaigns, reports, signage, digital tools' },
      { label: 'Sub-brands', value: 'BioCabby, Liquid Gold' },
    ],
    brief: 'Syntech makes renewable fuel from waste oils. Its brand has to work in a boardroom, at a trade show, on a fleet of vehicles and on a site sign. It also has to explain a technical product to people who have only ever bought diesel.',
    did: [
      'I look after how Syntech and its smaller brands, BioCabby and Liquid Gold, look and sound. That covers templates, an icon set I drew by hand first, vehicle graphics, site signs, and print settings that keep the green the same on a screen and on a large banner.',
      'Recent work includes the Change the Fuel. Not the Fleet. campaign, the 1 Million Litres trial report, a briefing note for the Department for Transport, and an online calculator that compares Syntech\'s fuel with diesel.',
    ],
    outcome: 'One consistent look now runs from social posts to the front of the office. I also lead design for a schools programme on cutting carbon, which mixes physical kits, online lessons and 3D characters made with AI tools.',
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
    line: 'An identity that holds its own in Westminster',
    summary: 'The identity, website and event design for a business group that works with government and industry on net zero.',
    preview: p('route-to-zero', 'logo.png'),
    facts: [
      { label: 'Role', value: 'Brand and communications design' },
      { label: 'Scope', value: 'Identity, certification marks, guidelines, website, events' },
      { label: 'Website', value: 'routetozero.co.uk', href: 'https://www.routetozero.co.uk' },
    ],
    brief: 'Route to Zero brings businesses and policymakers together to cut carbon. Its look had to feel serious enough for a parliamentary briefing, not like another green campaign.',
    did: [
      'I drew the logo from first sketches, where the zero turns into a route with an arrow. Members get one of three certification marks. I wrote the brand guidelines and put them online so anyone can follow them.',
      'I designed the website, reports, templates and merchandise, and I design the stage graphics and printed material for its events.',
    ],
    outcome: 'The identity is used across all of Route to Zero\'s work, including events with MPs and senior policymakers at the Royal Institution of Chartered Surveyors and the Royal College of General Practitioners.',
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
    line: 'A brand guide, a new sub-brand and campaigns after a bank merger',
    summary: 'Brand guidelines, a brand for the bank\'s local agents, and national campaigns after Access Bank and Diamond Bank merged.',
    preview: p('access-bank', 'photo-02.jpg'),
    facts: [
      { label: 'Scope', value: 'Brand guidelines, sub-brand, press and outdoor campaigns' },
      { label: 'Market', value: 'Nigeria' },
    ],
    brief: 'The merger was described as the largest in African banking. Diamond was known for everyday customers and Access for big business, so the new brand had to feel right for both.',
    did: [
      'I worked on \'more than banking\', the guide that explains how the merged bank looks and speaks: colours, fonts, tone of voice and photography. The new logo carries Diamond\'s diamond shape into the Access name.',
      'I then designed Access Closa, the brand for the bank\'s local agents, with its national press and outdoor campaign, plus campaigns for the Visa World Cup cards and the Cashflow business loan.',
    ],
    outcome: 'The guide sets how the merged bank appears in its branches and its communications.',
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
    line: 'What a Nigerian digital bank stands for, and how it looks',
    summary: 'The positioning, the look and a 30-page brand guide for a Nigerian digital bank.',
    preview: p('sparkle', 'pdf-brand-overview.png'),
    facts: [
      { label: 'Scope', value: 'Positioning, identity, guidelines, app UI, website' },
      { label: 'Market', value: 'Nigeria' },
    ],
    brief: 'Sparkle wanted to feel like a lifestyle brand that happened to move money, not another banking app. It also had to win the trust of people who were wary of new money apps.',
    did: [
      'I wrote what Sparkle stands for and how it speaks, designed the identity, and built a 30-page guide so any designer could keep it consistent: logo, colour, photography, icons, charts, signs and merchandise. The colours step away from the blues and purples most Nigerian fintech brands use.',
      'I also designed the app\'s sign-in, home and payment screens, and the website.',
    ],
    outcome: 'Sparkle went on to raise $3 million. Its social following grew from zero to over 10,000 at launch, and 12,320 accounts were opened in the first year.',
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
    line: 'Bank cards, packaging and a website for a UK fintech',
    summary: 'Visa debit cards, the packs they arrive in, and the website for Kavlr, the consumer side of UK fintech Tryba Finance.',
    preview: p('kavlr', 'debit-cards.png'),
    facts: [
      { label: 'Role', value: 'Lead brand and product designer' },
      { label: 'Client', value: 'Tryba Finance, Birmingham' },
      { label: 'Scope', value: 'Cards, packaging, logo, website, product UI' },
    ],
    brief: 'Most bank cards look the same. Kavlr needed a card that felt special in the hand and a website people would trust on their first visit.',
    did: [
      'I started with the card: green for personal, blue, and a black business card. The business card arrives in a wallet you pull open to reveal it. The personal card comes in a folded mailer that shows the three steps to activate it.',
      'I drew the logo from pencil sketches and designed the website and pre-order pages for desktop, tablet and phone.',
    ],
    outcome: 'Across Tryba and Kavlr I made over 200 brand, campaign and investor pieces, including work approved for the Visa partnership, and a shared library that cut design time by about 30 percent.',
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
    line: 'A money app taken from logo to waitlist to product',
    summary: 'The brand, waitlist, website and app design for a Nigerian money app that mixed banking, social features and ways to earn.',
    preview: p('hashit', 'pdf-social-media.png'),
    facts: [
      { label: 'Role', value: 'Head of product design' },
      { label: 'Scope', value: 'Identity, website, app, social, merchandise, pitch deck' },
    ],
    brief: 'HashIT combined banking, social features, a marketplace and ways to earn. It needed everything at once: a name people would remember, a waitlist, an app and merchandise to give away.',
    did: [
      'I designed the h symbol and the identity, the waitlist page in light and dark, the website, the launch posts, the merchandise and the investor deck.',
      'I led the app design with product and engineering teams in different countries, from how each screen connects to the final interface.',
    ],
    outcome: '700 people joined the waitlist before launch.',
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
    line: 'Omega\'s 007 watch launch and seasonal luxury campaigns',
    summary: 'Email and seasonal campaigns for a Nigerian luxury store, including the launch of Omega\'s James Bond watch.',
    preview: p('polo-luxury', 'campaign-14.jpg'),
    facts: [
      { label: 'Scope', value: 'Email, seasonal campaigns, art direction' },
      { label: 'Market', value: 'Lagos, Nigeria' },
    ],
    brief: 'Polo Luxury wanted sales and attention for the Omega Seamaster Diver 300M 007 Edition, timed with the release of No Time to Die.',
    did: [
      'I built the launch around red, black and silver, taken from the Bond film, with an email designed for both computer and phone.',
      'Seasonal work for its Polo Avenue store ran from Easter to Black Friday, pairing fashion photography with sharp, angled frames.',
    ],
    outcome: 'The Omega email brought engagement and visits to Polo Luxury\'s website.',
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
