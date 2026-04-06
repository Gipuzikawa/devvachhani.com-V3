import type { ReactNode } from 'react'

interface SectionIntroProps {
  label: string
  heading: ReactNode
  subtitle?: string
  centered?: boolean
}

export default function SectionIntro({ label, heading, subtitle, centered = false }: SectionIntroProps) {
  const alignClass = centered ? 'text-center' : ''
  return (
    <div className={alignClass}>
      <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">
        {label}
      </span>
      <h2 className="text-4xl font-black font-headline text-white mt-2">{heading}</h2>
      {subtitle && (
        <p className="text-on-surface-variant font-body mt-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
