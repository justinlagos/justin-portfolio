'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export type Slide = { src: string; caption: string; width: number; height: number }

// The images behind the hero text. They change every few seconds; the caption says what you are looking at.
export default function HeroShow({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true)
      return
    }
  }, [])

  useEffect(() => {
    if (paused) return
    const t = window.setInterval(() => setI((n) => (n + 1) % slides.length), 4800)
    return () => window.clearInterval(t)
  }, [paused, slides.length])

  return (
    <>
      <div className="show" aria-hidden="true">
        {slides.map((s, n) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            width={s.width}
            height={s.height}
            sizes="100vw"
            priority={n === 0}
            className="show__img"
            data-on={n === i ? 'true' : 'false'}
          />
        ))}
      </div>
      <div className="show__bar">
        <p className="chip chip--dark" aria-live="polite">
          <span className="chip__dot" />
          {slides[i].caption}
        </p>
        <div className="show__dots">
          {slides.map((s, n) => (
            <button
              key={s.src}
              type="button"
              className="show__dot"
              data-on={n === i ? 'true' : 'false'}
              aria-label={`Show ${s.caption}`}
              onClick={() => {
                setI(n)
                setPaused(true)
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
