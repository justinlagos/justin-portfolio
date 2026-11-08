// Everything on the home page that is not a case study. Plain words, short sentences.

const p = (slug: string, file: string) => `/assets/projects/${slug}/${file}`

export const site = {
  name: 'Justin Ukaegbu',
  role: 'Design director',
  email: 'mrjustinukaegbu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/justinukaegbu',
  location: 'Kent, UK',
}

export const hero = {
  chip: 'Design director in Kent, UK',
  lineOne: 'I design brands and products.',
  lineTwo: 'Then I build them.',
  text: 'I’m Justin Ukaegbu. For twelve years I’ve designed for banks, energy companies, start-ups and a pan-African music festival. I lead the design, and when it needs to live on a screen, I build it too.',
  slides: [
    { src: p('tbtm', 'nyc-billboard-08.jpg'), caption: 'Take Back The Mic, on a screen in New York' },
    { src: p('kavlr', 'card-black.png'), caption: 'Kavlr business card' },
    { src: p('route-to-zero', 'img15_2d1459d41a.jpg'), caption: 'Route to Zero business cards' },
    { src: p('voidcanvas', 'effects-halftone.jpg'), caption: 'Voidcanvas, a design tool I built' },
    { src: p('access-bank', 'pdf-brand-guide-cover.png'), caption: 'Access Bank brand guide' },
  ],
}

/** The rotating line: "I design ___ people understand at a glance." */
export const statement = {
  lead: 'Making it look good is the easy part.',
  before: 'I design',
  after: 'people understand at a glance.',
  words: [
    { word: 'brands', src: p('route-to-zero', 'logo-branding.png') },
    { word: 'campaigns', src: p('access-bank', 'photo-02.jpg') },
    { word: 'apps', src: p('hashit', 'app.png') },
    { word: 'reports', src: p('syntech', 'brochure-spread.jpg') },
    { word: 'games', src: p('draw-in-the-air', 'wave-to-start.jpg') },
  ],
  facts: [
    { label: 'Experience', value: '12 years, from WPP in Lagos to in-house in Kent' },
    { label: 'Based in', value: 'Kent, UK' },
    { label: 'Works with', value: 'Teams in the UK and Nigeria' },
  ],
}

export const clients = [
  'Access Bank',
  'Take Back The Mic',
  'Syntech Biofuel',
  'Route to Zero',
  'Sparkle',
  'Tryba Finance',
  'HashIT',
  'Polo Luxury',
  'Solina Group',
  'DisruptDNA',
  'ionec',
  'Learn Africa',
  'Cirquu',
  'AMP Global Tech',
  'Black Diamond Hotel',
  '141 Worldwide (WPP)',
]

/** What I do: shown as tabs. */
export const services: { name: string; text: string; example: string; slug: string; src: string }[] = [
  {
    name: 'Brand identity',
    text: 'How a company looks and sounds: its logo, colours, fonts, pictures and tone of voice, written down so anyone on the team can use them.',
    example: 'Route to Zero',
    slug: 'route-to-zero',
    src: p('route-to-zero', 'logo-branding.png'),
  },
  {
    name: 'Campaigns',
    text: 'One idea told across billboards, social posts, emails and events, so people recognise it wherever they meet it.',
    example: 'Access Bank',
    slug: 'access-bank',
    src: p('access-bank', 'photo-03.jpg'),
  },
  {
    name: 'Websites and apps',
    text: 'Screens people can find their way around without thinking, from a waitlist page to a full money app.',
    example: 'HashIT',
    slug: 'hashit',
    src: p('hashit', 'pdf-app-ui.png'),
  },
  {
    name: 'Reports and presentations',
    text: 'Turning technical ideas and numbers into documents a busy reader can follow, for boards, investors and government.',
    example: 'Syntech Biofuel',
    slug: 'syntech-biofuel',
    src: p('syntech', 'brochure-cover.jpg'),
  },
  {
    name: 'Learning products',
    text: 'Games and tools that teach by doing, built and tested with real children and teachers.',
    example: 'Draw in the Air',
    slug: 'draw-in-the-air',
    src: p('draw-in-the-air', 'wave-to-start.jpg'),
  },
  {
    name: 'Design tools',
    text: 'Software that takes the slow, repetitive parts out of design work, so designers can spend their time on ideas.',
    example: 'Voidcanvas',
    slug: 'voidcanvas',
    src: p('voidcanvas', 'effects-dither.jpg'),
  },
]

/** How I work: a real sequence, so it is numbered. */
export const steps: { title: string; text: string }[] = [
  {
    title: 'Listen first',
    text: 'I find out who the work is for and what needs to change. Most problems get clearer after a few honest conversations.',
  },
  {
    title: 'Find one clear idea',
    text: 'I look for the one idea the work can stand on, then turn it into colours, type, words and simple rules that hold together.',
  },
  {
    title: 'Build it and hand it over',
    text: 'I make the real things, from signs and reports to apps, and leave templates and a guide so the team can carry on without me.',
  },
]

