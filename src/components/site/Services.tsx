'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useId, useState } from 'react'

type Service = { name: string; text: string; example: string; slug: string; src: string; width: number; height: number }

// What I do, as tabs: pick one on the left, read it and see an example on the right.
export default function Services({ items }: { items: Service[] }) {
  const [i, setI] = useState(0)
  const id = useId()
  const s = items[i]

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
    setI(next)
    document.getElementById(`${id}-tab-${next}`)?.focus()
  }

  return (
    <div className="services">
      <div className="services__tabs" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
        {items.map((it, n) => (
          <button
            key={it.name}
            id={`${id}-tab-${n}`}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-controls={`${id}-panel`}
            tabIndex={n === i ? 0 : -1}
            className="services__tab"
            onClick={() => setI(n)}
          >
            {it.name}
          </button>
        ))}
      </div>
      <div className="services__panel card" id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`}>
        <div className="services__text">
          <h3 className="card__title">{s.name}</h3>
          <p className="card__text">{s.text}</p>
          <Link href={`/work/${s.slug}`} className="pill pill--ink">
            See {s.example}
          </Link>
        </div>
        <div className="services__img">
          <Image key={s.src} src={s.src} alt={`Example: ${s.example}`} width={s.width} height={s.height} sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      </div>
    </div>
  )
}
