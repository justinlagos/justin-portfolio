'use client'

import { useState } from 'react'

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="pill pill--light"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2000)
        } catch {
          window.location.href = `mailto:${email}`
        }
      }}
    >
      {copied ? 'Copied' : 'Copy email'}
    </button>
  )
}
