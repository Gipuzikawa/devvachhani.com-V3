import type { Project } from '../../types'
import ProjectCard from './ProjectCard'

interface ProjectTimelineProps {
  projects: Project[]
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-on-surface-variant text-sm">No projects in this category yet.</p>
      </div>
    )
  }

  // Group by year
  const byYear: Record<number, Project[]> = {}
  for (const p of projects) {
    if (!byYear[p.year]) byYear[p.year] = []
    byYear[p.year].push(p)
  }
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="relative timeline-line">
      {/* Vertical gradient line */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(0,82,255,0.4), rgba(0,82,255,0.2), transparent)',
        }}
      />

      {years.map((year) => (
        <div key={year}>
          {/* Year marker */}
          <div className="flex justify-center mb-12">
            <div
              className={`font-black font-headline px-6 py-2 rounded-full text-sm z-10 shadow-lg ${
                year === years[0]
                  ? 'bg-primary text-on-primary shadow-primary/30'
                  : 'bg-surface-container-high text-on-surface border border-outline-variant/30'
              }`}
            >
              {year}
            </div>
          </div>

          {byYear[year].map((project, idx) => {
            // Compute global index for alternating side
            const globalIdx = years
              .slice(0, years.indexOf(year))
              .reduce((acc, y) => acc + byYear[y].length, 0) + idx
            return (
              <ProjectCard
                key={project.id}
                project={project}
                side={globalIdx % 2 === 0 ? 'left' : 'right'}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
