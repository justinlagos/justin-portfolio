import type { Metadata } from 'next'
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
    <article className="case">
      <header className="case__head">
        <Link href="/#work" className="case__back">
          All work
        </Link>
        <p className="case__kind">
          {w.kind}, {w.years}
        </p>
        <h1 className="case__title">{w.title}</h1>
        <p className="case__summary">{w.summary}</p>
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
            <section className="story__part">
              <h2 className="story__label">The brief</h2>
              <p className="prose prose--lead">{w.brief}</p>
            </section>
            <section className="story__part">
              <h2 className="story__label">What I did</h2>
              <div>
                {w.did.map((para) => (
                  <p key={para.slice(0, 24)} className="prose">
                    {para}
                  </p>
                ))}
              </div>
            </section>
            <section className="story__part">
              <h2 className="story__label">What happened</h2>
              <p className="prose">{w.outcome}</p>
            </section>
          </div>
        }
      />

      <nav className="next" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="next__link">
          <span className="next__label">Next</span>
          <span className="next__title">{next.title}</span>
        </Link>
      </nav>
    </article>
  )
}
