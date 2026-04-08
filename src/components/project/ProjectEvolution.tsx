import type { EvolutionStage } from '../../types'

interface ProjectEvolutionProps {
  stages: EvolutionStage[]
}

export default function ProjectEvolution({ stages }: ProjectEvolutionProps) {
  return (
    <section className="space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface">
          Project Evolution
        </h2>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          A roadmap from conceptual latent spaces to physical deployment.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative">
        <div className="absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

        {stages.map((stage, index) => (
          <div key={`${stage.month}-${stage.title}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-end gap-4 md:pr-12">
              <div className="text-sm font-label uppercase tracking-widest text-primary font-black order-2 md:order-1">
                {stage.month}
              </div>
              <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-lg shadow-primary/40 z-10 order-1 md:order-2 transition-transform group-hover:scale-125" />
            </div>

            <div
              className={
                index % 2 === 0
                  ? 'md:col-span-5 p-8 bg-surface-container rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-colors'
                  : 'md:col-span-5 p-8 bg-surface-container-high rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-colors'
              }
            >
              <h3 className="text-2xl font-headline font-extrabold text-white mb-4">{stage.title}</h3>
              <p className="text-lg text-on-surface-variant leading-relaxed font-light">{stage.description}</p>
            </div>

            <div className="md:col-span-5 aspect-video md:aspect-auto h-full rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/10">
              <img
                src={stage.imageUrl}
                alt={stage.imageAlt}
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
