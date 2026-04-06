interface AccomplishmentCardProps {
  title: string
  date: string
  description: string
  tags: string[]
  imageUrl: string
  imageAlt: string
  awardLabel: string
  awardIcon?: string
}

export default function AccomplishmentCard({
  title,
  date,
  description,
  tags,
  imageUrl,
  imageAlt,
  awardLabel,
  awardIcon = 'emoji_events',
}: AccomplishmentCardProps) {
  return (
    <div className="glass-panel border border-outline-variant/20 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 group">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="material-symbols-outlined text-yellow-400 text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {awardIcon}
          </span>
          <span className="text-yellow-400 text-sm font-semibold font-label">{awardLabel}</span>
        </div>
        <h3 className="text-xl font-bold font-headline text-white mb-2">{title}</h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-primary/10 text-primary-dim px-3 py-1.5 rounded-full font-label">
              {tag}
            </span>
          ))}
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1.5 rounded-full font-label">
            {date}
          </span>
        </div>
      </div>
    </div>
  )
}
