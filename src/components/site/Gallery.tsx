'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export type GalleryItem = {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  span: 'wide' | 'half'
}

export default function Gallery({
  items,
  title,
  interlude,
}: {
  items: GalleryItem[]
  title: string
  /** Content placed after the first image, inside the same flow. */
  interlude?: React.ReactNode
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  const show = (i: number) => {
    setOpen(i)
    dialog.current?.showModal()
  }
  const close = () => dialog.current?.close()
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  )

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

  const current = open === null ? null : items[open]

  return (
    <>
      <div className="gallery">
        {items.map((img, i) => [
          <figure key={img.src} className={`fig fig--${img.span}`}>
            <button type="button" className="fig__open" onClick={() => show(i)} aria-label={`Enlarge: ${img.alt}`}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes={img.span === 'wide' ? '(min-width: 1600px) 1520px, 100vw' : '(min-width: 900px) 50vw, 100vw'}
                priority={i === 0}
              />
            </button>
            {img.caption && <figcaption className="fig__caption">{img.caption}</figcaption>}
          </figure>,
          i === 0 && interlude ? (
            <div key="interlude" className="gallery__interlude">
              {interlude}
            </div>
          ) : null,
        ])}
      </div>

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
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="92vw"
              className="lightbox__img"
            />
            <figcaption className="lightbox__caption">
              <span>{current.caption ?? current.alt}</span>
              <span className="lightbox__count">
                {(open ?? 0) + 1} of {items.length}
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
