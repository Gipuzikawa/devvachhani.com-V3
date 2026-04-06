import type { EducationItem } from '../../types'

interface EducationTimelineProps {
  items: EducationItem[]
}

export default function EducationTimeline({ items }: EducationTimelineProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.institution} className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white font-bold font-headline text-base">{item.institution}</p>
              <p
                className={`text-sm font-label mt-0.5 ${
                  item.accentColor === 'tertiary' ? 'text-tertiary-dim' : 'text-primary-dim'
                }`}
              >
                {item.role}
              </p>
              <p className="text-on-surface-variant text-sm font-body mt-2">{item.description}</p>
            </div>
            <span className="text-on-surface-variant text-xs font-label flex-shrink-0">{item.period}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
