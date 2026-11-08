import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CaseStory from '@/components/site/CaseStory'
import { getWork, work } from '@/content/work'
import { imgSize } from '@/lib/img'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const w = getWork(slug)
  if (!w) return {}
  return {
    title: w.title,
    description: w.summary,
    openGraph: { title: `${w.title} | Justin Ukaegbu`, description: w.summary, images: [w.cover.src] },
  }
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const w = getWork(slug)
  if (!w) notFound()
  const index = work.findIndex((x) => x.slug === slug)
  const next = work[(index + 1) % work.length]

  const cover = { ...w.cover, ...imgSize(w.cover.src), span: 'wide' as const }
  const chapters = w.chapters.map((c) => ({
    ...c,
    images: c.images.map((im) => ({ ...im, ...imgSize(im.src), span: im.span ?? ('half' as const) })),
  }))

  return (
    <article className="wrap case">
      <header className="case__head">
        <Link href="/#work" className="pill case__back">
          All work
        </Link>
        <div className="case__intro">
          <div>
            <p className="chip">
              {w.kind}, {w.years}
            </p>
            <h1 className="case__title">{w.title}</h1>
          </div>
          <p className="case__summary">{w.summary}</p>
        </div>
        <dl className="facts">
          {w.facts.map((f) => (
            <div key={f.label} className="facts__item">
              <dt>{f.label}</dt>
              <dd>
                {f.href ? (
                  <a href={f.href} className="link">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <CaseStory
        title={w.title}
        cover={cover}
        chapters={chapters}
        intro={
          <section className="idea" aria-label="The idea">
            <p className="idea__line">{w.idea}</p>
            <p className="idea__brief">{w.brief}</p>
          </section>
        }
      />

      <section className="outcome card card--ink" aria-labelledby="outcome-title">
        <h2 id="outcome-title" className="outcome__label">
          What changed
        </h2>
        <p className="outcome__text">{w.outcome}</p>
        {w.link && (
          <a href={w.link.href} className="pill pill--light outcome__link">
            {w.link.label}
          </a>
        )}
      </section>

      <Link href={`/work/${next.slug}`} className="next">
        <div className="next__text">
          <span className="next__label">Next project</span>
          <span className="next__title">{next.title}</span>
          <span className="next__line">{next.line}</span>
        </div>
        <div className="next__img">
          <Image
            src={next.preview}
            alt=""
            {...imgSize(next.preview)}
            sizes="(min-width: 900px) 40vw, 100vw"
            style={next.previewPosition ? { objectPosition: next.previewPosition } : undefined}
          />
        </div>
      </Link>
    </article>
  )
}
