interface FilterBarProps {
  filters: string[]
  active: string
  onChange: (f: string) => void
}

export default function FilterBar({ filters, active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex-shrink-0 font-bold px-6 py-2.5 rounded-full text-sm font-label transition-all duration-200 ${
            active === f
              ? 'bg-primary-container text-on-primary-container'
              : 'bg-surface-container-high text-on-surface-variant hover:text-white hover:bg-surface-bright'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
