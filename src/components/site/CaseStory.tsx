'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

export type StoryImg = {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  span: 'wide' | 'half' | 'third'
  video?: string
}

export type StoryChapter = { title: string; text: string; images: StoryImg[] }

export type StoryCover = StoryImg & { fit?: 'cover' | 'contain'; bg?: string; position?: string }

const sizes = {
  wide: '(min-width: 1300px) 1240px, 100vw',
  half: '(min-width: 900px) 620px, 100vw',
  third: '(min-width: 900px) 410px, 100vw',
}

/** The case study body: cover, an intro slot, then chapters of words and pictures, with one lightbox for all of them. */
export default function CaseStory({
  title,
  cover,
  intro,
  chapters,
}: {
  title: string
  cover: StoryCover
  intro: ReactNode
  chapters: StoryChapter[]
}) {
  const all = [cover, ...chapters.flatMap((c) => c.images)].filter((i) => !i.video)
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  const show = (src: string) => {
    const i = all.findIndex((x) => x.src === src)
    if (i < 0) return
    setOpen(i)
    dialog.current?.showModal()
  }
  const close = () => dialog.current?.close()
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + all.length) % all.length)), [all.length])

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const onClose = () => setOpen(null)
    el.addEventListener('keydown', onKey)
    el.addEventListener('close', onClose)
    return () => {
      el.removeEventListener('keydown', onKey)
      el.removeEventListener('close', onClose)
    }
  }, [step])

  const current = open === null ? null : all[open]

  return (
    <>
      <figure className="cover" data-fit={cover.fit ?? 'cover'} style={cover.bg ? { background: cover.bg } : undefined}>
        <button type="button" className="cover__open" onClick={() => show(cover.src)} aria-label={`Enlarge: ${cover.alt}`}>
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes={sizes.wide}
            priority
            style={cover.position ? { objectPosition: cover.position } : undefined}
          />
        </button>
      </figure>

      {intro}

      {chapters.map((ch) => (
        <section key={ch.title} className="chapter" aria-labelledby={slug(ch.title)}>
          <div className="chapter__head">
            <h2 id={slug(ch.title)} className="chapter__title">
              {ch.title}
            </h2>
            <p className="chapter__text">{ch.text}</p>
          </div>
          <div className="chapter__grid">
            {ch.images.map((im) => (
              <figure key={im.src + (im.video ?? '')} className={`fig fig--${im.span}`}>
                {im.video ? (
                  <video
                    className="fig__video"
                    src={im.video}
                    poster={im.src}
                    width={im.width}
                    height={im.height}
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={im.alt}
                  />
                ) : (
                  <button type="button" className="fig__open" onClick={() => show(im.src)} aria-label={`Enlarge: ${im.alt}`}>
                    <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes={sizes[im.span]} />
                  </button>
                )}
                {im.caption && <figcaption className="fig__caption">{im.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      ))}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title} images`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        {current && (
          <figure className="lightbox__figure">
            <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="92vw" className="lightbox__img" />
            <figcaption className="lightbox__caption">
              <span>{current.caption ?? current.alt}</span>
              <span className="lightbox__count">
                {(open ?? 0) + 1} of {all.length}
              </span>
            </figcaption>
          </figure>
        )}
        <div className="lightbox__controls">
          <button type="button" className="pill" onClick={() => step(-1)}>
            Previous
          </button>
          <button type="button" className="pill" onClick={() => step(1)}>
            Next
          </button>
          <button type="button" className="pill pill--ink" onClick={close} autoFocus>
            Close
          </button>
        </div>
      </dialog>
    </>
  )
}

function slug(s: string) {
  return 'ch-' + s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
