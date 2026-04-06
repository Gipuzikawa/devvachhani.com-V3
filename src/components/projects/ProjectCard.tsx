import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  side: 'left' | 'right'
}

export default function ProjectCard({ project, side }: ProjectCardProps) {
  const isLeft = side === 'left'

  const imageBlock = (
    <div className="md:pl-12">
      <div className="rounded-2xl overflow-hidden aspect-video bg-surface-container-high border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-tertiary/5 flex items-center justify-center">
            <div className="text-center p-8">
              <span className="material-symbols-outlined text-primary text-6xl mb-4 block">
                {project.placeholderIcon ?? 'work'}
              </span>
              <p className="text-on-surface-variant font-headline font-bold text-lg">{project.title}</p>
              <p className="text-on-surface-variant/60 font-body text-sm mt-1">Mobile App Design</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const textBlock = (
    <div className={`flex flex-col gap-4 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
      <div className={`flex gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
        {project.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-xs px-3 py-1 rounded-full font-label ${
              i === 0
                ? `bg-${project.accentColor === 'tertiary' ? 'tertiary' : 'primary'}/10 text-${project.accentColor === 'tertiary' ? 'tertiary' : 'primary'}-dim`
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-2xl font-bold font-headline text-white">{project.title}</h2>
      <p className="text-on-surface-variant font-body text-sm leading-relaxed">{project.description}</p>
      {project.award && (
        <div className={`flex items-center gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
          <span
            className="material-symbols-outlined text-yellow-400 text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
          <span className="text-yellow-400 text-xs font-semibold font-label">{project.award}</span>
        </div>
      )}
      <div className={`flex gap-3 ${isLeft ? 'md:justify-end' : ''}`}>
        <a
          href={project.caseStudyUrl}
          className="text-primary font-semibold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all"
        >
          View Case Study{' '}
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </a>
      </div>
      {(project.duration || project.team) && (
        <div className={`flex gap-4 text-on-surface-variant text-xs font-label ${isLeft ? 'md:justify-end' : ''}`}>
          {project.duration && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span> {project.duration}
            </span>
          )}
          {project.team && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">{project.team === 'Solo' ? 'person' : 'group'}</span>{' '}
              {project.team}
            </span>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
      {isLeft ? (
        <>
          {textBlock}
          {/* Timeline dot */}
          <div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-10 shadow-lg shadow-primary/50"
            style={{ marginTop: '4rem' }}
          />
          {imageBlock}
        </>
      ) : (
        <>
          <div className="md:pl-12 order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden aspect-video bg-surface-container-high border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-tertiary/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="material-symbols-outlined text-primary text-6xl mb-4 block">
                      {project.placeholderIcon ?? 'work'}
                    </span>
                    <p className="text-on-surface-variant font-headline font-bold text-lg">{project.title}</p>
                    <p className="text-on-surface-variant/60 font-body text-sm mt-1">Mobile App Design</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Timeline dot */}
          <div
            className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-background z-10 shadow-lg ${
              project.accentColor === 'tertiary'
                ? 'bg-tertiary shadow-tertiary/50'
                : project.accentColor === 'yellow'
                ? 'bg-yellow-400'
                : 'bg-primary shadow-primary/50'
            }`}
            style={{ marginTop: '4rem' }}
          />
          <div className="flex flex-col gap-4 md:text-left md:pl-12 order-1 md:order-2">
            <div className="flex gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-xs px-3 py-1 rounded-full font-label ${
                    i === 0
                      ? `bg-${project.accentColor === 'tertiary' ? 'tertiary' : 'primary'}/10 text-${project.accentColor === 'tertiary' ? 'tertiary' : 'primary'}-dim`
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold font-headline text-white">{project.title}</h2>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">{project.description}</p>
            {project.award && (
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-yellow-400 text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emoji_events
                </span>
                <span className="text-yellow-400 text-xs font-semibold font-label">{project.award}</span>
              </div>
            )}
            <div className="flex gap-3">
              <a
                href={project.caseStudyUrl}
                className="text-primary font-semibold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Case Study{' '}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
            {(project.duration || project.team) && (
              <div className="flex gap-4 text-on-surface-variant text-xs font-label">
                {project.duration && (
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> {project.duration}
                  </span>
                )}
                {project.team && (
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">{project.team === 'Solo' ? 'person' : 'group'}</span>{' '}
                    {project.team}
                  </span>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
