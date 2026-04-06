const ARTICLE_FILTERS = ['All', 'Design', 'Tech', 'Culture']

interface ArticleFilterBarProps {
  active: string
  onChange: (f: string) => void
}

export default function ArticleFilterBar({ active, onChange }: ArticleFilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none">
      {ARTICLE_FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full font-label transition-colors ${
            active === f
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-on-surface-variant hover:text-white transition-colors'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
