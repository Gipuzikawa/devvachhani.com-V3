const actions = [
  { label: 'Like article', icon: 'thumb_up' },
  { label: 'Share article', icon: 'share' },
  { label: 'Bookmark article', icon: 'bookmark' },
]

export default function FloatingSocialSidebar() {
  return (
    <aside className="hidden lg:flex lg:col-span-1 flex-col items-center gap-6 sticky top-32 h-fit">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          aria-label={action.label}
          className="w-12 h-12 rounded-full bg-surface-container-high hover:bg-primary/20 border border-outline-variant/10 flex items-center justify-center transition-all group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
            {action.icon}
          </span>
        </button>
      ))}
    </aside>
  )
}
