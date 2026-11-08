'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Word = { word: string; src: string; width: number; height: number }

// "I design ___ people understand at a glance." The word and the picture change together.
export default function Statement({ lead, before, after, words }: { lead: string; before: string; after: string; words: Word[] }) {
  const [i, setI] = useState(0)
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setStill(true)
  }, [])

  useEffect(() => {
    if (still) return
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200)
    return () => window.clearInterval(t)
  }, [still, words.length])

  return (
    <div className="statement">
      <p className="statement__lead">{lead}</p>
      <p className="statement__line">
        {before}{' '}
        <span className="ticker" aria-hidden="true">
          {words.map((w, n) => (
            <span key={w.word} data-on={n === i ? 'true' : 'false'}>
              {w.word}
            </span>
          ))}
        </span>
        <span className="sr-only">{words.map((w) => w.word).join(', ')}</span>{' '}
        {after}
      </p>
      <div className="statement__band" aria-hidden="true">
        {words.map((w, n) => (
          <Image
            key={w.src}
            src={w.src}
            alt=""
            width={w.width}
            height={w.height}
            sizes="(min-width: 1200px) 1100px, 100vw"
            data-on={n === i ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  )
}
