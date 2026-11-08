// All case study copy lives here. Edit this file to change the site.
// Image sizes come from image-sizes.json (run scripts/image_manifest.py after adding images).

/** How wide an image sits in a chapter: full width, half, or a third. */
export type Span = 'wide' | 'half' | 'third'

export type Img = {
  src: string
  alt: string
  caption?: string
  span?: Span
  /** An MP4 to play in place of the image. `src` is then the poster frame. */
  video?: string
}

export type Fact = { label: string; value: string; href?: string }

export type Chapter = { title: string; text: string; images: Img[] }

export type Work = {
  slug: string
  title: string
  kind: string
  years: string
  /** One line for the home page tile. */
  line: string
  /** Opening paragraph on the case page. */
  summary: string
  /** Image on the home page tile, and where to centre its crop. */
  preview: string
  previewPosition?: string
  /** The first, full-width image on the case page. */
  cover: Img & { fit?: 'cover' | 'contain'; bg?: string; position?: string }
  facts: Fact[]
  /** The idea in one sentence. */
  idea: string
  brief: string
  chapters: Chapter[]
  outcome: string
  link?: { label: string; href: string }
}

const p = (slug: string, file: string) => `/assets/projects/${slug}/${file}`
const img = (src: string, alt: string, span: Span = 'half', caption?: string): Img => ({ src, alt, span, caption })

