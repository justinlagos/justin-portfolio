import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Gallery, { type GalleryItem } from '@/components/site/Gallery'
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
    openGraph: { title: `${w.title} | Justin Ukaegbu`, description: w.summary, images: [w.images[0].src] },
  }
}

// Landscape images run full width; portrait and square ones sit in pairs.
function layout(images: GalleryItem[]): GalleryItem[] {
  return images.map((img, i) => ({ ...img, span: i === 0 || img.width / img.height >= 1.25 ? 'wide' : 'half' }))
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const w = getWork(slug)
  if (!w) notFound()
  const index = work.findIndex((x) => x.slug === slug)
  const next = work[(index + 1) % work.length]
  const images = layout(w.images.map((img) => ({ ...img, ...imgSize(img.src), span: 'half' as const })))

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

      <Gallery
        items={images}
        title={w.title}
        interlude={
          <div className="story">
            <section className="card story__card">
              <h2 className="story__label">The problem</h2>
              <p className="story__text story__text--lead">{w.brief}</p>
            </section>
            <section className="card story__card">
              <h2 className="story__label">What I did</h2>
              {w.did.map((para) => (
                <p key={para.slice(0, 24)} className="story__text">
                  {para}
                </p>
              ))}
            </section>
            <section className="card card--ink story__card">
              <h2 className="story__label">What changed</h2>
              <p className="story__text">{w.outcome}</p>
            </section>
          </div>
        }
      />

      <Link href={`/work/${next.slug}`} className="next">
        <div className="next__text">
          <span className="next__label">Next project</span>
          <span className="next__title">{next.title}</span>
          <span className="next__line">{next.line}</span>
        </div>
        <div className="next__img">
          <Image src={next.preview} alt="" {...imgSize(next.preview)} sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      </Link>
    </article>
  )
}
