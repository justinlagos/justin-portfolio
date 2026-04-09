import Image from 'next/image'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Eyebrow from '@/components/ui/Eyebrow'

const IMG = '/assets/projects/route-to-zero'

const PRINCIPLES = [
  {
    title: 'Bold',
    body: 'High contrast, strong geometry, unapologetic weight.',
  },
  {
    title: 'Directional',
    body: 'Every element points toward zero.',
  },
  {
    title: 'Grounded',
    body: 'Industrial confidence, not aspirational softness.',
  },
  {
    title: 'Global',
    body: 'The sphere signals worldwide ambition.',
  },
]

const PALETTE = [
  {
    name: 'Route Teal',
    hex: '#1A3636',
    rgb: '26, 54, 54',
    pantone: '5467 C',
    role: 'Primary',
    textOnDark: true,
  },
  {
    name: 'Mid Teal',
    hex: '#2D5454',
    rgb: '45, 84, 84',
    pantone: '5477 C',
    role: 'Secondary',
    textOnDark: true,
  },
  {
    name: 'Zero Green',
    hex: '#8DB600',
    rgb: '141, 182, 0',
    pantone: '377 C',
    role: 'Primary accent',
    textOnDark: true,
  },
  {
    name: 'Highlight Green',
    hex: '#A4CC00',
    rgb: '164, 204, 0',
    pantone: '382 C',
    role: 'Highlight',
    textOnDark: false,
  },
]

const NEUTRALS = [
  { name: 'Carbon Black', hex: '#000000', textOnDark: true },
  { name: 'Mid Grey', hex: '#808080', textOnDark: true },
  { name: 'Warm Cream', hex: '#F4F1EA', textOnDark: false },
  { name: 'Clean White', hex: '#FFFFFF', textOnDark: false },
]

const LOGO_EVOLUTION = [
  { src: `${IMG}/img02_2b4f266ae1.jpg`, step: '01', label: 'Sketch', caption: 'Initial concept. Road sign form, declining graph, globe.' },
  { src: `${IMG}/img03_55dedd27fb.jpg`, step: '02', label: 'Construction', caption: 'Grid, proportions, stroke weight, arrow angle.' },
  { src: `${IMG}/img04_b71d9e79a2.jpg`, step: '03', label: 'Final Mark', caption: 'Production-ready vector.' },
]

const LOGO_VERSIONS = [
  { src: `${IMG}/img06_3f5b0ebe66.jpg`, label: 'Full Colour — Dark Ground', note: 'Primary application' },
  { src: `${IMG}/img07_2ebae1afff.jpg`, label: 'Full Colour — Light Ground', note: 'Cream / white backgrounds' },
  { src: `${IMG}/img08_1aa3b4c927.jpg`, label: 'Greyscale', note: 'Print, embossing, co-branding' },
  { src: `${IMG}/img09_65071b0b41.jpg`, label: 'Icon Only', note: 'Avatars, favicons, compact applications' },
]

const DIGITAL = [
  { src: `${IMG}/img11_9f9fbbbc01.jpg`, label: 'Desktop' },
  { src: `${IMG}/img12_960650dee6.jpg`, label: 'Tablet' },
  { src: `${IMG}/img13_36eaed09ef.jpg`, label: 'Mobile' },
  { src: `${IMG}/img14_3712aef52d.gif`, label: 'In motion' },
]

const APPLICATIONS = [
  { src: `${IMG}/img15_2d1459d41a.jpg`, label: 'Business Cards' },
  { src: `${IMG}/img16_f62f6c4d51.jpg`, label: 'Annual Report' },
  { src: `${IMG}/img17_9ca63df8d4.jpg`, label: 'Letterhead' },
  { src: `${IMG}/img18_4f3be5af84.jpg`, label: 'Vehicle Livery' },
  { src: `${IMG}/img19_4687f1c77c.jpg`, label: 'Merchandise' },
  { src: `${IMG}/img20_d364df4ce3.jpg`, label: 'PPE / Hard Hat' },
  { src: `${IMG}/img21_0ad29d2d15.jpg`, label: 'Social Avatar' },
]

