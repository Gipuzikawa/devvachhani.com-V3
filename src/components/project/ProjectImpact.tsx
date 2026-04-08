import type { MetricItem } from '../../types'

interface ProjectImpactProps {
  metrics: MetricItem[]
}

export default function ProjectImpact({ metrics }: ProjectImpactProps) {
  return (
    <section className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-primary/5 rounded-xl border border-primary/10 overflow-hidden">
        <div className="lg:col-span-5 p-12 space-y-8 flex flex-col justify-center">
          <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Impact &amp; Scale</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The synthesis patterns demonstrated significant performance gains in both design efficiency and user
            engagement metrics.
          </p>
          <button
            type="button"
            className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 w-fit transition-all hover:scale-105 active:scale-95"
          >
            Download Report
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/20">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-background/80 p-12 flex flex-col justify-center items-center text-center"
            >
              <span className="text-6xl font-headline font-black text-primary mb-2">{metric.value}</span>
              <span className="text-xs font-label uppercase tracking-widest text-secondary">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
