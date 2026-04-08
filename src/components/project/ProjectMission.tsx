interface ProjectMissionProps {
  mission: string[]
  objectives: string[]
}

export default function ProjectMission({ mission, objectives }: ProjectMissionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      <div className="lg:col-span-4 space-y-6">
        <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">The Mission</h2>
        <div className="w-16 h-1.5 bg-primary rounded-full" />
      </div>

      <div className="lg:col-span-8 grid grid-cols-1 gap-12">
        <div className="space-y-6">
          {mission.map((paragraph) => (
            <p key={paragraph} className="text-xl text-on-surface font-light leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="p-10 bg-primary/5 rounded-2xl border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-primary p-4 rounded-xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-3xl">target</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-extrabold text-white">Core Objectives</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {objectives.map((objective) => (
                  <li key={objective} className="flex items-center gap-3 text-on-surface-variant font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