export default function RouteToZeroCaseStudy() {
  return (
    <>
      {/* Breadcrumb */}
      <Section className="pt-32 pb-0">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Work', href: '/work' },
              { label: 'Route to Zero', href: '/work/route-to-zero' },
              { label: 'Brand Identity and Website' },
            ]}
          />
        </Container>
      </Section>

      {/* Header */}
      <Section className="pt-8 pb-12">
        <Container>
          <Eyebrow className="mb-4">Case Study — Brand Identity</Eyebrow>
          <h1 className="font-serif text-[2.5rem] md:text-[4rem] text-ink leading-[1.05] mb-5 max-w-4xl">
            The journey to net zero starts with a single route.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mb-10">
            A complete brand identity, design system, and digital presence for a
            business-led membership organisation engaging Westminster and industry
            leaders on net zero policy.
          </p>

          <div className="flex flex-wrap gap-10 pt-8 border-t border-rule">
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-1">
                Year
              </p>
              <p className="text-ink">2024 — Present</p>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-1">
                Services
              </p>
              <p className="text-ink">Brand Identity, Design System, Web Design, Communications</p>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-muted mb-1">
                Client
              </p>
              <p className="text-ink">Route to Zero</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cover / Hero image on brand teal */}
      <Section className="pt-0 pb-24">
        <Container>
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#1A3636]">
            <Image
              src={`${IMG}/img01_7aa7926323.jpg`}
              alt="Route to Zero brand identity cover"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </Container>
      </Section>

      {/* Brand Story */}
      <Section className="py-24 bg-[#F4F1EA]">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <Eyebrow className="mb-3">Brand Story</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A3636] leading-tight">
                A visual shorthand for decarbonisation.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-5 text-[#1A3636]/90 text-lg leading-relaxed">
              <p>
                Route to Zero is a movement, a commitment, and a visual shorthand
                for the decarbonisation path the transport and energy sectors must
                travel. The identity captures momentum — a downward trajectory
                toward zero emissions, enclosed in the confidence of a road sign.
              </p>
              <p>
                The logo is rooted in two metaphors: the familiar shape of a road
                sign, communicating direction, purpose, and a clear destination —
                and a declining graph arrow traversing a globe, representing
                measurable progress toward a global goal.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Design Principles */}
      <Section className="py-24 bg-[#1A3636] text-white">
        <Container>
          <Eyebrow className="mb-10 !text-[#8DB600]">Design Principles</Eyebrow>
          <div className="grid md:grid-cols-4 gap-8">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t border-white/20 pt-6">
                <p className="text-[#8DB600] text-xs font-mono tracking-widest uppercase mb-3">
                  {String(PRINCIPLES.indexOf(p) + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-2xl mb-3">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Logo Evolution */}
      <Section className="py-24">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3">Logo Development</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-4">
              From sketch to symbol.
            </h2>
            <p className="text-ink-soft leading-relaxed">
              The mark was developed through iterative refinement — from hand-drawn
              marker explorations through construction geometry to the final
              polished vector.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LOGO_EVOLUTION.map((item) => (
              <figure key={item.step}>
                <div className="relative aspect-[4/5] bg-[#F4F1EA] overflow-hidden mb-4">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption>
                  <p className="text-xs font-mono tracking-widest uppercase text-ink-muted mb-1">
                    {item.step} — {item.label}
                  </p>
                  <p className="text-sm text-ink-soft">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Logo Construction */}
      <Section className="py-24 bg-[#F4F1EA]">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3">Logo Construction</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A3636] leading-tight mb-4">
              Geometric framework.
            </h2>
            <p className="text-[#1A3636]/80 leading-relaxed">
              Built on a precise grid ensuring alignment and balance. Uniform
              stroke weight and a solid downward arrow angle highlighting reduction.
            </p>
          </div>
          <div className="relative w-full aspect-[16/9] bg-white overflow-hidden">
            <Image
              src={`${IMG}/img05_dcd709fa54.png`}
              alt="Logo construction grid"
              fill
              className="object-contain p-8"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </Container>
      </Section>

      {/* Logo Versions */}
      <Section className="py-24">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3">Logo Versions</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-4">
              Primary mark and variants.
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Four sanctioned versions. Default to full-colour on dark teal as the
              primary application.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {LOGO_VERSIONS.map((v) => (
              <figure key={v.label}>
                <div className="relative aspect-[4/3] bg-[#F4F1EA] overflow-hidden mb-3">
                  <Image
                    src={v.src}
                    alt={v.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption>
                  <p className="text-sm font-medium text-ink">{v.label}</p>
                  <p className="text-xs text-ink-muted">{v.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Colour Palette */}
      <Section className="py-24 bg-[#F4F1EA]">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3">Colour Palette</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A3636] leading-tight mb-4">
              From carbon-heavy industry to clean energy.
            </h2>
            <p className="text-[#1A3636]/80 leading-relaxed">
              Deep teals anchor institutional credibility. Electric greens signal
              progress, action, and the destination itself.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {PALETTE.map((c) => (
              <div
                key={c.hex}
                className="p-6 aspect-[4/5] flex flex-col justify-between"
                style={{
                  backgroundColor: c.hex,
                  color: c.textOnDark ? '#FFFFFF' : '#1A3636',
                }}
              >
                <p className="text-[10px] font-mono tracking-widest uppercase opacity-70">
                  {c.role}
                </p>
                <div>
                  <p className="font-serif text-xl mb-3">{c.name}</p>
                  <p className="text-xs font-mono">{c.hex}</p>
                  <p className="text-xs font-mono opacity-70">RGB {c.rgb}</p>
                  <p className="text-xs font-mono opacity-70">Pantone {c.pantone}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NEUTRALS.map((c) => (
              <div
                key={c.hex}
                className="p-4 aspect-square flex flex-col justify-between border border-[#1A3636]/10"
                style={{
                  backgroundColor: c.hex,
                  color: c.textOnDark ? '#FFFFFF' : '#1A3636',
                }}
              >
                <p className="text-[10px] font-mono tracking-widest uppercase opacity-70">
                  Neutral
                </p>
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs font-mono opacity-70">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Typography */}
      <Section className="py-24">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3">Typography</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-4">
              Type system.
            </h2>
            <p className="text-ink-soft leading-relaxed">
              A serif display face for editorial presence paired with a geometric
              sans-serif workhorse. Monospaced data for precision where it counts.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-rule p-8 md:p-12">
              <p className="text-[11px] font-mono tracking-widest uppercase text-ink-muted mb-6">
                Display — Playfair Display
              </p>
              <p className="font-serif text-5xl md:text-7xl text-[#1A3636] leading-[1.05]">
                The route to net zero.
              </p>
              <p className="font-serif text-6xl md:text-8xl text-[#8DB600] mt-4">Aa</p>
            </div>

            <div className="border border-rule p-8 md:p-12 bg-[#F4F1EA]">
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#1A3636]/60 mb-6">
                Body — DM Sans
              </p>
              <p className="text-2xl md:text-4xl text-[#1A3636] leading-snug max-w-3xl">
                Sustainable transport infrastructure for a decarbonised economy.
              </p>
              <p className="text-7xl md:text-8xl text-[#1A3636] mt-4">Aa</p>
            </div>

            <div className="border border-rule p-8 md:p-12 bg-[#1A3636] text-white">
              <p className="text-[11px] font-mono tracking-widest uppercase text-[#8DB600] mb-6">
                Data — JetBrains Mono
              </p>
              <p className="font-mono text-2xl md:text-4xl text-white">
                CO₂ → 0.00 · 2030
              </p>
              <p className="font-mono text-6xl md:text-7xl text-[#8DB600] mt-4">Aa</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Digital Presence */}
      <Section className="py-24 bg-[#1A3636] text-white">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3 !text-[#8DB600]">Digital Presence</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
              Website and screens.
            </h2>
            <p className="text-white/70 leading-relaxed">
              The identity extends across digital touchpoints — desktop, tablet, and
              mobile — maintaining visual consistency at every breakpoint.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {DIGITAL.map((d, i) => (
              <figure key={d.label} className={i === 0 ? 'md:col-span-2' : ''}>
                <div
                  className={`relative overflow-hidden bg-black/40 ${
                    i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={d.src}
                    alt={d.label}
                    fill
                    className="object-cover"
                    sizes={i === 0 ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    unoptimized={d.src.endsWith('.gif')}
                  />
                </div>
                <figcaption className="text-xs font-mono tracking-widest uppercase text-white/50 mt-3">
                  {d.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Applications */}
      <Section className="py-24">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3">Applications</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-4">
              In the real world.
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Print, digital, signage, environmental, and industrial applications —
              the brand at work across every context it needs to hold.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {APPLICATIONS.map((a, i) => (
              <figure
                key={a.label}
                className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              >
                <div
                  className={`relative overflow-hidden bg-[#F4F1EA] ${
                    i === 0 ? 'aspect-[4/3]' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={a.src}
                    alt={a.label}
                    fill
                    className="object-cover"
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                  />
                </div>
                <figcaption className="text-xs font-mono tracking-widest uppercase text-ink-muted mt-3">
                  {a.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Outcome */}
      <Section className="py-24 bg-[#F4F1EA]">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <Eyebrow className="mb-3">Outcome</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A3636] leading-tight">
                A brand that holds at government level.
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-5 text-[#1A3636]/90 text-lg leading-relaxed">
              <p>
                The brand has been adopted across all organisational communications
                and is used in engagements with government ministers, industry
                leaders, and public-facing campaigns. Restraint and precision gave
                Route to Zero the institutional credibility it needed — while the
                declining arrow and globe keep the mission visible in every
                touchpoint.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1A3636]/20">
                <div>
                  <p className="font-serif text-4xl text-[#1A3636]">01</p>
                  <p className="text-xs font-mono tracking-widest uppercase text-[#1A3636]/60 mt-1">
                    Complete brand system
                  </p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-[#1A3636]">01</p>
                  <p className="text-xs font-mono tracking-widest uppercase text-[#1A3636]/60 mt-1">
                    Website launched
                  </p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-[#1A3636]">11</p>
                  <p className="text-xs font-mono tracking-widest uppercase text-[#1A3636]/60 mt-1">
                    Guideline sections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
