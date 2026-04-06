import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface CTABannerProps {
  heading: ReactNode
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTABanner({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <div className="glass-panel border border-primary/20 rounded-3xl p-10 md:p-16 text-center">
      <h2 className="text-3xl md:text-5xl font-black font-headline text-white mb-4">{heading}</h2>
      <p className="text-on-surface-variant font-body mb-8 max-w-xl mx-auto">{body}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to={primaryHref}
          className="inline-block bg-primary text-on-primary font-bold px-10 py-4 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-headline text-sm"
        >
          {primaryLabel}
        </Link>
        {secondaryLabel && secondaryHref && (
          <Link
            to={secondaryHref}
            className="inline-block border border-primary/30 text-primary font-bold px-10 py-4 rounded-full hover:bg-primary/10 transition-all duration-300 font-headline text-sm"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
