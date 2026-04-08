import type { Project, ProjectDetail } from '../../types'

interface ProjectHeroProps {
  project: Project & { detail: ProjectDetail }
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const titleParts = project.title.trim().split(' ')
  const lastWord = titleParts.pop() ?? ''
  const titlePrefix = titleParts.join(' ')

  return (
    <section className="relative group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-label tracking-widest uppercase text-primary">
              Case Study • {project.year}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter text-glow">
            {titlePrefix ? `${titlePrefix} ` : ''}
            <span className="text-primary">{lastWord}</span>
          </h1>

          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="lg:col-span-4 flex justify-end">
          <div className="flex flex-col gap-4 text-right">
            <div className="text-sm font-label uppercase tracking-widest text-secondary">Role</div>
            <div className="text-lg font-semibold text-on-surface">{project.detail.role}</div>
            <div className="h-px w-12 bg-primary ml-auto mt-2" />
            <div className="text-sm font-label uppercase tracking-widest text-secondary mt-4">Duration</div>
            <div className="text-lg font-semibold text-on-surface">{project.duration}</div>
          </div>
        </div>
      </div>

      <div className="mt-16 relative overflow-hidden rounded-xl aspect-[21/9] bg-surface-container-high">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-surface-container">
            <span className="material-symbols-outlined text-primary text-7xl">
              {project.placeholderIcon ?? 'deployed_code'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
    </section>
  )
}
