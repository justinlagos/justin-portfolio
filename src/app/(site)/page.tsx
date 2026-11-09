import Image from 'next/image'
import Link from 'next/link'
import HeroShow from '@/components/site/HeroShow'
import Services from '@/components/site/Services'
import SketchPad from '@/components/site/SketchPad'
import Statement from '@/components/site/Statement'
import { work } from '@/content/work'
import {
  building,
  clients,
  education,
  experience,
  faq,
  hero,
  recent,
  recognition,
  services,
  statement,
  steps,
  teaching,
} from '@/content/site'
import { imgSize } from '@/lib/img'

const words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']

export default function Home() {
  const portrait = '/assets/about/justin-portrait.jpg'
  const count = words[work.length] ?? String(work.length)

  return (
    <>
      {/* Hero: a rounded panel with the work running behind the words. */}
      <section className="hero-wrap" aria-labelledby="hero-title">
        <div className="hero">
          <HeroShow slides={hero.slides.map((s) => ({ ...s, ...imgSize(s.src) }))} />
          <div className="hero__content">
            <p className="chip chip--glass">{hero.chip}</p>
            <div className="hero__split">
              <h1 id="hero-title" className="hero__title">
                <span className="hero__one">{hero.lineOne}</span> <span className="hero__two">{hero.lineTwo}</span>
              </h1>
              <div className="hero__side">
                <p className="hero__text">{hero.text}</p>
                <div className="hero__actions">
                  <Link href="/#work" className="pill pill--light-solid">
                    See the work
                  </Link>
                  <Link href="/#try" className="pill pill--light">
                    Try the drawing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who I have worked with. */}
      <section className="clients" aria-labelledby="clients-title">
        <h2 id="clients-title" className="clients__title">
          Teams I’ve worked with.
        </h2>
        <div className="marquee">
          <ul className="marquee__track">
            {[...clients, ...clients].map((c, n) => (
              <li key={`${c}-${n}`} aria-hidden={n >= clients.length ? 'true' : undefined}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The one-line idea of what I do. */}
      <section className="wrap section" aria-label="What I do, in one line">
        <Statement
          lead={statement.lead}
          before={statement.before}
          after={statement.after}
          words={statement.words.map((w) => ({ ...w, ...imgSize(w.src) }))}
        />
        <dl className="facts-row">
          {statement.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Work. */}
      <section id="work" className="wrap section" aria-labelledby="work-title">
        <div className="section__head">
          <h2 id="work-title" className="h2">
            Selected work.
          </h2>
          <p className="section__intro">
            {count} projects I led from the first idea to the finished work. Each one shows the thinking as well as the
            result.
          </p>
        </div>
        <ul className="tiles">
          {work.map((w, n) => (
            <li key={w.slug} className={n === 0 ? 'tile tile--feature' : 'tile'}>
              <Link href={`/work/${w.slug}`} className="tile__link">
                <div className="tile__img">
                  <Image
                    src={w.preview}
                    alt=""
                    {...imgSize(w.preview)}
                    sizes={n === 0 ? '(min-width: 1300px) 1240px, 100vw' : '(min-width: 900px) 620px, 100vw'}
                    priority={n < 1}
                    style={w.previewPosition ? { objectPosition: w.previewPosition } : undefined}
                  />
                  <span className="chip chip--glass tile__kind">{w.kind}</span>
                </div>
                <div className="tile__text">
                  <h3 className="tile__title">{w.title}</h3>
                  <span className="tile__years">{w.years}</span>
                </div>
                <p className="tile__line">{w.line}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Try the idea behind Draw in the Air. */}
      <section id="try" className="wrap section" aria-labelledby="try-title">
        <div className="split">
          <div className="card split__text">
            <h2 id="try-title" className="card__title card__title--big">
              Draw in the air.
            </h2>
            <p className="card__text">
              Draw in the Air is a product I built for children aged 3 to 7. They learn letters and shapes by moving,
              and an ordinary laptop camera follows their hand.
            </p>
            <p className="card__text">
              You can try the idea here. Move your cursor over the panel, or turn on your camera and pinch your thumb
              and finger together to draw.
            </p>
            <p className="card__note">The camera picture stays on your device. Nothing is recorded or sent.</p>
            <Link href="/work/draw-in-the-air" className="pill pill--ink split__cta">
              Read how I made it
            </Link>
          </div>
          <SketchPad />
        </div>
      </section>

      {/* What I do. */}
      <section className="wrap section" aria-labelledby="services-title">
        <div className="section__head">
          <h2 id="services-title" className="h2">
            What I do.
          </h2>
          <p className="section__intro">Six kinds of work, often in the same project.</p>
        </div>
        <Services items={services.map((s) => ({ ...s, ...imgSize(s.src) }))} />
      </section>

      {/* How I work: a real sequence, so the steps are numbered. */}
      <section id="how" className="wrap section" aria-labelledby="how-title">
        <div className="section__head">
          <h2 id="how-title" className="h2">
            How I work.
          </h2>
          <p className="section__intro">The same three steps, whether it is a logo or an app.</p>
        </div>
        <ol className="steps">
          {steps.map((s, n) => (
            <li key={s.title} className="card step">
              <span className="step__n">{n + 1}</span>
              <h3 className="card__title">{s.title}</h3>
              <p className="card__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* More work and things in progress. */}
      <section className="wrap section" aria-label="More work and current projects">
        <div className="two">
          <div className="card">
            <h2 className="card__title">More work.</h2>
            <ul className="rows">
              {recent.map((r) => (
                <li key={r.name}>
                  <span className="rows__name">
                    {r.name}
                    {r.via && <span className="rows__via"> with {r.via}</span>}
                  </span>
                  <span className="rows__text">{r.what}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="stack">
            <div className="card">
              <h2 className="card__title">Building now.</h2>
              <ul className="rows">
                {building.map((b) => (
                  <li key={b.name}>
                    <span className="rows__name">
                      {b.name} <span className="badge">{b.status}</span>
                    </span>
                    <span className="rows__text">{b.what}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card" id="teaching">
              <h2 className="card__title">Teaching.</h2>
              <p className="card__text">
                My first degree trained me to teach computing. I still teach, the same way I learn: by building
                something real.
              </p>
              <ul className="rows">
                {teaching.map((t) => (
                  <li key={t.name}>
                    <span className="rows__name">
                      {t.href ? (
                        <a href={t.href} className="link">
                          {t.name}
                        </a>
                      ) : (
                        t.name
                      )}
                    </span>
                    <span className="rows__text">{t.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About. */}
      <section id="about" className="wrap section" aria-labelledby="about-title">
        <div className="split split--about">
          <div className="portrait">
            <Image src={portrait} alt="Justin Ukaegbu" {...imgSize(portrait)} sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <div className="card">
            <h2 id="about-title" className="card__title card__title--big">
              About me.
            </h2>
            <p className="card__text card__text--lead">
              I started in 2009 as an assistant art director at 141 Worldwide, WPP’s agency in Lagos. I then spent
              four years designing for Nigerian banks, through Fidelity’s rebrand and the merger of Diamond and Access,
              before leading design for clients in Nigeria, the UK, the UAE and the US. Since 2022 I’ve been the
              designer at Syntech Biofuel and Route to Zero, working with the CEO.
            </p>
            <p className="card__text">
              I studied Computer Science and Education first, then took an MA in Graphic Design with Distinction, so I
              build as well as design. I run my own products through MotionPlay Labs, my studio in the UK and Nigeria.
            </p>
            <h3 className="mini">Experience</h3>
            <ul className="dated">
              {experience.map((e) => (
                <li key={e.org + e.years}>
                  <span className="dated__years">{e.years}</span>
                  <span className="dated__org">{e.org}</span>
                  <span className="dated__role">{e.role}</span>
                </li>
              ))}
            </ul>
            <h3 className="mini">Education</h3>
            <ul className="dated">
              {education.map((e) => (
                <li key={e.what}>
                  <span className="dated__years">{e.years}</span>
                  <span className="dated__org">{e.what}</span>
                  <span className="dated__role">{e.where}</span>
                </li>
              ))}
            </ul>
            <h3 className="mini">Recognition and memberships</h3>
            <ul className="plain">
              {recognition.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Questions. */}
      <section id="faq" className="wrap section" aria-labelledby="faq-title">
        <div className="section__head">
          <h2 id="faq-title" className="h2">
            Questions people ask me.
          </h2>
        </div>
        <div className="faq">
          {faq.map((f, n) => (
            <details key={f.q} className="faq__item" open={n === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
