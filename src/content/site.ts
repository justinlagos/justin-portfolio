// Everything on the home page that is not a case study.

export const site = {
  name: 'Justin Ukaegbu',
  role: 'Design director',
  email: 'mrjustinukaegbu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/justinukaegbu',
  location: 'Kent, UK',
  headline: 'Design director who builds.',
  lede:
    'I’m Justin Ukaegbu. For twelve years I’ve designed brand systems, campaigns and digital products for banks, energy companies, start-ups and a pan-African music festival. I also build my own: learning tools, design software and games.',
}

/** Smaller recent jobs, shown as a list on the home page. */
export const recent: { name: string; via?: string; what: string }[] = [
  {
    name: 'Cirquu',
    what: 'Booth, campaign merchandise and motion for TechCabal’s Moonshot 2026 conference.',
  },
  {
    name: 'ionec',
    via: 'DisruptDNA',
    what: '28-page brand guidelines, plus marks for its portfolio brands Insight360, I Am Loyal and Get A Bar.',
  },
  {
    name: 'Learn Africa',
    via: 'DisruptDNA',
    what: 'A 19-slide proposal to Nigeria’s Federal Ministry of Education.',
  },
  {
    name: 'Solina Group',
    what: 'The Solina @15 anniversary identity and event branding for the REACH Annual Meeting.',
  },
  {
    name: 'Black Diamond Hotel',
    what: 'The Beauty of Freedom, an Independence Day campaign across social, web and email.',
  },
  {
    name: 'JaneMichael Ekanem Foundation',
    what: 'Brand book, document suite and weekly social for a girls’ education scholarship in Lagos.',
  },
  {
    name: 'AMP Global Tech',
    what: 'Investor presentations for a $5.6 million seed round, and motion for social.',
  },
  {
    name: 'The Song Maiden',
    what: 'Art director on an animated short. Best Animation at AFRIFF, nominated at the AMVCA 2023 and selected for development at MIFA Annecy 2023.',
  },
]

/** Own products that are not yet case studies. */
export const building: { name: string; what: string; status: string; href?: string }[] = [
  {
    name: 'Election Day: Naija',
    what: 'A browser-based 3D simulation of a fictional Nigerian election day in Lagos and Abuja.',
    status: 'In development',
  },
  {
    name: 'A STEM story game',
    what: 'Young children choose a character and travel through five worlds of science, technology, engineering and maths.',
    status: 'In development',
  },
  {
    name: 'TollPilot',
    what: 'Tells UK drivers what tolls, ULEZ and congestion charges a journey will cost before they set off.',
    status: 'Launching',
  },
  {
    name: 'Pamiit',
    what: 'Self-serve event ticketing for organisers in the UK and Nigeria.',
    status: 'Prototype',
  },
]

export const teaching: { name: string; what: string; href?: string }[] = [
  {
    name: 'The Build Session',
    what: 'A live three-hour workshop I run for small groups. Each person brings one idea, plans it with ChatGPT and builds it with Claude on their own laptop.',
    href: 'https://workshop.motionplaylabs.com',
  },
  {
    name: 'University of Hertfordshire',
    what: 'Invited practitioner speaker on the MA Graphic Design programme.',
  },
  {
    name: 'Design Research Society',
    what: 'Member. My current research interest is movement-based learning in the early years.',
  },
]

export const experience: { years: string; org: string; role: string }[] = [
  { years: '2025–now', org: 'DisruptDNA', role: 'Design director, contract' },
  { years: '2022–now', org: 'Syntech Biofuel and Route to Zero', role: 'Sole designer, reporting to the CEO' },
  { years: '2021–now', org: 'Independent practice, now MotionPlay Labs', role: 'Brand, campaign and product design' },
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
  'Webby Award nomination, 2023, for the TBTM Interactive Festival platform',
  'Member, Chartered Society of Designers',
  'Member, Design Research Society',
  'Certificate of Appreciation, United Nations Volunteers, for an SDG 4 education initiative',
]
