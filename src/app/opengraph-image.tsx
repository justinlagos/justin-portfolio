import { ImageResponse } from 'next/og'

export const alt = 'Justin Ukaegbu, design director who builds'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#fbfbf9',
          color: '#17171c',
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600 }}>Justin Ukaegbu</div>
        <svg width="560" height="90" viewBox="0 0 560 90" style={{ position: 'absolute', right: 80, top: 150 }}>
          <path
            d="M6 60 C 40 10, 70 10, 60 50 S 110 90, 130 40 S 180 0, 190 45 S 240 85, 260 40 S 310 5, 320 45 S 380 80, 420 50 S 500 30, 552 44"
            fill="none"
            stroke="#2232e6"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>Design director</div>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>who builds.</div>
          <div style={{ fontSize: 30, color: '#64646e', marginTop: 28 }}>
            Brand systems, campaigns and interactive products. Kent, UK.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
