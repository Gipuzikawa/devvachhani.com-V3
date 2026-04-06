import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  bordered?: boolean
  className?: string
}

export default function GlassPanel({ children, bordered = false, className = '' }: GlassPanelProps) {
  return (
    <div
      className={`glass-panel ${bordered ? 'border border-outline-variant/10' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