/** Smaller jobs, shown as a list. */
export const recent: { name: string; via?: string; what: string }[] = [
  { name: 'Cirquu', what: 'A stand, merchandise and motion graphics for TechCabal’s Moonshot 2026 conference.' },
  { name: 'ionec', via: 'DisruptDNA', what: 'A 28-page brand guide, plus marks for its brands Insight360, I Am Loyal and Get A Bar.' },
  { name: 'Learn Africa', via: 'DisruptDNA', what: 'A 19-slide proposal to Nigeria’s Federal Ministry of Education.' },
  { name: 'Solina Group', what: 'A 15th anniversary identity, and event design for the REACH Annual Meeting.' },
  { name: 'Black Diamond Hotel', what: 'The Beauty of Freedom, an Independence Day campaign for social, web and email.' },
  { name: 'JaneMichael Ekanem Foundation', what: 'A brand book, documents and weekly social posts for a girls’ education scholarship in Lagos.' },
  { name: 'AMP Global Tech', what: 'Investor presentations for a $5.6 million seed round, and short animations for social.' },
  { name: 'The Song Maiden', what: 'Art director on an animated short film. Best Animation at AFRIFF, nominated at the AMVCA 2023 and chosen for development at MIFA Annecy 2023.' },
]

/** My own products that are not case studies yet. */
export const building: { name: string; what: string; status: string }[] = [
  { name: 'Election Day: Naija', what: 'A 3D game in the browser about a fictional election day in Lagos and Abuja.', status: 'In development' },
  { name: 'A STEM story game', what: 'Young children pick a character and travel through five worlds of science, technology, engineering and maths.', status: 'In development' },
  { name: 'TollPilot', what: 'Tells UK drivers what tolls, ULEZ and congestion charges a journey will cost before they set off.', status: 'Launching' },
  { name: 'Pamiit', what: 'Event ticketing that organisers in the UK and Nigeria can set up themselves.', status: 'Prototype' },
]

export const teaching: { name: string; what: string; href?: string }[] = [
  {
    name: 'The Build Session',
    what: 'A live three-hour workshop I run for small groups. Each person brings one idea, plans it with ChatGPT and builds it with Claude on their own laptop.',
    href: 'https://workshop.motionplaylabs.com',
  },
  { name: 'University of Hertfordshire', what: 'Invited speaker on the MA Graphic Design course.' },
  { name: 'Design Research Society', what: 'Member. My research interest is how young children learn through movement.' },
]

export const experience: { years: string; org: string; role: string }[] = [
  { years: '2025–now', org: 'DisruptDNA', role: 'Design director, contract' },
  { years: '2022–now', org: 'Syntech Biofuel and Route to Zero', role: 'Only designer, reporting to the CEO' },
  { years: '2021–now', org: 'Independent, now MotionPlay Labs', role: 'Brand, campaign and product design' },
  { years: '2023–24', org: 'HashIT', role: 'Head of product design' },
  { years: '2021–24', org: 'Take Back The Mic', role: 'Brand and UI design lead' },
  { years: '2021–24', org: 'Tryba Finance and Kavlr', role: 'Lead brand and product designer' },
  { years: '2021–24', org: 'AMP Global Tech', role: 'Graphic designer, contract' },
  { years: '2014–20', org: '141 Worldwide (WPP), Lagos', role: 'Designer' },
]

export const education: { years: string; what: string; where: string }[] = [
  { years: '2022', what: 'MA Design in Graphic Design', where: 'University of Hertfordshire' },
  { years: '2007', what: 'BSc Computer Science and Education', where: 'Enugu State University of Science and Technology' },
]

export const recognition: string[] = [
  'Webby Award nomination, 2023, for the TBTM Interactive Festival',
  'Member, Chartered Society of Designers',
  'Member, Design Research Society',
  'Certificate of Appreciation, United Nations Volunteers, for an education project (SDG 4)',
]

export const faq: { q: string; a: string }[] = [
  {
    q: 'What kind of designer are you?',
    a: 'I design how a company looks and speaks, then the things built from it: campaigns, websites, apps, reports and signs. I lead that work as a design director, and I still make a lot of it myself.',
  },
  {
    q: 'Do you only design, or do you build too?',
    a: 'Both. My first degree was in Computer Science and Education, so I can take an idea from a sketch to something that works. Draw in the Air and Voidcanvas are products I designed and built.',
  },
  {
    q: 'Who have you worked with?',
    a: 'Banks, money apps, a renewable fuel company, a net zero policy group, a pan-African music festival, a luxury store, a foundation and an agency network. Most of my work is with teams in the UK and Nigeria.',
  },
  {
    q: 'Where are you based?',
    a: 'Kent, in the UK. I’m in London regularly, and I work remotely with teams in Nigeria and elsewhere.',
  },
  {
    q: 'Do you teach?',
    a: 'Yes. I run The Build Session, a small hands-on workshop where people build their own idea with AI tools, and I’ve spoken to MA Graphic Design students at the University of Hertfordshire.',
  },
  {
    q: 'How do I get in touch?',
    a: 'Email is quickest. Tell me a little about the role or the project and I’ll reply.',
  },
]
