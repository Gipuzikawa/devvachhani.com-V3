import type { ActivityItem } from '../../types'

interface ActivitiesListProps {
  items: ActivityItem[]
}

export default function ActivitiesList({ items }: ActivitiesListProps) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.title} className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold font-headline text-sm">{item.title}</p>
              <p className="text-on-surface-variant text-xs font-body mt-1">{item.description}</p>
            </div>
            <span className="text-primary text-xs font-label flex-shrink-0">{item.period}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
