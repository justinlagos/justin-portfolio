import Image from 'next/image'
import SketchHero from '@/components/site/SketchHero'
import WorkIndex, { type IndexItem } from '@/components/site/WorkIndex'
import { work } from '@/content/work'
import { building, education, experience, recent, recognition, site, teaching } from '@/content/site'
import { imgSize } from '@/lib/img'

export default function Home() {
  const items: IndexItem[] = work.map((w) => ({
    slug: w.slug,
    title: w.title,
    line: w.line,
    kind: w.kind,
    years: w.years,
    preview: { src: w.preview, alt: '', ...imgSize(w.preview) },
  }))
  const portrait = '/assets/about/justin-portrait.jpg'

  return (
    <>
      <SketchHero>
        <h1 className="hero__title">{site.headline}</h1>
        <p className="hero__lede">{site.lede}</p>
      </SketchHero>

      <section id="work" className="block" aria-labelledby="work-title">
        <h2 id="work-title" className="section-title">
          Work
        </h2>
        <WorkIndex items={items} />
      </section>

      <section className="block block--split" aria-labelledby="recent-title">
        <h2 id="recent-title" className="section-title">
          More work
        </h2>
        <ul className="list">
          {recent.map((r) => (
            <li key={r.name} className="list__item">
              <span className="list__name">
                {r.name}
                {r.via && <span className="list__via"> with {r.via}</span>}
              </span>
              <span className="list__what">{r.what}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="block block--split" aria-labelledby="building-title">
        <h2 id="building-title" className="section-title">
          Building now
        </h2>
        <ul className="list">
          {building.map((b) => (
            <li key={b.name} className="list__item list__item--status">
              <span className="list__name">{b.name}</span>
              <span className="list__what">{b.what}</span>
              <span className="list__status">{b.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="teaching" className="block block--split" aria-labelledby="teaching-title">
        <h2 id="teaching-title" className="section-title">
          Teaching
        </h2>
        <div>
          <p className="prose prose--lead">
            My first degree trained me to teach computing, and teaching has stayed part of the work. I teach the way I
            learn: by building something real.
          </p>
          <ul className="list">
            {teaching.map((t) => (
              <li key={t.name} className="list__item">
                <span className="list__name">
                  {t.href ? (
                    <a href={t.href} className="link">
                      {t.name}
                    </a>
                  ) : (
                    t.name
                  )}
                </span>
                <span className="list__what">{t.what}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="block about" aria-labelledby="about-title">
        <h2 id="about-title" className="section-title">
          About
        </h2>
        <div className="about__grid">
          <div className="about__portrait">
            <Image src={portrait} alt="Justin Ukaegbu" {...imgSize(portrait)} sizes="(min-width: 900px) 30vw, 100vw" />
          </div>
          <div className="about__text">
            <p className="prose prose--lead">
              I started in 2014 as a designer at 141 Worldwide, WPP’s agency in Lagos. Since then I’ve led brand,
              campaign and product design for clients in Nigeria, the UK, the UAE and the US. Since 2022 I’ve been the
              sole designer at Syntech Biofuel and Route to Zero, reporting to the CEO.
            </p>
            <p className="prose">
              My first degree was in Computer Science and Education and my MA is in graphic design, so I build as well
              as design. Draw in the Air, Voidcanvas and Art Director Studio are products I designed and built. I run
              them through MotionPlay Labs, my studio in the UK and Nigeria.
            </p>

            <h3 className="sub-title">Experience</h3>
            <ul className="dated">
              {experience.map((e) => (
                <li key={e.org + e.years} className="dated__item">
                  <span className="dated__years">{e.years}</span>
                  <span className="dated__main">{e.org}</span>
                  <span className="dated__detail">{e.role}</span>
                </li>
              ))}
            </ul>

            <h3 className="sub-title">Education</h3>
            <ul className="dated">
              {education.map((e) => (
                <li key={e.what} className="dated__item">
                  <span className="dated__years">{e.years}</span>
                  <span className="dated__main">{e.what}</span>
                  <span className="dated__detail">{e.where}</span>
                </li>
              ))}
            </ul>

            <h3 className="sub-title">Recognition and memberships</h3>
            <ul className="plain">
              {recognition.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
