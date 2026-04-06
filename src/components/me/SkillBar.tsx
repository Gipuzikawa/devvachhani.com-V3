import { useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import type { Skill } from '../../types'

const colorMap: Record<string, string> = {
  primary: 'bg-primary',
  tertiary: 'bg-tertiary',
  secondary: 'bg-secondary',
}

export default function SkillBar({ name, percent, color }: Skill) {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(ref)

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-semibold font-label text-on-surface-variant">{name}</span>
        <span className="text-sm font-semibold font-label text-primary-dim">{percent}%</span>
      </div>
      <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} rounded-full`}
          style={{
            width: isIntersecting ? `${percent}%` : '0%',
            transition: 'width 1s ease-out',
          }}
        />
      </div>
    </div>
  )
}
