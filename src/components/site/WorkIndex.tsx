'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export type IndexItem = {
  slug: string
  title: string
  line: string
  kind: string
  years: string
  preview: { src: string; width: number; height: number; alt: string }
}

// A pen stroke under the title, drawn on hover. pathLength=1 lets CSS animate it.
function PenLine() {
  return (
    <svg className="pen-line" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 8 C 40 3, 70 11, 104 6 S 168 3, 198 7" pathLength={1} />
    </svg>
  )
}

export default function WorkIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState<number | null>(null)
  const [hoverable, setHoverable] = useState(false)
  const preview = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setHoverable(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => {
      mq.removeEventListener('change', update)
      if (raf.current != null) cancelAnimationFrame(raf.current)
    }
  }, [])

  const follow = () => {
    raf.current = null
    const el = preview.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const k = reduce ? 1 : 0.16
    pos.current.x += (target.current.x - pos.current.x) * k
    pos.current.y += (target.current.y - pos.current.y) * k
    el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
    if (Math.abs(target.current.x - pos.current.x) + Math.abs(target.current.y - pos.current.y) > 0.5) {
      raf.current = requestAnimationFrame(follow)
    }
  }

  const onMove = (e: React.MouseEvent) => {
    const el = preview.current
    if (!el) return
    const w = el.offsetWidth
    const h = el.offsetHeight
    // Sit to the right of the cursor, or to the left near the right edge.
    const x = e.clientX + 28 + w > window.innerWidth ? e.clientX - 28 - w : e.clientX + 28
    const y = Math.min(Math.max(e.clientY - h / 2, 12), window.innerHeight - h - 12)
    if (active === null) pos.current = { x, y }
    target.current = { x, y }
    if (raf.current == null) raf.current = requestAnimationFrame(follow)
  }

  return (
    <div className="index" onMouseMove={hoverable ? onMove : undefined} onMouseLeave={() => setActive(null)}>
      <ul className="index__list">
        {items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={`/work/${item.slug}`}
              className="row"
              data-active={active === i ? 'true' : 'false'}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
            >
              <span className="row__title">
                <span className="row__title-text">{item.title}</span>
                <PenLine />
              </span>
              <span className="row__line">{item.line}</span>
              <span className="row__kind">{item.kind}</span>
              <span className="row__years">{item.years}</span>
              <span className="row__thumb">
                <Image src={item.preview.src} alt="" width={item.preview.width} height={item.preview.height} sizes="96px" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {hoverable && (
        <div ref={preview} className="index__preview" data-visible={active !== null ? 'true' : 'false'} aria-hidden="true">
          {items.map((item, i) => (
            <Image
              key={item.slug}
              src={item.preview.src}
              alt=""
              width={item.preview.width}
              height={item.preview.height}
              sizes="420px"
              data-active={active === i ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