export const work: Work[] = [
  {
    slug: 'route-to-zero',
    title: 'Route to Zero',
    kind: 'Brand identity',
    years: '2024–now',
    line: 'A road sign for the route to net zero',
    summary:
      'The identity, guidelines, website and printed work for a business group that brings industry and government together to cut carbon.',
    preview: p('route-to-zero', 'road-sign.jpg'),
    previewPosition: '30% 50%',
    cover: {
      src: p('route-to-zero', 'road-sign.jpg'),
      alt: 'The Route to Zero logo as a road sign beside a country road at dawn',
      position: '30% 50%',
    },
    facts: [
      { label: 'Role', value: 'Brand designer, from first sketch to guidelines' },
      { label: 'Client', value: 'Route to Zero, UK' },
      { label: 'Scope', value: 'Logo, guidelines, website, print, merchandise' },
      { label: 'Guidelines', value: 'Read them online', href: 'https://justinlagos.github.io/rtz-brand-guidelines/' },
    ],
    idea: 'A road sign that points one way: down to zero.',
    brief:
      'Route to Zero brings businesses and policymakers together to cut carbon. Its look had to feel serious enough for a briefing in Westminster, without looking like another green campaign.',
    chapters: [
      {
        title: 'From a sketch to a symbol',
        text: 'The mark joins two pictures people already understand. A road sign gives direction. A falling graph line crossing a globe shows progress you can measure. I worked it out in marker first, then fixed it on a grid.',
        images: [
          img(p('route-to-zero', 'guide-sketch.jpg'), 'Guidelines page: first sketches, construction and the final mark', 'wide'),
          img(
            p('route-to-zero', 'guide-construction.jpg'),
            'Guidelines page: the logo drawn on its construction grid',
            'wide',
            'The grid sets the stroke weight, the circle and the angle of the arrow.',
          ),
        ],
      },
      {
        title: 'One mark, four versions',
        text: 'Full colour on dark teal is the main version. A light version covers white paper, greyscale covers embossing and shared logos, and the symbol on its own works where space is tight, like an app icon.',
        images: [
          img(p('route-to-zero', 'img06_3f5b0ebe66.jpg'), 'Route to Zero logo in full colour on dark teal', 'half', 'Full colour on dark teal'),
          img(p('route-to-zero', 'img07_2ebae1afff.jpg'), 'Route to Zero logo in full colour on white', 'half', 'Full colour on light'),
          img(p('route-to-zero', 'img08_1aa3b4c927.jpg'), 'Route to Zero logo in greyscale on black', 'half', 'Greyscale'),
          img(p('route-to-zero', 'img09_65071b0b41.jpg'), 'Route to Zero symbol on its own', 'half', 'Symbol only'),
        ],
      },
      {
        title: 'Colour and type that tell the story',
        text: 'Deep teal stands for heavy industry and bright green for clean energy, so the palette itself describes the move to net zero. Fraunces gives headlines an editorial voice, Inter does the everyday work, and a mono face sets the numbers.',
        images: [
          img(p('route-to-zero', 'guide-colour.jpg'), 'Guidelines page: primary and supporting colours with values', 'half'),
          img(p('route-to-zero', 'guide-type.jpg'), 'Guidelines page: Fraunces, Inter and JetBrains Mono', 'half'),
        ],
      },
      {
        title: 'Rules that protect it',
        text: 'Guidelines only work if people can follow them. Clear space, minimum sizes and six things never to do are shown as pictures, so a printer or a partner can check them in seconds.',
        images: [
          img(p('route-to-zero', 'guide-clearspace.jpg'), 'Guidelines page: clear space and minimum sizes', 'half'),
          img(p('route-to-zero', 'guide-misuse.jpg'), 'Guidelines page: six ways not to use the logo', 'half'),
        ],
      },
      {
        title: 'On screen',
        text: 'I designed the website so the teal and green carry from the logo to every page, on desktop, tablet and phone.',
        images: [
          img(p('route-to-zero', 'img11_9f9fbbbc01.jpg'), 'Route to Zero website pages shown on laptops', 'wide'),
          img(p('route-to-zero', 'img12_960650dee6.jpg'), 'Route to Zero website pages', 'half'),
          img(p('route-to-zero', 'img13_36eaed09ef.jpg'), 'Route to Zero website on a phone and a laptop', 'half'),
        ],
      },
      {
        title: 'In the world',
        text: 'The same system runs on the annual progress report, business cards, vans, merchandise and site safety gear.',
        images: [
          img(p('route-to-zero', 'img19_4687f1c77c.jpg'), 'Route to Zero livery on a fleet of vans', 'wide'),
          img(p('route-to-zero', 'img16_f62f6c4d51.jpg'), 'Route to Zero annual progress report cover', 'half'),
          img(p('route-to-zero', 'img15_2d1459d41a.jpg'), 'Route to Zero business cards', 'half'),
          img(p('route-to-zero', 'img20_d364df4ce3.jpg'), 'Route to Zero merchandise: cap, T-shirt, bottle, mug, tote and notebook', 'half'),
          img(p('route-to-zero', 'img21_0ad29d2d15.jpg'), 'Route to Zero logo on a white safety helmet', 'half'),
        ],
      },
    ],
    outcome:
      'The identity now carries all of Route to Zero’s work, including events with MPs and senior policymakers at the Royal Institution of Chartered Surveyors and the Royal College of General Practitioners. The guidelines live online, so anyone working with the brand can check a colour or a rule in seconds.',
    link: { label: 'Open the brand guidelines', href: 'https://justinlagos.github.io/rtz-brand-guidelines/' },
  },
  {
    slug: 'ryan-smith-racing',
    title: 'Ryan Smith Racing',
    kind: 'Sponsorship and helmet design',
    years: '2024–25',
    line: 'Helmets and race days for a ten-time British Truck Racing champion',
    summary:
      'Syntech Biofuel sponsors Ryan Smith, ten times British Truck Racing champion. I designed his helmets, the mark for his tenth title, and the work around each race weekend.',
    preview: p('ryan-smith', 'champion-helmet.jpg'),
    previewPosition: '50% 40%',
    cover: {
      src: p('ryan-smith', 'champion-helmet.jpg'),
      alt: 'Ryan Smith holding the Union Jack championship helmet in the paddock',
      position: '50% 38%',
    },
    facts: [
      { label: 'Role', value: 'Designer for the sponsor, Syntech Biofuel' },
      { label: 'Driver', value: 'Ryan Smith, British Truck Racing Championship' },
      { label: 'Scope', value: 'Helmets, champion mark, race-day print and social, team kit, sponsor deck' },
      { label: 'Result', value: 'Tenth title in a row, Brands Hatch, November 2025' },
    ],
    idea: 'Every camera finds the driver’s helmet, so that is where the story goes.',
    brief:
      'Syntech sponsors Ryan Smith’s racing. The job was to make that support visible on race weekends, on screens and in the paddock, without it looking like an advert stuck onto a sport.',
    chapters: [
      {
        title: 'The 2025 helmet',
        text: 'For the 2025 season I designed a black helmet with a lime strike across the shell, in Syntech’s colours, with each sponsor placed where the cab cameras catch it. I prepared flat artwork for every part of the shell so it could be made for real.',
        images: [
          img(p('ryan-smith', '2025-helmet-board.jpg'), 'The 2025 helmet from the side and from the back', 'wide'),
          img(p('ryan-smith', '2025-helmet-built.jpg'), 'The 2025 helmet, made', 'half'),
          img(p('ryan-smith', '2025-helmet-built-2.jpg'), 'The 2025 helmet from the front', 'half'),
        ],
      },
      {
        title: 'A mark for ten in a row',
        text: 'As Ryan went for a tenth straight title, I designed a mark for the moment: a crown, a ring of stars, the number ten and his own signature. It works in gold for the celebration and in black for print and merchandise.',
        images: [
          img(p('ryan-smith', 'ten-mark-gold.jpg'), 'Ten times consecutive champion mark in gold on black', 'half'),
          img(p('ryan-smith', 'ten-mark-black.jpg'), 'Ten times consecutive champion mark in black', 'half'),
        ],
      },
      {
        title: 'The championship helmet',
        text: 'The title helmet carries the Union Jack, the gold ten on the back and Powered by Syntech ASB along the side, so the sponsor shows in photos from every angle.',
        images: [
          img(p('ryan-smith', 'ten-helmet-board.jpg'), 'The championship helmet from the side, the front and the back', 'wide'),
          img(p('ryan-smith', 'handover.jpg'), 'Ryan Smith with the championship helmet in the paddock', 'half'),
          img(p('ryan-smith', 'paddock.jpg'), 'Ryan Smith and the team with the helmet', 'half'),
        ],
      },
      {
        title: 'Race weekends',
        text: 'Flyers, pop-up banners and good-luck posts for each round, all in the same green and black, so fans meet one story from the grandstand to their phone.',
        images: [
          img(p('ryan-smith', 'race-weekend-board.jpg'), 'Brands Hatch flyer, two good-luck posts and a pop-up banner', 'wide'),
          img(p('ryan-smith', 'ten-titles-post.jpg'), 'Post: 10 years, 10 titles, unreal', 'half'),
          img(p('ryan-smith', 'team-tshirt.jpg'), 'Ryan Smith Racing T-shirts, front and back', 'half'),
        ],
      },
      {
        title: 'Selling the next season',
        text: 'A sponsorship deck for 2026 makes the case to new partners in plain numbers: ten titles, the crowds at each round and the reach of the broadcasts.',
        images: [
          img(p('ryan-smith', 'deck-1.jpg'), 'Sponsorship deck cover: 10x consecutive BTRC champion, 2026 sponsorship opportunity', 'wide'),
          img(p('ryan-smith', 'deck-2.jpg'), 'Deck page: Why sponsor Ryan', 'half'),
          img(p('ryan-smith', 'deck-4.jpg'), 'Deck page: audience and fan reach', 'half'),
        ],
      },
    ],
    outcome:
      'Ryan sealed his tenth consecutive British Truck Racing title at Brands Hatch in November 2025. The helmets, the ten-title mark and the race-day work kept Syntech in the story all season, and the deck now takes that story to the next sponsors.',
  },
  {
    slug: 'take-back-the-mic',
    title: 'Take Back The Mic',
    kind: 'Festival and campaign',
    years: '2021–24',
    line: 'Billboards, an online festival and a Webby nomination',
    summary:
      'The look, the campaigns and an online festival for a pan-African music competition that ran for three seasons in 50 countries.',
    preview: p('tbtm', 'nyc-billboard-05.jpg'),
    cover: {
      src: p('tbtm', 'festival-tile-2022.jpg'),
      alt: 'TBTM Interactive Festival 2022: Remixing the Renaissance',
      fit: 'contain',
      bg: '#01cf7a',
    },
    facts: [
      { label: 'Role', value: 'Brand and UI design lead' },
      { label: 'Client', value: 'Take Back The Mic, Dubai' },
      { label: 'Recognition', value: 'Webby Award nomination, 2023' },
      { label: 'Reach', value: '1.1 billion media impressions' },
    ],
    idea: 'One look that works on a screen in Times Square and on a phone in Lagos.',
    brief:
      'Take Back The Mic ran across Africa, Europe, the US and the Middle East. Each season needed one look that worked everywhere, from a billboard in New York to an online festival full of speakers and partners.',
    chapters: [
      {
        title: 'Season one',
        text: 'The first Interactive Festival in 2021 used yellow and black, with the full line-up set out like a ticket. It set the tone the later seasons grew from.',
        images: [img(p('tbtm', 'festival-flyer-2021.jpg'), 'TBTM Interactive Festival 2021 banner in yellow and black', 'wide')],
      },
      {
        title: 'A new look for 2022',
        text: 'For 2022 I moved the brand to green and teal and built a city skyline that runs along the bottom of every piece. Speakers, partners and the schedule share one layout, so each post reads in a glance.',
        images: [
          img(p('boards', 'tbtm-2022.jpg'), 'TBTM 2022 posts: dates and partners, speakers, and the two-day schedule', 'wide'),
        ],
      },
      {
        title: 'On screens in New York',
        text: 'The campaign ran on large screens in New York, including the Thomson Reuters screen in Times Square.',
        images: [
          img(p('tbtm', 'nyc-billboard-05.jpg'), 'TBTM festival dates on the Thomson Reuters screen', 'half'),
          img(p('tbtm', 'nyc-billboard-08.jpg'), 'TBTM title on a building screen in New York', 'half'),
        ],
      },
      {
        title: 'Panels, partners and a Webby',
        text: 'Each panel had its own card, with speakers set in the brand’s yellow frames so a full line-up reads at a glance. The festival itself was nominated for a Webby Award.',
        images: [
          img(p('boards', 'tbtm-panels.jpg'), 'Two panel cards and the Webby nomination post', 'wide'),
        ],
      },
    ],
    outcome:
      'The programme was seen over 1.1 billion times across 50 countries. The Interactive Festival was nominated for a Webby Award in 2023. I also designed the TBTM payment card shown in the meetings that led to a multi-year partnership with Mastercard.',
  },
  {
    slug: 'syntech-biofuel',
    title: 'Syntech Biofuel',
    kind: 'In-house brand',
    years: '2022–now',
    line: 'The only designer at a UK renewable fuel maker',
    summary:
      'Since 2022 I have been the only designer at a renewable fuel maker in Kent, designing everything from the side of a tanker to a briefing for the Department for Transport.',
    preview: p('syntech', 'artboard-social-2.jpg'),
    cover: {
      src: p('syntech', 'logo-icon.png'),
      alt: 'Syntech Biofuel leaf livery on a dark Land Rover Defender',
      position: '50% 60%',
    },
    facts: [
      { label: 'Role', value: 'Sole designer, reporting to the CEO' },
      { label: 'Since', value: 'October 2022' },
      { label: 'Scope', value: 'Brand system, campaigns, reports, signage, vehicles' },
      { label: 'Sub-brands', value: 'BioCabby, Liquid Gold' },
    ],
    idea: 'Make switching fuel feel simple and safe for people who have only ever bought diesel.',
    brief:
      'Syntech makes renewable fuel from waste oils. Its brand has to work in a boardroom, at a trade show, on a fleet of vehicles and on a site sign, and it has to explain a technical product in plain words.',
    chapters: [
      {
        title: 'One look across a whole company',
        text: 'I look after how Syntech looks and sounds, from logo files and templates to print settings that keep the green the same on a screen and on a large banner. I drew the icon set for the product’s selling points by hand first.',
        images: [
          img(p('syntech', 'pdf-logo.png'), 'Syntech Biofuel logo on charcoal', 'half'),
          img(p('syntech', 'pdf-strategy-doc-clean.jpg'), 'Hand-drawn icon sketches next to the finished selling-point cards', 'half'),
        ],
      },
      {
        title: 'On the road',
        text: 'Vehicle graphics turn every delivery into an advert. The tanker and the van carry the line Putting Renewables First, and a concept forecourt shows how the brand would work at a petrol station.',
        images: [
          img(p('syntech', 'pdf-social-campaign-2-clean.jpg'), 'Syntech livery on a fuel tanker and a van', 'half'),
          img(p('syntech', 'pdf-petrol-station-clean.jpg'), 'Concept Syntech petrol station and price sign', 'half'),
        ],
      },
      {
        title: 'Campaigns people stop for',
        text: 'Each social post leads with one plain, strong line, and the photography carries the feeling. The logo stays small, so the message comes first.',
        images: [
          img(p('boards', 'syntech-social.jpg'), 'Three Syntech posts: decarbonise together, fossil fuel is dead, our version of the future', 'wide'),
        ],
      },
      {
        title: 'Smaller brands under one roof',
        text: 'BioCabby, for London taxis, and Liquid Gold, the sample pack for fuel trials, each have their own name and colours but sit clearly under Syntech.',
        images: [
          img(p('syntech', 'pdf-biocabby-clean.jpg'), 'BioCabby logo and a London taxi in BioCabby livery', 'half'),
          img(p('syntech', 'pdf-liquid-gold-clean.jpg'), 'Liquid Gold sample bottle label and photography', 'half'),
        ],
      },
      {
        title: 'Explaining the product',
        text: 'Handbooks, leaflets and trial reports explain the fuel in plain words for staff, customers and government.',
        images: [
          img(p('syntech', 'brochure-cover-2.jpg'), 'Syntech staff handbook cover', 'half'),
          img(p('syntech', 'brochure-spread.jpg'), 'Syntech handbook opening spread', 'half'),
          img(p('syntech', 'pdf-brochure-clean.jpg'), 'Syntech tri-fold leaflet, inside and out', 'wide'),
        ],
      },
      {
        title: 'On site',
        text: 'Signs for the site, from the gate and parking to unit numbers, and an office front that reads by day and by night.',
        images: [
          img(p('syntech', 'pdf-site-signs-clean.jpg'), 'Syntech site signs: road sign, gates, parking and units', 'half'),
          img(p('syntech', 'pdf-social-campaign-3-clean.jpg'), 'Syntech office front by night and by day', 'half'),
        ],
      },
    ],
    outcome:
      'One consistent look now runs from social posts to the front of the office. Recent work includes the Change the Fuel. Not the Fleet. campaign, the 1 Million Litres trial report and a briefing note for the Department for Transport. I also lead design for a schools programme on cutting carbon.',
  },
  {
    slug: 'access-bank',
    title: 'Access Bank',
    kind: 'Brand and campaigns',
    years: '2022–23',
    line: 'A brand guide, a new sub-brand and campaigns after a bank merger',
    summary:
      'Brand guidelines, a brand for the bank’s local agents, and national campaigns after Access Bank and Diamond Bank merged.',
    preview: p('access-bank', 'photo-02.jpg'),
    previewPosition: '50% 35%',
    cover: { src: p('access-bank', 'pdf-brand-guide-cover.png'), alt: 'Access Bank brand guide: More than banking' },
    facts: [
      { label: 'Role', value: 'Designer on the merger team, then campaigns and design manager' },
      { label: 'Scope', value: 'Merger communications, brand guide, sub-brand, campaigns' },
      { label: 'Context', value: 'Access Bank and Diamond Bank merger, 2019' },
      { label: 'Market', value: 'Nigeria' },
    ],
    idea: 'Two banks, one name, and room in it for both sets of customers.',
    brief:
      'The merger was described as the largest in African banking. Diamond was known for everyday customers and Access for big business, so the new brand had to feel right for both.',
    chapters: [
      {
        title: 'One bank from two',
        text: 'The new logo carries Diamond’s diamond shape into the Access name, so customers of both banks can see themselves in it.',
        images: [img(p('access-bank', 'pdf-merger-scope.png'), 'Access plus Diamond equals the new Access logo', 'wide')],
      },
      {
        title: 'More than banking',
        text: 'I worked on the guide that explains how the merged bank looks and speaks: colours, fonts, tone of voice and photography.',
        images: [
          img(p('access-bank', 'pdf-brand-interior.png'), 'Brand guide spread: Our brand', 'wide'),
          img(p('access-bank', 'guideline-1.png'), 'Brand guide spread: typefaces', 'half'),
          img(p('access-bank', 'guideline-3.png'), 'Brand guide spread: icons', 'half'),
        ],
      },
      {
        title: 'Access Closa, a brand for local agents',
        text: 'Access Closa is the name for the bank’s agents, who offer banking in markets and neighbourhoods. The campaign puts an agent at the centre of a giant map pin, so the message, there is an agent near you, lands before you read a word.',
        images: [
          img(p('boards', 'access-closa.jpg'), 'Access Closa posters: Agent dey near you, and Become a super agent', 'wide'),
          img(p('access-bank', 'newspaper-mockup.jpg'), 'Access Closa press advert in a national newspaper', 'wide'),
        ],
      },
      {
        title: 'Campaigns',
        text: 'Press and outdoor work for the Visa World Cup cards and the Cashflow business loan.',
        images: [
          img(p('boards', 'access-campaigns.jpg'), 'Posters for the Visa World Cup cards and the Cashflow business loan', 'wide'),
        ],
      },
    ],
    outcome: 'The guide sets how the merged bank appears in its branches and its communications, and Access Closa gave its agent network a name and a face across the country.',
  },
  {
    slug: 'jme-foundation',
    title: 'JaneMichael Ekanem Foundation',
    kind: 'Brand identity',
    years: '2026',
    line: 'A brand for a girls’ scholarship in Lagos',
    summary:
      'Brand guidelines, formal documents and weekly social media for a foundation that helps girls in Lagos move from secondary school into higher education.',
    preview: p('jme-foundation', 'guide-cover.jpg'),
    previewPosition: '30% 50%',
    cover: {
      src: p('jme-foundation', 'guide-cover.jpg'),
      alt: 'Cover of the JaneMichael Ekanem Foundation brand guidelines: Opportunity becomes legacy',
    },
    facts: [
      { label: 'Role', value: 'Brand and presentation advisor' },
      { label: 'Client', value: 'JaneMichael Ekanem Foundation, Lagos' },
      { label: 'Scope', value: 'Brand guidelines, document suite, weekly social carousels' },
      { label: 'Year', value: '2026' },
    ],
    idea: 'One opportunity creates a ripple.',
    brief:
      'The foundation began in 2016, when JaneMichael Ekanem went back to her old school to help one girl continue her education. Ten years on, it needed to look as serious as its promise, to schools, parents and future supporters.',
    chapters: [
      {
        title: 'Where it starts',
        text: 'The founder’s guiding belief is that a good name is better than silver or gold. The brand grows from one picture: a single girl’s opportunity spreads outward to her family, her community and the next generation, like a ripple.',
        images: [
          img(p('jme-foundation', 'guide-belief.jpg'), 'A good name is better than silver or gold', 'wide'),
          img(p('jme-foundation', 'guide-ripple-idea.jpg'), 'Diagram: one scholar, her family, her community, the next generation', 'wide'),
        ],
      },
      {
        title: 'Drawing the mark',
        text: 'I drew the mark by hand first. A hand holds a heart. Inside it, one girl rises with her arms in the air and two more rise beside her. Beneath it, the founder’s name is written like a signature on a promise. The guidelines explain what each part means and give seven versions for different backgrounds and printing.',
        images: [
          img(p('jme-foundation', 'mark-sketch.jpg'), 'Pencil sketches of the heart, the hand and the three figures on a sketch pad', 'wide', 'Working the mark out in pencil: one stroke for the hand and the heart.'),
          img(p('jme-foundation', 'guide-mark.jpg'), 'The mark, with its six parts labelled', 'wide'),
          img(p('jme-foundation', 'guide-mark-versions.jpg'), 'Seven colour versions of the mark', 'wide'),
        ],
      },
      {
        title: 'Colour and type',
        text: 'Four colours come from the mark itself: leaf green, laterite red, ochre and graphite. Bodoni Moda brings the poise of a fashion editorial to big moments, and Montserrat keeps everything else clear.',
        images: [
          img(p('jme-foundation', 'guide-colour.jpg'), 'Colour page: Leaf, Laterite, Ochre and Graphite', 'half'),
          img(p('jme-foundation', 'guide-type.jpg'), 'Type page: Bodoni Moda and Montserrat', 'half'),
        ],
      },
      {
        title: 'A device and a voice',
        text: 'The ripple becomes a graphic device: rings that spread out from the scholar in the mark. The writing follows one rule. It should sound like a mentor who believes in you: warm, plain and sure.',
        images: [
          img(p('jme-foundation', 'guide-ripple.jpg'), 'The ripple device drawn out from the mark', 'half'),
          img(p('jme-foundation', 'guide-voice.jpg'), 'Voice page: We sound like a mentor who believes in you', 'half'),
        ],
      },
      {
        title: 'In use',
        text: 'One colour leads each post: quotes on laterite, values on leaf, stories on cream. The same system carries the letterhead, business cards and the certificate each scholar receives.',
        images: [
          img(p('jme-foundation', 'guide-in-use.jpg'), 'Instagram posts, a street poster and a tote bag', 'wide'),
          img(p('jme-foundation', 'guide-stationery.jpg'), 'Letterhead and business cards', 'half'),
          img(p('jme-foundation', 'guide-certificate.jpg'), 'Certificate of scholarship', 'half'),
        ],
      },
    ],
    outcome:
      'The foundation now has a complete brand: a guideline book, a formal set of documents for its partner school, and a weekly series of quote carousels on Instagram.',
  },
  {
    slug: 'kavlr',
    title: 'Kavlr',
    kind: 'Cards and product',
    years: '2022–24',
    line: 'Bank cards, packaging and a website for a UK fintech',
    summary:
      'Visa debit cards, the packs they arrive in, and the website for Kavlr, the consumer side of UK fintech Tryba Finance.',
    preview: p('kavlr', 'debit-cards.png'),
    cover: { src: p('kavlr', 'card-black.png'), alt: 'A hand holding the black Kavlr Visa business card' },
    facts: [
      { label: 'Role', value: 'Lead brand and product designer' },
      { label: 'Client', value: 'Tryba Finance, Birmingham' },
      { label: 'Scope', value: 'Logo, cards, packaging, website, product screens' },
    ],
    idea: 'A bank card that feels worth keeping.',
    brief: 'Most bank cards look the same. Kavlr needed a card that felt special in the hand and a website people would trust on their first visit.',
    chapters: [
      {
        title: 'Cards and the packs they come in',
        text: 'Green for personal, blue, and a black card for business. The business card arrives in a wallet you pull open. The personal card comes in a folded mailer that shows the three steps to start using it.',
        images: [
          img(p('kavlr', 'debit-cards.png'), 'Blue and green Kavlr Visa debit cards', 'wide'),
          img(p('kavlr', 'card-business.png'), 'Black business card in its pull-open wallet', 'half'),
          img(p('kavlr', 'card-debit-green.png'), 'Green card in its folded mailer with three steps', 'half'),
        ],
      },
      {
        title: 'The mark',
        text: 'I drew the K from pencil sketches, so it holds up on a card, an app icon and a website.',
        images: [img(p('kavlr', 'logo-construction.png'), 'Pencil sketches of the Kavlr K', 'wide')],
      },
      {
        title: 'Website and product',
        text: 'I designed the website and pre-order pages for desktop, tablet and phone, and screens for the product itself.',
        images: [
          img(p('boards', 'kavlr-web.jpg'), 'Kavlr website on desktop and on three phones', 'wide'),
          img(p('kavlr', 'dashboard.png'), 'Kavlr booking screen for business customers', 'wide'),
        ],
      },
    ],
    outcome:
      'Across Tryba and Kavlr I made over 200 brand, campaign and investor pieces, including work approved for the Visa partnership, and a shared library that cut design time by about 30 percent.',
  },
  {
    slug: 'draw-in-the-air',
    title: 'Draw in the Air',
    kind: 'Own product',
    years: 'Live',
    line: 'A learning game children play by moving their hands',
    summary:
      'A learning platform for children aged 3 to 7. They trace letters, numbers and shapes in the air, and an ordinary laptop camera follows their hand.',
    preview: p('draw-in-the-air', 'home.jpg'),
    cover: { src: p('draw-in-the-air', 'home.jpg'), alt: 'Draw in the Air home page: They draw in the air. They learn.' },
    facts: [
      { label: 'Role', value: 'Founder. Product, design and build' },
      { label: 'Studio', value: 'MotionPlay Labs' },
      { label: 'Status', value: 'Live, piloting in a Kent primary school' },
      { label: 'Visit', value: 'drawintheair.com', href: 'https://drawintheair.com' },
    ],
    idea: 'Learning that starts with a wave, not a tap.',
    brief:
      'Most screen time asks young children to sit still and tap a screen. I wanted a laptop to get them moving while they learn, with nothing to install and no account to make.',
    chapters: [
      {
        title: 'No instructions needed',
        text: 'Play starts with a wave, so a three-year-old needs no help to begin. Children pinch their fingers to draw, then pop, sort, spell and find things by moving. The camera request explains what happens to the video before the browser asks.',
        images: [
          img(p('draw-in-the-air', 'wave-to-start.jpg'), 'Start screen asking the child to wave at the camera', 'half'),
          img(p('draw-in-the-air', 'camera-consent.jpg'), 'Camera screen explaining that video never leaves the device', 'half'),
        ],
      },
      {
        title: 'Built for a classroom',
        text: 'Teachers get a class mode and a simple dashboard, and the activities follow the early years curriculum (EYFS). The camera picture is processed in the browser and never leaves the device.',
        images: [img(p('draw-in-the-air', 'for-teachers.jpg'), 'Teachers page: whole-class movement, zero setup', 'wide')],
      },
    ],
    outcome:
      'It is approved on the Chrome Web Store and is being trialled in a primary school in Kent, in ten to fifteen minute sessions on laptops the school already has. A version that plays on a classroom TV is in development.',
    link: { label: 'Try it at drawintheair.com', href: 'https://drawintheair.com' },
  },
]

export function getWork(slug: string) {
  return work.find((w) => w.slug === slug)
}
