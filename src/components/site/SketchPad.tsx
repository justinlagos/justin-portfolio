'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// A small sketchbook: the cursor, a finger, or a hand seen by the webcam leaves ink that fades.
// It is the idea behind Draw in the Air, in a panel the visitor can try.

type Pt = { x: number; y: number; t: number; w: number }
type Stroke = Pt[]
type Source = 'pointer' | 'hand' | 'intro'
type HandState = 'off' | 'loading' | 'on' | 'error'
type Landmark = { x: number; y: number }

const LIFE = 5200 // ms a point stays on the page
const FADE = 1900 // ms of that spent fading out
const MP_VERSION = '1.1.1' // keep in step with @mediapipe/tasks-vision in package.json
const WASM = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`
const MODEL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'

const dist = (a: Landmark, b: Landmark) => Math.hypot(a.x - b.x, a.y - b.y)

export default function SketchPad() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const strokes = useRef<Stroke[]>([])
  const current = useRef<Record<Source, Stroke | null>>({ pointer: null, hand: null, intro: null })
  const raf = useRef<number | null>(null)
  const ink = useRef('#2232E6')
  const stopHand = useRef<(() => void) | null>(null)
  const touched = useRef(false) // true once the visitor has drawn anything

  const [coarse, setCoarse] = useState(false)
  const [touchDraw, setTouchDraw] = useState(false)
  const [hand, setHand] = useState<HandState>('off')

  // ── Rendering ──
  const loop = useCallback(() => {
    raf.current = null
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = canvas.width / Math.max(1, canvas.clientWidth)
    const now = performance.now()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = ink.current

    const live = Object.values(current.current)
    strokes.current = strokes.current.filter((s) => {
      while (s.length && now - s[0].t > LIFE) s.shift()
      return s.length > 0 || live.includes(s)
    })

    let busy = live.some(Boolean)
    for (const s of strokes.current) {
      if (s.length === 0) continue
      busy = true
      if (s.length === 1) continue
      for (let i = 1; i < s.length; i++) {
        const a = s[i - 1]
        const b = s[i]
        const age = now - b.t
        ctx.globalAlpha = age < LIFE - FADE ? 1 : Math.max(0, (LIFE - age) / FADE)
        ctx.lineWidth = (a.w + b.w) / 2
        const start = i === 1 ? a : { x: (s[i - 2].x + a.x) / 2, y: (s[i - 2].y + a.y) / 2 }
        const end = i === s.length - 1 ? b : { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.quadraticCurveTo(a.x, a.y, end.x, end.y)
        ctx.stroke()
      }
    }
    ctx.globalAlpha = 1
    if (busy) raf.current = requestAnimationFrame(loop)
  }, [])

  const kick = useCallback(() => {
    if (raf.current == null) raf.current = requestAnimationFrame(loop)
  }, [loop])

  const addPoint = useCallback(
    (source: Source, x: number, y: number, at?: number) => {
      const now = at ?? performance.now()
      if (source !== 'intro') touched.current = true
      let s = current.current[source]
      const last = s?.[s.length - 1]
      if (!s || (last && (now - last.t > 160 || Math.hypot(x - last.x, y - last.y) > 180))) {
        s = []
        strokes.current.push(s)
        current.current[source] = s
      }
      const prev = s[s.length - 1]
      let w = 3.4
      if (prev) {
        const d = Math.hypot(x - prev.x, y - prev.y)
        if (d < 1.5) return
        const speed = d / Math.max(1, now - prev.t)
        const target = Math.min(5.4, Math.max(1.3, 5.4 - speed * 2.4))
        w = prev.w * 0.65 + target * 0.35
      }
      s.push({ x, y, t: now, w })
      kick()
    },
    [kick],
  )

  const endStroke = useCallback((source: Source) => {
    current.current[source] = null
  }, [])

  // ── Canvas size, colour, pointer type ──
  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    const css = getComputedStyle(section).getPropertyValue('--pen').trim()
    if (css) ink.current = css
    const mq = window.matchMedia('(pointer: coarse)')
    const setPointer = () => setCoarse(mq.matches)
    setPointer()
    mq.addEventListener('change', setPointer)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(section.clientWidth * dpr)
      canvas.height = Math.round(section.clientHeight * dpr)
      kick()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(section)
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', setPointer)
      if (raf.current != null) cancelAnimationFrame(raf.current)
      stopHand.current?.()
    }
  }, [kick])

  // ── A demo line, drawn when the pad comes into view and repeated until the visitor draws ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let timer = 0
    let visible = false
    let running = false
    const duration = 1500
    const gap = 6200
    const run = () => {
      if (!visible || touched.current || running) return
      running = true
      const w = section.clientWidth
      const h = section.clientHeight
      const x0 = w * 0.14
      const len = w * 0.72
      const yc = h * 0.42
      const r = Math.min(w * 0.045, 36)
      const loops = 4
      let start = 0
      let done = 0
      const point = (u: number) => {
        // A run of cursive loops (a prolate trochoid) with a slight fall, like a pen warming up.
        const a = u * loops * Math.PI * 2
        addPoint('intro', x0 + len * u - r * Math.sin(a), yc + r * Math.cos(a) + u * r * 1.2, start + u * duration)
      }
      const step = (ts: number) => {
        if (!start) start = ts
        if (touched.current) {
          endStroke('intro')
          running = false
          return
        }
        const t = Math.min(1, (ts - start) / duration)
        while (done + 0.003 <= t) {
          done += 0.003
          point(done)
        }
        if (t < 1) frame = requestAnimationFrame(step)
        else {
          point(1)
          endStroke('intro')
          running = false
          timer = window.setTimeout(run, gap)
        }
      }
      frame = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        window.clearTimeout(timer)
        if (visible) timer = window.setTimeout(run, 250)
      },
      { threshold: 0.6 },
    )
    io.observe(section)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [addPoint, endStroke])

  // ── Pointer drawing ──
  const local = (e: React.PointerEvent) => {
    const rect = sectionRef.current!.getBoundingClientRect()
    return [e.clientX - rect.left, e.clientY - rect.top] as const
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' && !touchDraw) return
    const [x, y] = local(e)
    addPoint('pointer', x, y)
  }
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch' || !touchDraw) return
    endStroke('pointer')
    const [x, y] = local(e)
    addPoint('pointer', x, y)
  }
  const onPointerEnd = () => endStroke('pointer')

  // ── Hand drawing through the webcam ──
  const startHand = async () => {
    const section = sectionRef.current
    const video = videoRef.current
    const cursor = cursorRef.current
    if (!section || !video || !cursor) return
    setHand('loading')
    let stream: MediaStream | null = null
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      })
      video.srcObject = stream
      await video.play()
      const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision')
      const fileset = await FilesetResolver.forVisionTasks(WASM)
      const options = (delegate: 'GPU' | 'CPU') => ({
        baseOptions: { modelAssetPath: MODEL, delegate },
        runningMode: 'VIDEO' as const,
        numHands: 1,
      })
      let landmarker: Awaited<ReturnType<typeof HandLandmarker.createFromOptions>>
      try {
        landmarker = await HandLandmarker.createFromOptions(fileset, options('GPU'))
      } catch {
        landmarker = await HandLandmarker.createFromOptions(fileset, options('CPU'))
      }

      let running = true
      let lastFrame = -1
      let pinched = false
      let seen = false
      let sx = 0
      let sy = 0
      const tick = () => {
        if (!running) return
        if (video.readyState >= 2 && video.currentTime !== lastFrame) {
          lastFrame = video.currentTime
          const result = landmarker.detectForVideo(video, performance.now())
          const pts = result.landmarks?.[0]
          if (pts && pts.length > 9) {
            const rect = section.getBoundingClientRect()
            const size = dist(pts[0], pts[9]) || 0.1
            const pinch = dist(pts[4], pts[8]) / size
            if (!pinched && pinch < 0.3) pinched = true
            else if (pinched && pinch > 0.45) pinched = false
            // Mirror x so the page moves the way the hand does.
            const tx = (1 - (pts[4].x + pts[8].x) / 2) * rect.width
            const ty = ((pts[4].y + pts[8].y) / 2) * rect.height
            if (!seen) {
              sx = tx
              sy = ty
              seen = true
            }
            sx += (tx - sx) * 0.5
            sy += (ty - sy) * 0.5
            cursor.style.opacity = '1'
            cursor.style.transform = `translate3d(${sx}px, ${sy}px, 0)`
            cursor.dataset.pinched = pinched ? 'true' : 'false'
            if (pinched) addPoint('hand', sx, sy)
            else endStroke('hand')
          } else {
            seen = false
            pinched = false
            cursor.style.opacity = '0'
            endStroke('hand')
          }
        }
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)

      const ownStream = stream
      stopHand.current = () => {
        running = false
        ownStream.getTracks().forEach((t) => t.stop())
        landmarker.close()
        video.srcObject = null
        cursor.style.opacity = '0'
        endStroke('hand')
        stopHand.current = null
      }
      setHand('on')
    } catch (err) {
      console.warn('[sketch] hand drawing unavailable', err)
      stream?.getTracks().forEach((t) => t.stop())
      video.srcObject = null
      setHand('error')
    }
  }

  const turnOffHand = () => {
    stopHand.current?.()
    setHand('off')
  }

  let status = coarse
    ? touchDraw
      ? 'Draw with your finger.'
      : 'Tap “Draw here” to start.'
    : 'Move your cursor over this panel.'
  if (hand === 'loading') status = 'Starting the camera…'
  if (hand === 'on') status = 'Pinch your thumb and finger to draw. Open them to stop.'
  if (hand === 'error') status = 'The camera didn’t start. Check the camera permission, then try again.'

  return (
    <div
      ref={sectionRef}
      className="pad"
      data-touch-draw={touchDraw ? 'true' : 'false'}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerEnd}
      onPointerLeave={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <canvas ref={canvasRef} className="pad__canvas" aria-hidden="true" />
      <div ref={cursorRef} className="pad__cursor" aria-hidden="true" />
      <p className="chip pad__status" aria-live="polite">
        {status}
      </p>
      <div className="pad__controls">
        {coarse && hand !== 'on' && (
          <button type="button" className="pill" onClick={() => setTouchDraw((v) => !v)} aria-pressed={touchDraw}>
            {touchDraw ? 'Stop drawing' : 'Draw here'}
          </button>
        )}
        {hand === 'on' ? (
          <button type="button" className="pill" onClick={turnOffHand}>
            Turn camera off
          </button>
        ) : (
          <button type="button" className="pill pill--ink" onClick={startHand} disabled={hand === 'loading'}>
            {hand === 'error' ? 'Try the camera again' : 'Use my camera'}
          </button>
        )}
      </div>
      <video
        ref={videoRef}
        className="pad__video"
        hidden={hand !== 'on'}
        playsInline
        muted
        aria-label="Your camera, mirrored"
      />
    </div>
  )
}
