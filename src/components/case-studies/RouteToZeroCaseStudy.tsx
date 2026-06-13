import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ScrollReveal from '@/components/ui/ScrollReveal'

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
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
          >
            &larr; All work
          </Link>

          <div className="max-w-4xl">
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
              Case Study — Brand Identity
            </p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight mb-5">
              The journey to net zero starts with a single route<span className="text-accent">.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-10">
              A complete brand identity, design system, and digital presence for a
              business-led membership organisation engaging Westminster and industry
              leaders on net zero policy.
            </p>

            <div className="flex flex-wrap gap-10 pt-8 border-t border-border">
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-1">
                  Year
                </p>
                <p className="text-text text-sm">2024 — Present</p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-1">
                  Services
                </p>
                <p className="text-text text-sm">Brand Identity, Design System, Web Design, Communications</p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-1">
                  Client
                </p>
                <p className="text-text text-sm">Route to Zero</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cover / Hero image */}
      <section className="pb-24">
        <Container wide>
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-[#8DB600]">
            <Image
              src={`${IMG}/img01_7aa7926323.jpg`}
              alt="Route to Zero brand identity cover"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[34%] max-w-[420px] aspect-square">
                <Image
                  src={`${IMG}/logo-mark.svg`}
                  alt="Route to Zero logo"
                  fill
                  className="object-contain brightness-0 invert drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                  sizes="(max-width: 1280px) 34vw, 420px"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-[#F4F1EA]">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <ScrollReveal>
                <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                  Brand Story
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A3636] leading-tight tracking-tight">
                  A visual shorthand for decarbonisation.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-5 text-[#1A3636]/90 text-lg leading-relaxed">
              <ScrollReveal>
                <p>
                  Route to Zero is a movement, a commitment, and a visual shorthand
                  for the decarbonisation path the transport and energy sectors must
                  travel. The identity captures momentum — a downward trajectory
                  toward zero emissions, enclosed in the confidence of a road sign.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.06}>
                <p>
                  The logo is rooted in two metaphors: the familiar shape of a road
                  sign, communicating direction, purpose, and a clear destination —
                  and a declining graph arrow traversing a globe, representing
                  measurable progress toward a global goal.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Design Principles */}
      <section className="py-24 bg-[#1A3636] text-white">
        <Container>
          <ScrollReveal>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#8DB600] mb-10">
              Design Principles
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8">
            {PRINCIPLES.map((p, idx) => (
              <ScrollReveal key={p.title} delay={idx * 0.06}>
                <div className="border-t border-white/20 pt-6">
                  <p className="text-[#8DB600] text-xs font-mono tracking-widest uppercase mb-3">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-2xl font-bold mb-3">{p.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{p.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Logo Evolution */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Logo Development
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text leading-tight tracking-tight mb-4">
                From sketch to symbol.
              </h2>
              <p className="text-text-secondary leading-relaxed">
                The mark was developed through iterative refinement — from hand-drawn
                marker explorations through construction geometry to the final
                polished vector.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {LOGO_EVOLUTION.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.06}>
                <figure>
                  <div className="relative aspect-[4/5] bg-bg-elevated overflow-hidden rounded-sm mb-4">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption>
                    <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-1">
                      {item.step} — {item.label}
                    </p>
                    <p className="text-sm text-text-secondary">{item.caption}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Logo Construction */}
      <section className="py-24 bg-[#F4F1EA]">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Logo Construction
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A3636] leading-tight tracking-tight mb-4">
                Geometric framework.
              </h2>
              <p className="text-[#1A3636]/80 leading-relaxed">
                Built on a precise grid ensuring alignment and balance. Uniform
                stroke weight and a solid downward arrow angle highlighting reduction.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="relative w-full aspect-[16/9] bg-white overflow-hidden rounded-sm">
              <Image
                src={`${IMG}/img05_dcd709fa54.png`}
                alt="Logo construction grid"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Logo Versions */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Logo Versions
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text leading-tight tracking-tight mb-4">
                Primary mark and variants.
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Four sanctioned versions. Default to full-colour on dark teal as the
                primary application.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {LOGO_VERSIONS.map((v, i) => (
              <ScrollReveal key={v.label} delay={i * 0.05}>
                <figure>
                  <div className="relative aspect-[4/3] bg-bg-elevated overflow-hidden rounded-sm mb-3">
                    <Image
                      src={v.src}
                      alt={v.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption>
                    <p className="text-sm font-medium text-text">{v.label}</p>
                    <p className="text-xs text-text-muted">{v.note}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Colour Palette */}
      <section className="py-24 bg-[#F4F1EA]">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Colour Palette
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A3636] leading-tight tracking-tight mb-4">
                From carbon-heavy industry to clean energy.
              </h2>
              <p className="text-[#1A3636]/80 leading-relaxed">
                Deep teals anchor institutional credibility. Electric greens signal
                progress, action, and the destination itself.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {PALETTE.map((c, i) => (
              <ScrollReveal key={c.hex} delay={i * 0.04}>
                <div
                  className="p-6 aspect-[4/5] flex flex-col justify-between rounded-sm"
                  style={{
                    backgroundColor: c.hex,
                    color: c.textOnDark ? '#FFFFFF' : '#1A3636',
                  }}
                >
                  <p className="text-[10px] font-mono tracking-widest uppercase opacity-70">
                    {c.role}
                  </p>
                  <div>
                    <p className="font-display text-xl font-semibold mb-3">{c.name}</p>
                    <p className="text-xs font-mono">{c.hex}</p>
                    <p className="text-xs font-mono opacity-70">RGB {c.rgb}</p>
                    <p className="text-xs font-mono opacity-70">Pantone {c.pantone}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NEUTRALS.map((c, i) => (
              <ScrollReveal key={c.hex} delay={i * 0.04}>
                <div
                  className="p-4 aspect-square flex flex-col justify-between border border-[#1A3636]/10 rounded-sm"
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
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Typography */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Typography
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text leading-tight tracking-tight mb-4">
                Type system.
              </h2>
              <p className="text-text-secondary leading-relaxed">
                A serif display face for editorial presence paired with a geometric
                sans-serif workhorse. Monospaced data for precision where it counts.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal>
              <div className="border border-border p-8 md:p-12 rounded-sm">
                <p className="text-[11px] font-mono tracking-widest uppercase text-text-muted mb-6">
                  Display — Playfair Display
                </p>
                <p className="font-serif text-5xl md:text-7xl text-[#1A3636] leading-[1.05]">
                  The route to net zero.
                </p>
                <p className="font-serif text-6xl md:text-8xl text-[#8DB600] mt-4">Aa</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <div className="border border-border p-8 md:p-12 bg-[#F4F1EA] rounded-sm">
                <p className="text-[11px] font-mono tracking-widest uppercase text-[#1A3636]/60 mb-6">
                  Body — DM Sans
                </p>
                <p className="text-2xl md:text-4xl text-[#1A3636] leading-snug max-w-3xl">
                  Sustainable transport infrastructure for a decarbonised economy.
                </p>
                <p className="text-7xl md:text-8xl text-[#1A3636] mt-4">Aa</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="border border-border p-8 md:p-12 bg-[#1A3636] text-white rounded-sm">
                <p className="text-[11px] font-mono tracking-widest uppercase text-[#8DB600] mb-6">
                  Data — JetBrains Mono
                </p>
                <p className="font-mono text-2xl md:text-4xl text-white">
                  CO₂ → 0.00 · 2030
                </p>
                <p className="font-mono text-6xl md:text-7xl text-[#8DB600] mt-4">Aa</p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Digital Presence */}
      <section className="py-24 bg-[#1A3636] text-white">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#8DB600] mb-3">
                Digital Presence
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
                Website and screens.
              </h2>
              <p className="text-white/70 leading-relaxed">
                The identity extends across digital touchpoints — desktop, tablet, and
                mobile — maintaining visual consistency at every breakpoint.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {DIGITAL.map((d, i) => (
              <ScrollReveal key={d.label} delay={i * 0.05}>
                <figure className={i === 0 ? 'md:col-span-2' : ''}>
                  <div
                    className={`relative overflow-hidden bg-black/40 rounded-sm ${
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
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Applications
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text leading-tight tracking-tight mb-4">
                In the real world.
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Print, digital, signage, environmental, and industrial applications —
                the brand at work across every context it needs to hold.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {APPLICATIONS.map((a, i) => (
              <ScrollReveal key={a.label} delay={i * 0.04}>
                <figure className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
                  <div
                    className={`relative overflow-hidden bg-bg-elevated rounded-sm ${
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
                  <figcaption className="text-xs font-mono tracking-widest uppercase text-text-muted mt-3">
                    {a.label}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Outcome */}
      <section className="py-24 bg-[#F4F1EA]">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <ScrollReveal>
                <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                  Outcome
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A3636] leading-tight tracking-tight">
                  A brand that holds at government level.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7 md:col-start-6 space-y-5 text-[#1A3636]/90 text-lg leading-relaxed">
              <ScrollReveal>
                <p>
                  The brand has been adopted across all organisational communications
                  and is used in engagements with government ministers, industry
                  leaders, and public-facing campaigns. Restraint and precision gave
                  Route to Zero the institutional credibility it needed — while the
                  declining arrow and globe keep the mission visible in every
                  touchpoint.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1A3636]/20">
                  <div>
                    <p className="font-display text-4xl font-bold text-[#1A3636]">01</p>
                    <p className="text-xs font-mono tracking-widest uppercase text-[#1A3636]/60 mt-1">
                      Complete brand system
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-[#1A3636]">01</p>
                    <p className="text-xs font-mono tracking-widest uppercase text-[#1A3636]/60 mt-1">
                      Website launched
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-[#1A3636]">11</p>
                    <p className="text-xs font-mono tracking-widest uppercase text-[#1A3636]/60 mt-1">
                      Guideline sections
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Back link */}
      <section className="py-16">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            &larr; Back to all work
          </Link>
        </Container>
      </section>
    </>
  )
}
