import type { InterestItem } from '../../types'

interface InterestsBentoProps {
  items: InterestItem[]
}

export default function InterestsBento({ items }: InterestsBentoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto lg:auto-rows-[280px]">
      {items.map((item) => {
        if (item.type === 'image') {
          return (
            <div key={item.title} className={`rounded-2xl overflow-hidden relative group ${item.colSpan ?? ''}`}>
              <img
                src={item.imageUrl}
                alt={item.imageAlt}
                className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-white text-xl">{item.icon}</span>
                  <span className="text-white font-bold font-headline text-lg">{item.title}</span>
                </div>
                <p className="text-white/80 font-body text-sm">{item.description}</p>
              </div>
            </div>
          )
        }

        return (
          <div
            key={item.title}
            className={`rounded-2xl p-6 flex flex-col justify-between h-64 lg:h-full ${item.bgClass ?? 'bg-surface-container-high'}`}
          >
            <span className={`material-symbols-outlined text-4xl ${item.iconColor}`}>{item.icon}</span>
            <div>
              <h3 className="text-xl font-bold font-headline text-white mb-2">{item.title}</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span key={tag.label} className={tag.className}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
