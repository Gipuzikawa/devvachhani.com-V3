interface StatCardProps {
  value: string
  label: string
  className?: string
}

export default function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl bg-surface-container-high p-5 text-center border border-outline-variant/20 ${className}`}
    >
      <p className="text-3xl font-black font-headline text-primary">{value}</p>
      <p className="text-on-surface-variant text-xs font-body mt-1">{label}</p>
    </div>
  )
}
