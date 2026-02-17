'use client'

import { PlaceholderForm } from '@/components/PlaceholderForm'
import type { Metadata } from 'next'

// remove metadata export; client components cannot export `metadata`
export default function RequestCall() {
  return (
    <section className="section">
      ...
      <PlaceholderForm />
      ...
    </section>
  )
}
